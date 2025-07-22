import { RequestHandler } from "express";
import {
  SquarePaymentRequest,
  SquarePaymentResponse,
} from "../../shared/square";
import fs from "fs";

// You'll need to install: npm install squareup
// import { Client, Environment, ApiError } from 'squareup';

// Add at the top if not present:
// import fetch from 'node-fetch';

const CACHE_FILE = "merch.json";
function loadImageCache() {
  if (fs.existsSync(CACHE_FILE)) {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  }
  return {};
}
function saveImageCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
}
async function fetchImageUrl(imageId, accessToken, cache) {
  if (cache[imageId]) {
    return cache[imageId];
  }
  const response = await fetch(
    `https://connect.squareup.com/v2/catalog/object/${imageId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    },
  );
  const data = await response.json();
  const url = data.object?.image_data?.url || null;
  if (url) {
    cache[imageId] = url;
    saveImageCache(cache);
  }
  return url;
}

export const handleSquarePayment: RequestHandler = async (req, res) => {
  try {
    const { sourceId, amount, currency, items, customer } =
      req.body as SquarePaymentRequest & { sourceId: string };

    // For development/demo purposes, return a mock successful response
    // In production, you would use the actual Square SDK here

    if (!process.env.SQUARE_ACCESS_TOKEN) {
      console.log("Square payment simulation - no access token configured");

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful response
      const mockResponse: SquarePaymentResponse = {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        receipt: {
          receiptNumber: `RCP-${Date.now()}`,
          amount: amount / 100, // Convert back to euros
          currency: currency || "EUR",
        },
      };

      console.log("Mock payment processed:", {
        amount: amount / 100,
        currency,
        items: items?.length || 0,
        customer: customer?.email || "anonymous",
      });

      res.json(mockResponse);
      return;
    }

    // Production Square integration (uncomment when ready):
    /*
    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
    });

    const { paymentsApi } = client;
    
    const requestBody = {
      sourceId,
      amountMoney: {
        amount: BigInt(amount),
        currency: currency as 'EUR' | 'USD',
      },
      locationId: process.env.SQUARE_LOCATION_ID!,
      idempotencyKey: `${Date.now()}-${Math.random()}`,
      note: `Bejaus Sessions order - ${items?.length || 0} items`,
      buyerEmailAddress: customer?.email,
    };

    const response = await paymentsApi.createPayment(requestBody);
    
    if (response.result.payment) {
      const payment = response.result.payment;
      const successResponse: SquarePaymentResponse = {
        success: true,
        transactionId: payment.id,
        receipt: {
          receiptNumber: payment.receiptNumber || `RCP-${Date.now()}`,
          amount: Number(payment.amountMoney?.amount || 0) / 100,
          currency: payment.amountMoney?.currency || 'EUR',
        },
      };
      
      res.json(successResponse);
    } else {
      throw new Error('Payment processing failed');
    }
    */
  } catch (error) {
    console.error("Square payment error:", error);

    const errorResponse: SquarePaymentResponse = {
      success: false,
      error:
        error instanceof Error ? error.message : "Payment processing failed",
    };

    res.status(400).json(errorResponse);
  }
};

/**
 * Fetch merch products from Square Catalog API
 * Only includes items with 'merch', 'tshirt', or 'hoodie' in their name or category
 */
export const handleSquareProducts: RequestHandler = async (_req, res) => {
  try {
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      return res
        .status(500)
        .json({ error: "Square access token not configured" });
    }

    // Use fetch to call Square Catalog API (v2)
    const response = await fetch(
      "https://connect.squareup.com/v2/catalog/list?types=ITEM,IMAGE",
      {
        headers: {
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(500)
        .json({ error: "Failed to fetch from Square", details: errorText });
    }

    const data = await response.json();
    const MERCH_CATEGORY_ID = "M2BJ3LCXRPCI4I4XETEORUJX";
    // Build a lookup of image objects by id
    const imagesById = {};
    (data.objects || []).forEach((obj) => {
      if (obj.type === "IMAGE" && obj.image_data && obj.id) {
        imagesById[obj.id] = obj.image_data.url;
      }
    });
    // Filter items by merch category
    const items = (data.objects || []).filter(
      (obj) =>
        obj.type === "ITEM" &&
        obj.item_data &&
        Array.isArray(obj.item_data.categories) &&
        obj.item_data.categories.some((cat) => cat.id === MERCH_CATEGORY_ID),
    );

    const imageCache = loadImageCache();
    const products = [];
    for (const obj of items) {
      let imageUrl = null;
      if (
        Array.isArray(obj.item_data.image_ids) &&
        obj.item_data.image_ids.length > 0
      ) {
        imageUrl = await fetchImageUrl(
          obj.item_data.image_ids[0],
          process.env.SQUARE_ACCESS_TOKEN,
          imageCache,
        );
      }
      products.push({
        id: obj.id,
        name: obj.item_data.name,
        description: obj.item_data.description,
        price:
          obj.item_data.variations?.[0]?.item_variation_data?.price_money
            ?.amount || 0,
        currency:
          obj.item_data.variations?.[0]?.item_variation_data?.price_money
            ?.currency || "EUR",
        imageUrl,
        category: MERCH_CATEGORY_ID,
        inStock: true,
      });
    }

    res.json({ products });
  } catch (error) {
    console.error("Error fetching Square products:", error);
    res.status(500).json({ error: "Failed to fetch Square products" });
  }
};

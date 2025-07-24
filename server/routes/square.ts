import { RequestHandler } from "express";
import {
  SquarePaymentRequest,
  SquarePaymentResponse,
} from "../../shared/square";
import fs from "fs";
import {
  SquareClient as Client,
  SquareEnvironment as Environment,
  SquareError,
} from "square";

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

    console.log("Creating Square client");
    const client = new Client({
      token: process.env.SQUARE_ACCESS_TOKEN,
      environment:
        process.env.NODE_ENV === "production"
          ? Environment.Production
          : Environment.Sandbox,
    });

    const { payments } = client;
    console.log("Square client created", JSON.stringify(payments, null, 2));

    const requestBody = {
      sourceId,
      amountMoney: {
        amount: BigInt(amount),
        currency: currency as "EUR" | "USD",
      },
      locationId: process.env.SQUARE_LOCATION_ID!,
      idempotencyKey: `${Date.now()}-${Math.random()}`,
      note: `Bejaus Sessions order - ${items?.length || 0} items`,
      buyerEmailAddress: customer?.email,
    };

    const response = await payments.create(requestBody);

    if (response.payment) {
      const payment = response.payment;
      const successResponse: SquarePaymentResponse = {
        success: true,
        transactionId: payment.id,
        receipt: {
          receiptNumber: payment.receiptNumber || `RCP-${Date.now()}`,
          amount: Number(payment.amountMoney?.amount || 0) / 100,
          currency: payment.amountMoney?.currency || "EUR",
        },
      };

      res.json(successResponse);
    } else {
      throw new Error("Payment processing failed");
    }
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
    console.log("Square products response", response);

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

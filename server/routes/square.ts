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
import { Redis } from "@upstash/redis";

// Helper function to get mock Square products from JSON file
function getMockSquareProducts() {
  try {
    const mockData = fs.readFileSync("square_products_cache.json", "utf8");
    return JSON.parse(mockData);
  } catch (error) {
    console.log("Failed to read mock Square products:", error);
    return [];
  }
}

async function fetchImageUrl(imageId, accessToken) {
  // Always fetch from Square
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
  return data.object?.image_data?.url || null;
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
  const CACHE_KEY = "square_products_cache";
  const CACHE_DURATION = 60 * 60; // 1 hour in seconds
  const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  let redis: any = null;
  if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: UPSTASH_REDIS_REST_URL,
      token: UPSTASH_REDIS_REST_TOKEN,
    });
  }
  try {
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      console.log("Square access token not configured, using mock data");
      res.setHeader("X-Cache", "DISABLED");
      return res.json({ products: getMockSquareProducts() });
    }

    // Check cache first
    if (redis) {
      try {
        const cached = await redis.get(CACHE_KEY);
        if (cached) {
          console.log("Returning cached Square products from Redis");
          res.setHeader("X-Cache", "HIT");
          return res.json({ products: cached });
        }
      } catch (err) {
        console.log("Redis cache error, proceeding without cache:", err);
      }
    } else {
      console.log("Upstash Redis not configured, always fetching from Square");
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
      console.log("Square API failed, using mock data:", errorText);
      res.setHeader("X-Cache", "DISABLED");
      return res.json({ products: getMockSquareProducts() });
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

    // Remove imageCache and cache usage
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

    // Cache the products if Redis is available
    if (redis) {
      try {
        await redis.set(CACHE_KEY, products, { ex: CACHE_DURATION });
        res.setHeader("X-Cache", "MISS");
      } catch (err) {
        console.log("Failed to cache Square products:", err);
        res.setHeader("X-Cache", "ERROR");
      }
    } else {
      res.setHeader("X-Cache", "DISABLED");
    }

    res.json({ products });
  } catch (error) {
    console.error("Error fetching Square products, using mock data:", error);
    res.setHeader("X-Cache", "DISABLED");
    res.json({ products: getMockSquareProducts() });
  }
};

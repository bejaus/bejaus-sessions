import { RequestHandler } from "express";
import {
  SquarePaymentRequest,
  SquarePaymentResponse,
} from "../../shared/square";

// You'll need to install: npm install squareup
// import { Client, Environment, ApiError } from 'squareup';

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

export interface SquarePaymentRequest {
  amount: number; // In cents
  currency: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  customer?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface SquarePaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  receipt?: {
    receiptNumber: string;
    amount: number;
    currency: string;
  };
}

export interface SquareConfig {
  applicationId: string;
  locationId: string;
  environment: "production" | "sandbox";
}

// Default configuration for development/demo using Square's demo credentials
export const DEFAULT_SQUARE_CONFIG: SquareConfig = {
  applicationId: "sandbox-sq0idb-your-sandbox-app-id",
  locationId: "main",
  environment: "sandbox",
};

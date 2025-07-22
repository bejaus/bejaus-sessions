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

export const SQUARE_CONFIG = {
  applicationId: process.env.SQUARE_APPLICATION_ID || 'sandbox-sq0idb-your-app-id',
  locationId: process.env.SQUARE_LOCATION_ID || 'your-location-id',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'production' | 'sandbox',
};

export interface RazorpayOptions {
  keyId: string;
  amount: number;
  currency: string;
  orderId: string;
  name: string;
  description: string;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess: (response: RazorpaySuccessResponse) => void;
  onFailure: (error: RazorpayErrorResponse) => void;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

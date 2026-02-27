import { RazorpayOptions, RazorpayErrorResponse } from '../types';

const RAZORPAY_SCRIPT_ID = 'razorpay-checkout-script';
const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

/**
 * Initializes Razorpay by loading the checkout script dynamically
 * Uses a more robust approach with better error handling
 * @returns Promise that resolves to true if loaded successfully, false otherwise
 */
export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`
    );

    if (existingScript) {
      // Script is already being loaded, wait for it
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    // Create and load the script
    const script = document.createElement('script');
    script.id = RAZORPAY_SCRIPT_ID;
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      console.error('Failed to load Razorpay checkout script');
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

/**
 * Cleans up Razorpay resources after payment completion
 * Removes the script from DOM and clears global Razorpay object
 * Optimized for Next.js to prevent memory leaks and unnecessary background processes
 */
export const cleanupRazorpay = (): void => {
  if (typeof window === 'undefined') return;

  // Remove the script tag from DOM
  const script = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
  if (script) {
    script.remove();
  }

  // Clear the global Razorpay object
  if (window.Razorpay) {
    delete (window as any).Razorpay;
  }
};

/**
 * Opens Razorpay checkout modal with the provided options
 * Returns the Razorpay instance for proper lifecycle management
 * @param options Razorpay checkout options
 * @returns Razorpay instance
 * @throws Error if Razorpay is not loaded
 */
export const openRazorpayCheckout = (options: RazorpayOptions): any => {
  if (!window.Razorpay) {
    throw new Error('Razorpay SDK not loaded. Call initializeRazorpay() first.');
  }

  const rzpOptions = {
    key: options.keyId,
    amount: options.amount,
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.orderId,
    handler: (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => {
      options.onSuccess(response);
    },
    prefill: {
      name: options.prefill.name || '',
      email: options.prefill.email || '',
      contact: options.prefill.contact || '',
    },
    theme: {
      color: '#DDF8E5',
    },
    modal: {
      ondismiss: () => {
        options.onFailure({
          error: {
            code: 'PAYMENT_CANCELLED',
            description: 'Payment cancelled by user',
            source: 'customer',
            step: 'payment_authentication',
            reason: 'user_cancelled',
            metadata: {
              order_id: options.orderId,
              payment_id: '',
            },
          },
        });
      },
    },
  };

  const rzp = new window.Razorpay(rzpOptions);

  // Handle payment failures
  rzp.on('payment.failed', (response: RazorpayErrorResponse) => {
    options.onFailure(response);
  });

  rzp.open();

  return rzp;
};

/**
 * Closes and destroys a Razorpay instance
 * Stops all background polling and network requests
 * @param rzpInstance The Razorpay instance to close
 */
export const closeRazorpayInstance = (rzpInstance: any): void => {
  if (!rzpInstance) return;

  try {
    if (typeof rzpInstance.close === 'function') {
      rzpInstance.close();
    }
  } catch (error) {
    console.error('Error closing Razorpay instance:', error);
  }
};

/**
 * Formats amount in paise to rupees with proper currency formatting
 * @param amountInPaise Amount in paise (smallest currency unit)
 * @returns Formatted amount in rupees with ₹ symbol
 */
export const formatAmountInRupees = (amountInPaise: number): string => {
  const amountInRupees = amountInPaise / 100;
  return `₹${amountInRupees.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

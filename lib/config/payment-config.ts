/**
 * Payment Configuration
 * Centralized configuration for payment gateway settings
 */

export const PAYMENT_CONFIG = {
  // Razorpay Configuration
  razorpay: {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
    environment: (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'sandbox' | 'production'
  },

  // Application URLs
  urls: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001',
    successUrl: '/payment/success',
    failureUrl: '/payment/failure',
    webhookUrl: '/api/webhooks/payment'
  },

  // Payment Settings
  settings: {
    currency: 'INR',
    supportedMethods: ['card', 'upi', 'netbanking', 'wallet'],
    minAmount: 1,
    maxAmount: 1000000, // 10 lakh
    timeout: 30000, // 30 seconds
    retryAttempts: 3
  },

  // Security Settings
  security: {
    enableEncryption: true,
    enableWebhookVerification: true,
    enableFraudDetection: true,
    maxRetryAttempts: 3,
    timeoutMs: 30000
  },

  // UI Settings
  ui: {
    theme: 'light' as 'light' | 'dark',
    primaryColor: '#ea580c', // Orange-600
    showPaymentMethods: ['card', 'upi', 'netbanking', 'wallet'],
    enableSaveCard: false,
    enableUPI: true,
    enableWallet: true,
    enableNetBanking: true,
    enableEMI: false
  },

  // Notification Settings
  notifications: {
    enableEmailNotifications: true,
    enableSMSNotifications: true,
    enablePushNotifications: false,
    emailTemplate: 'payment-confirmation',
    smsTemplate: 'payment-confirmation'
  }
};

/**
 * Get payment configuration for current environment
 */
export function getPaymentConfig() {
  return PAYMENT_CONFIG;
}

/**
 * Validate payment configuration
 */
export function validatePaymentConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!PAYMENT_CONFIG.razorpay.keyId) {
    errors.push('RAZORPAY_KEY_ID is required');
  }

  if (!PAYMENT_CONFIG.razorpay.keySecret) {
    errors.push('RAZORPAY_KEY_SECRET is required');
  }

  if (!PAYMENT_CONFIG.razorpay.webhookSecret) {
    errors.push('RAZORPAY_WEBHOOK_SECRET is required');
  }

  if (!PAYMENT_CONFIG.urls.baseUrl) {
    errors.push('NEXT_PUBLIC_BASE_URL is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Get Razorpay configuration for client-side
 */
export function getClientRazorpayConfig() {
  return {
    key: PAYMENT_CONFIG.razorpay.keyId,
    environment: PAYMENT_CONFIG.razorpay.environment
  };
}

/**
 * Get server-side Razorpay configuration
 */
export function getServerRazorpayConfig() {
  return {
    keyId: PAYMENT_CONFIG.razorpay.keyId,
    keySecret: PAYMENT_CONFIG.razorpay.keySecret,
    webhookSecret: PAYMENT_CONFIG.razorpay.webhookSecret,
    environment: PAYMENT_CONFIG.razorpay.environment
  };
}

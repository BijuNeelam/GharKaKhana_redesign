/**
 * Payment System Types and Interfaces
 * Professional payment gateway integration with comprehensive type safety
 */

// Core Payment Types
export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
  returnUrl: string;
  webhookUrl?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentUrl?: string;
  transactionId?: string;
  gatewayResponse?: any;
  error?: PaymentError;
  timestamp: string;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: string;
  field?: string;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export enum PaymentMethod {
  CARD = 'card',
  UPI = 'upi',
  NET_BANKING = 'net_banking',
  WALLET = 'wallet',
  EMI = 'emi',
  CASH_ON_DELIVERY = 'cod'
}

// Menu Plan Types
export interface MenuPlan {
  id: string;
  name: string;
  type: 'veg' | 'non-veg' | 'combo';
  category: 'normal' | 'special';
  description: string;
  pricePerMeal: number;
  weeklyPrice: number;
  monthlyPrice: number;
  features: string[];
  isPopular?: boolean;
  isAvailable: boolean;
  imageUrl?: string;
}

export interface OrderItem {
  planId: string;
  planName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  duration: 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  deliveryAddress: DeliveryAddress;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface DeliveryAddress {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  deliveryInstructions?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// Payment Gateway Configuration
export interface PaymentGatewayConfig {
  provider: PaymentProvider;
  merchantId: string;
  apiKey: string;
  secretKey: string;
  environment: 'sandbox' | 'production';
  webhookSecret?: string;
  supportedMethods: PaymentMethod[];
  supportedCurrencies: string[];
}

export enum PaymentProvider {
  RAZORPAY = 'razorpay',
  PAYU = 'payu',
  PAYTM = 'paytm',
  STRIPE = 'stripe',
  SQUARE = 'square'
}

// Payment Gateway Response Types
export interface GatewayPaymentRequest {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, any>;
  callback_url: string;
  webhook_url?: string;
}

export interface GatewayPaymentResponse {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  invoice_id?: string;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status?: string;
  captured: boolean;
  description?: string;
  card_id?: string;
  bank?: string;
  wallet?: string;
  vpa?: string;
  email: string;
  contact: string;
  notes: Record<string, any>;
  fee?: number;
  tax?: number;
  error_code?: string;
  error_description?: string;
  error_source?: string;
  error_step?: string;
  error_reason?: string;
  acquirer_data?: Record<string, any>;
  created_at: number;
}

// Validation and Security Types
export interface PaymentValidation {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  code: string;
}

// Webhook Types
export interface PaymentWebhook {
  event: string;
  account_id: string;
  contains: string[];
  payload: {
    payment: {
      entity: GatewayPaymentResponse;
    };
  };
  created_at: number;
}

// Refund Types
export interface RefundRequest {
  paymentId: string;
  amount?: number; // Partial refund if specified, full refund if not
  notes?: string;
  receipt?: string;
}

export interface RefundResponse {
  success: boolean;
  refundId: string;
  paymentId: string;
  amount: number;
  status: string;
  notes?: string;
  receipt?: string;
  error?: PaymentError;
}

// Analytics and Reporting Types
export interface PaymentAnalytics {
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  totalAmount: number;
  averageTransactionValue: number;
  paymentMethodBreakdown: Record<PaymentMethod, number>;
  dailyStats: DailyPaymentStats[];
}

export interface DailyPaymentStats {
  date: string;
  transactions: number;
  amount: number;
  successRate: number;
}

// Configuration Types
export interface PaymentConfig {
  gateway: PaymentGatewayConfig;
  security: SecurityConfig;
  ui: UIConfig;
  notifications: NotificationConfig;
}

export interface SecurityConfig {
  enableEncryption: boolean;
  encryptionKey: string;
  enableWebhookVerification: boolean;
  webhookSecret: string;
  enableFraudDetection: boolean;
  maxRetryAttempts: number;
  timeoutMs: number;
}

export interface UIConfig {
  theme: 'light' | 'dark';
  primaryColor: string;
  showPaymentMethods: PaymentMethod[];
  enableSaveCard: boolean;
  enableUPI: boolean;
  enableWallet: boolean;
  enableNetBanking: boolean;
  enableEMI: boolean;
}

export interface NotificationConfig {
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
  enablePushNotifications: boolean;
  emailTemplate: string;
  smsTemplate: string;
}

// Utility Types
export type PaymentCallback = (response: PaymentResponse) => void;
export type PaymentErrorCallback = (error: PaymentError) => void;

export interface PaymentEventHandlers {
  onSuccess: PaymentCallback;
  onError: PaymentErrorCallback;
  onCancel?: () => void;
  onRetry?: () => void;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

// Database Entity Types
export interface PaymentEntity {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  gatewayProvider: PaymentProvider;
  gatewayTransactionId?: string;
  gatewayResponse?: any;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  failedAt?: string;
  refundedAt?: string;
  refundAmount?: number;
}

export interface OrderEntity {
  id: string;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  deliveryAddress: DeliveryAddress;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

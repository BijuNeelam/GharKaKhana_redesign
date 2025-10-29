/**
 * Payment Service Layer
 * Professional payment gateway integration with comprehensive error handling
 */

import {
  PaymentRequest,
  PaymentResponse,
  PaymentError,
  PaymentStatus,
  PaymentMethod,
  PaymentProvider,
  PaymentGatewayConfig,
  GatewayPaymentRequest,
  GatewayPaymentResponse,
  PaymentValidation,
  ValidationError,
  PaymentWebhook,
  RefundRequest,
  RefundResponse,
  ApiResponse,
  PaymentEntity,
  OrderEntity
} from '@/lib/types/payment';

/**
 * Payment Service Interface
 * Defines the contract for payment operations
 */
export interface IPaymentService {
  createPayment(request: PaymentRequest): Promise<PaymentResponse>;
  verifyPayment(paymentId: string): Promise<PaymentResponse>;
  refundPayment(request: RefundRequest): Promise<RefundResponse>;
  validatePayment(request: PaymentRequest): PaymentValidation;
  handleWebhook(webhook: PaymentWebhook): Promise<boolean>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
  cancelPayment(paymentId: string): Promise<boolean>;
}

/**
 * Payment Gateway Interface
 * Abstract interface for different payment gateways
 */
export interface IPaymentGateway {
  createPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse>;
  verifyPayment(paymentId: string): Promise<GatewayPaymentResponse>;
  refundPayment(paymentId: string, amount?: number): Promise<any>;
  getPaymentStatus(paymentId: string): Promise<string>;
}

/**
 * Razorpay Gateway Implementation
 */
export class RazorpayGateway implements IPaymentGateway {
  private config: PaymentGatewayConfig;
  private baseUrl: string;

  constructor(config: PaymentGatewayConfig) {
    this.config = config;
    this.baseUrl = config.environment === 'production' 
      ? 'https://api.razorpay.com/v1' 
      : 'https://api.razorpay.com/v1';
  }

  async createPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.config.apiKey}:${this.config.secretKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: request.amount * 100, // Convert to paise
          currency: request.currency,
          receipt: request.receipt,
          notes: request.notes,
          callback_url: request.callback_url,
          webhook_url: request.webhook_url,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Payment creation failed: ${errorData.error?.description || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Razorpay payment creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async verifyPayment(paymentId: string): Promise<GatewayPaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.config.apiKey}:${this.config.secretKey}`).toString('base64')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Razorpay payment verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${paymentId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.config.apiKey}:${this.config.secretKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount ? amount * 100 : undefined, // Convert to paise
        }),
      });

      if (!response.ok) {
        throw new Error('Refund failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Razorpay refund failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPaymentStatus(paymentId: string): Promise<string> {
    try {
      const payment = await this.verifyPayment(paymentId);
      return payment.status;
    } catch (error) {
      throw new Error(`Failed to get payment status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

/**
 * Payment Service Implementation
 * Main service class handling all payment operations
 */
export class PaymentService implements IPaymentService {
  private gateway: IPaymentGateway;
  private config: PaymentGatewayConfig;

  constructor(config: PaymentGatewayConfig) {
    this.config = config;
    this.gateway = new RazorpayGateway(config);
  }

  /**
   * Create a new payment
   */
  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Validate payment request
      const validation = this.validatePayment(request);
      if (!validation.isValid) {
        return {
          success: false,
          paymentId: '',
          orderId: request.orderId,
          amount: request.amount,
          currency: request.currency,
          status: PaymentStatus.FAILED,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Payment validation failed',
            details: validation.errors.map(e => e.message).join(', ')
          },
          timestamp: new Date().toISOString()
        };
      }

      // Create gateway payment request
      const gatewayRequest: GatewayPaymentRequest = {
        amount: request.amount,
        currency: request.currency,
        receipt: request.orderId,
        notes: {
          customer_id: request.customerId,
          customer_email: request.customerEmail,
          customer_phone: request.customerPhone,
          description: request.description,
          ...request.metadata
        },
        callback_url: request.returnUrl,
        webhook_url: request.webhookUrl
      };

      // Create payment with gateway
      const gatewayResponse = await this.gateway.createPayment(gatewayRequest);

      // Create payment entity for database
      const paymentEntity: PaymentEntity = {
        id: gatewayResponse.id,
        orderId: request.orderId,
        customerId: request.customerId,
        amount: request.amount,
        currency: request.currency,
        status: PaymentStatus.PENDING,
        paymentMethod: PaymentMethod.CARD, // Default, will be updated after payment
        gatewayProvider: this.config.provider,
        gatewayTransactionId: gatewayResponse.id,
        gatewayResponse: gatewayResponse,
        metadata: request.metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to database (implement based on your database choice)
      await this.savePaymentEntity(paymentEntity);

      return {
        success: true,
        paymentId: gatewayResponse.id,
        orderId: request.orderId,
        amount: request.amount,
        currency: request.currency,
        status: PaymentStatus.PENDING,
        paymentUrl: gatewayResponse.short_url || gatewayResponse.id,
        transactionId: gatewayResponse.id,
        gatewayResponse: gatewayResponse,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Payment creation failed:', error);
      return {
        success: false,
        paymentId: '',
        orderId: request.orderId,
        amount: request.amount,
        currency: request.currency,
        status: PaymentStatus.FAILED,
        error: {
          code: 'PAYMENT_CREATION_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: 'Failed to create payment with gateway'
        },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Verify payment status
   */
  async verifyPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const gatewayResponse = await this.gateway.verifyPayment(paymentId);
      
      // Update payment status based on gateway response
      const status = this.mapGatewayStatusToPaymentStatus(gatewayResponse.status);
      
      // Update payment entity in database
      await this.updatePaymentStatus(paymentId, status, gatewayResponse);

      return {
        success: status === PaymentStatus.SUCCESS,
        paymentId: gatewayResponse.id,
        orderId: gatewayResponse.order_id,
        amount: gatewayResponse.amount / 100, // Convert from paise
        currency: gatewayResponse.currency,
        status: status,
        transactionId: gatewayResponse.id,
        gatewayResponse: gatewayResponse,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Payment verification failed:', error);
      return {
        success: false,
        paymentId: paymentId,
        orderId: '',
        amount: 0,
        currency: 'INR',
        status: PaymentStatus.FAILED,
        error: {
          code: 'PAYMENT_VERIFICATION_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: 'Failed to verify payment with gateway'
        },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Process refund
   */
  async refundPayment(request: RefundRequest): Promise<RefundResponse> {
    try {
      const gatewayResponse = await this.gateway.refundPayment(request.paymentId, request.amount);
      
      return {
        success: true,
        refundId: gatewayResponse.id,
        paymentId: request.paymentId,
        amount: gatewayResponse.amount / 100, // Convert from paise
        status: gatewayResponse.status,
        notes: request.notes,
        receipt: request.receipt
      };

    } catch (error) {
      console.error('Refund failed:', error);
      return {
        success: false,
        refundId: '',
        paymentId: request.paymentId,
        amount: 0,
        status: 'failed',
        error: {
          code: 'REFUND_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: 'Failed to process refund with gateway'
        }
      };
    }
  }

  /**
   * Validate payment request
   */
  validatePayment(request: PaymentRequest): PaymentValidation {
    const errors: ValidationError[] = [];
    const warnings: any[] = [];

    // Amount validation
    if (request.amount <= 0) {
      errors.push({
        field: 'amount',
        message: 'Amount must be greater than 0',
        code: 'INVALID_AMOUNT'
      });
    }

    if (request.amount > 100000) { // 1 lakh limit
      warnings.push({
        field: 'amount',
        message: 'Amount exceeds recommended limit',
        code: 'HIGH_AMOUNT_WARNING'
      });
    }

    // Currency validation
    if (!request.currency || request.currency !== 'INR') {
      errors.push({
        field: 'currency',
        message: 'Only INR currency is supported',
        code: 'UNSUPPORTED_CURRENCY'
      });
    }

    // Customer validation
    if (!request.customerEmail || !this.isValidEmail(request.customerEmail)) {
      errors.push({
        field: 'customerEmail',
        message: 'Valid email address is required',
        code: 'INVALID_EMAIL'
      });
    }

    if (!request.customerPhone || !this.isValidPhone(request.customerPhone)) {
      errors.push({
        field: 'customerPhone',
        message: 'Valid phone number is required',
        code: 'INVALID_PHONE'
      });
    }

    // Order ID validation
    if (!request.orderId || request.orderId.length < 3) {
      errors.push({
        field: 'orderId',
        message: 'Order ID must be at least 3 characters',
        code: 'INVALID_ORDER_ID'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Handle payment webhook
   */
  async handleWebhook(webhook: PaymentWebhook): Promise<boolean> {
    try {
      // Verify webhook signature (implement based on your security requirements)
      if (!this.verifyWebhookSignature(webhook)) {
        console.error('Invalid webhook signature');
        return false;
      }

      const payment = webhook.payload.payment.entity;
      const status = this.mapGatewayStatusToPaymentStatus(payment.status);

      // Update payment status in database
      await this.updatePaymentStatus(payment.id, status, payment);

      // Trigger order status update if payment is successful
      if (status === PaymentStatus.SUCCESS) {
        await this.updateOrderStatus(payment.order_id, 'confirmed');
      }

      return true;

    } catch (error) {
      console.error('Webhook handling failed:', error);
      return false;
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    try {
      const status = await this.gateway.getPaymentStatus(paymentId);
      return this.mapGatewayStatusToPaymentStatus(status);
    } catch (error) {
      console.error('Failed to get payment status:', error);
      return PaymentStatus.FAILED;
    }
  }

  /**
   * Cancel payment
   */
  async cancelPayment(paymentId: string): Promise<boolean> {
    try {
      // Check if payment can be cancelled
      const status = await this.getPaymentStatus(paymentId);
      if (status !== PaymentStatus.PENDING) {
        return false;
      }

      // Update payment status to cancelled
      await this.updatePaymentStatus(paymentId, PaymentStatus.CANCELLED);
      return true;

    } catch (error) {
      console.error('Payment cancellation failed:', error);
      return false;
    }
  }

  // Private helper methods

  private mapGatewayStatusToPaymentStatus(gatewayStatus: string): PaymentStatus {
    switch (gatewayStatus.toLowerCase()) {
      case 'created':
      case 'authorized':
        return PaymentStatus.PENDING;
      case 'captured':
        return PaymentStatus.SUCCESS;
      case 'failed':
        return PaymentStatus.FAILED;
      case 'cancelled':
        return PaymentStatus.CANCELLED;
      case 'refunded':
        return PaymentStatus.REFUNDED;
      default:
        return PaymentStatus.PENDING;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }

  private verifyWebhookSignature(webhook: PaymentWebhook): boolean {
    // Implement webhook signature verification
    // This is a placeholder - implement based on your security requirements
    return true;
  }

  private async savePaymentEntity(payment: PaymentEntity): Promise<void> {
    // Implement database save operation
    // This is a placeholder - implement based on your database choice
    console.log('Saving payment entity:', payment);
  }

  private async updatePaymentStatus(paymentId: string, status: PaymentStatus, gatewayResponse?: any): Promise<void> {
    // Implement database update operation
    // This is a placeholder - implement based on your database choice
    console.log('Updating payment status:', { paymentId, status, gatewayResponse });
  }

  private async updateOrderStatus(orderId: string, status: string): Promise<void> {
    // Implement order status update
    // This is a placeholder - implement based on your database choice
    console.log('Updating order status:', { orderId, status });
  }
}

/**
 * Payment Service Factory
 * Creates payment service instances with proper configuration
 */
export class PaymentServiceFactory {
  static createService(config: PaymentGatewayConfig): PaymentService {
    return new PaymentService(config);
  }

  static createRazorpayService(apiKey: string, secretKey: string, environment: 'sandbox' | 'production' = 'sandbox'): PaymentService {
    const config: PaymentGatewayConfig = {
      provider: PaymentProvider.RAZORPAY,
      merchantId: '',
      apiKey,
      secretKey,
      environment,
      supportedMethods: [PaymentMethod.CARD, PaymentMethod.UPI, PaymentMethod.NET_BANKING, PaymentMethod.WALLET],
      supportedCurrencies: ['INR']
    };

    return new PaymentService(config);
  }
}

/**
 * Payment Utility Functions
 */
export class PaymentUtils {
  static formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  static generateOrderId(prefix: string = 'GK'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}_${timestamp}_${random}`;
  }

  static validateAmount(amount: number): boolean {
    return amount > 0 && amount <= 1000000; // 10 lakh limit
  }

  static sanitizePhoneNumber(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  static maskCardNumber(cardNumber: string): string {
    if (cardNumber.length < 8) return cardNumber;
    return cardNumber.slice(0, 4) + '****' + cardNumber.slice(-4);
  }

  static maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    return username.slice(0, 2) + '***@' + domain;
  }
}

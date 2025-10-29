# Payment Gateway Integration - Ghar Ka Khana

## Overview

This document describes the comprehensive payment gateway integration implemented for the Ghar Ka Khana website. The system follows professional software architecture principles with proper separation of concerns, error handling, and security measures.

## Architecture

### System Components

1. **Payment Types & Interfaces** (`lib/types/payment.ts`)
   - Comprehensive TypeScript types for all payment operations
   - Payment request/response interfaces
   - Order and customer data structures
   - Webhook and validation types

2. **Payment Service Layer** (`lib/services/payment-service.ts`)
   - Abstract payment gateway interface
   - Razorpay gateway implementation
   - Payment service with error handling
   - Utility functions for payment operations

3. **Menu Plans Data** (`lib/data/menu-plans.ts`)
   - Menu plan definitions with pricing
   - Plan comparison utilities
   - Recommendation algorithms

4. **Payment Components** (`components/payment/`)
   - `PaymentForm` - Secure payment form with validation
   - `OrderSummary` - Order details and status display
   - `PaymentStatusComponent` - Payment status tracking

5. **API Routes** (`app/api/`)
   - `/api/payments/create` - Create payment requests
   - `/api/payments/verify` - Verify payment status
   - `/api/webhooks/payment` - Handle payment webhooks

6. **Checkout Flow** (`app/checkout/`)
   - Multi-step checkout process
   - Order validation and creation
   - Payment integration

## Features

### Payment Methods Supported
- Credit/Debit Cards (Visa, Mastercard, RuPay)
- UPI (Google Pay, PhonePe, Paytm)
- Net Banking (All major banks)
- Digital Wallets (Paytm, PhonePe, Mobikwik)

### Security Features
- 256-bit SSL encryption
- PCI DSS compliance
- Webhook signature verification
- Payment validation and sanitization
- Fraud detection capabilities

### User Experience
- Responsive design for all devices
- Real-time payment status updates
- Comprehensive error handling
- Order confirmation and tracking
- Email and SMS notifications

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret_here

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3001
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here

# Environment
NODE_ENV=development
```

### 2. Razorpay Account Setup

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the dashboard
3. Configure webhook URL: `https://yourdomain.com/api/webhooks/payment`
4. Set up webhook events: `payment.captured`, `payment.failed`

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm run dev
```

## Usage

### Creating a Payment

```typescript
import { PaymentServiceFactory } from '@/lib/services/payment-service';

const paymentService = PaymentServiceFactory.createRazorpayService(
  process.env.RAZORPAY_KEY_ID,
  process.env.RAZORPAY_KEY_SECRET
);

const paymentRequest = {
  amount: 1000,
  currency: 'INR',
  orderId: 'GK_123456789',
  customerId: 'customer@example.com',
  customerEmail: 'customer@example.com',
  customerPhone: '9876543210',
  description: 'Payment for Ghar Ka Khana Order',
  returnUrl: 'https://yourdomain.com/payment/success',
  webhookUrl: 'https://yourdomain.com/api/webhooks/payment'
};

const response = await paymentService.createPayment(paymentRequest);
```

### Verifying Payment

```typescript
const verificationResponse = await paymentService.verifyPayment(paymentId);
```

### Handling Webhooks

```typescript
// Webhook handler is automatically configured
// Ensure webhook URL is set in Razorpay dashboard
```

## Menu Plans Integration

### Available Plans

1. **Veg Normal** - ₹79/meal
2. **Veg Special** - ₹89/meal
3. **Combo Normal** - ₹84/meal (2 days chicken + 4 days veg)
4. **Combo Special** - ₹94/meal
5. **Non-Veg Normal** - ₹110/meal
6. **Non-Veg Special** - ₹120/meal

### Pricing Structure

- **Weekly Plans**: 6 days of meals
- **Monthly Plans**: 25 days of meals
- **Free Delivery**: Within CBD Belapur area
- **Additional Charges**: ₹9 for single delivery

## API Endpoints

### Create Payment
```
POST /api/payments/create
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "orderId": "GK_123456789",
  "customerId": "customer@example.com",
  "customerEmail": "customer@example.com",
  "customerPhone": "9876543210",
  "description": "Payment for Ghar Ka Khana Order"
}
```

### Verify Payment
```
POST /api/payments/verify
Content-Type: application/json

{
  "paymentId": "pay_123456789"
}
```

### Webhook Handler
```
POST /api/webhooks/payment
Content-Type: application/json
X-Razorpay-Signature: <signature>

{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": { ... }
    }
  }
}
```

## Error Handling

### Payment Errors
- **VALIDATION_ERROR**: Invalid payment data
- **PAYMENT_CREATION_FAILED**: Gateway error
- **PAYMENT_VERIFICATION_FAILED**: Verification failed
- **REFUND_FAILED**: Refund processing failed

### Common Error Scenarios
1. **Insufficient Funds**: Customer account has insufficient balance
2. **Card Declined**: Bank declined the transaction
3. **Network Issues**: Connection timeout or network error
4. **Invalid Data**: Missing or invalid payment information

## Security Considerations

### Data Protection
- All sensitive data is encrypted
- Card details are never stored
- PCI DSS compliance maintained
- Secure webhook verification

### Fraud Prevention
- Payment amount validation
- Customer data verification
- Webhook signature verification
- Rate limiting on API endpoints

## Testing

### Test Cards (Sandbox Mode)

**Successful Payment:**
- Card Number: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payment:**
- Card Number: 4000 0000 0000 0002
- CVV: Any 3 digits
- Expiry: Any future date

### Test UPI IDs
- `success@razorpay`
- `failure@razorpay`

## Monitoring and Analytics

### Payment Analytics
- Transaction success rates
- Payment method preferences
- Average transaction values
- Daily/weekly/monthly reports

### Error Monitoring
- Failed payment tracking
- Error rate analysis
- Performance metrics
- User experience metrics

## Deployment

### Production Checklist
- [ ] Update environment variables
- [ ] Configure production Razorpay keys
- [ ] Set up webhook endpoints
- [ ] Enable SSL certificates
- [ ] Configure monitoring
- [ ] Test payment flows
- [ ] Set up error tracking

### Environment Variables (Production)
```env
NODE_ENV=production
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=your_live_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_BASE_URL=https://gharkakhana.life
```

## Support and Maintenance

### Common Issues
1. **Payment Not Captured**: Check webhook configuration
2. **Signature Verification Failed**: Verify webhook secret
3. **Order Not Created**: Check database connection
4. **Email Not Sent**: Verify SMTP configuration

### Monitoring
- Payment success rates
- Error logs and alerts
- Performance metrics
- User feedback

## Future Enhancements

### Planned Features
1. **Subscription Management**: Recurring payment support
2. **Multiple Payment Gateways**: PayU, Paytm integration
3. **Advanced Analytics**: Detailed reporting dashboard
4. **Mobile App Integration**: React Native support
5. **International Payments**: Multi-currency support

### Scalability Considerations
- Database optimization
- Caching strategies
- Load balancing
- Microservices architecture

## Conclusion

This payment integration provides a robust, secure, and user-friendly payment system for Ghar Ka Khana. The architecture follows industry best practices and is designed for scalability and maintainability.

For technical support or questions, please contact the development team or refer to the Razorpay documentation.

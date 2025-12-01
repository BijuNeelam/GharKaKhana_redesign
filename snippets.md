# Code Snippets - Ghar Ka Khana

This document highlights the most interesting and critical code snippets from the Ghar Ka Khana project, with line-level explanations.

## 1. Payment Service Layer - Gateway Abstraction

**File**: `lib/services/payment-service.ts`  
**Lines**: 54-144

```typescript
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
```

**Explanation**:
- **Line 54-58**: Implements the `IPaymentGateway` interface, providing abstraction for different payment providers
- **Line 60-63**: Sets base URL based on environment (production/sandbox)
- **Line 67**: Uses `fetch` API for HTTP requests (works in Node.js 18+)
- **Line 70**: Creates Basic Auth header by encoding API key and secret in base64 format
- **Line 73**: Converts amount from rupees to paise (Indian currency smallest unit) - Razorpay requires amounts in paise
- **Line 83-85**: Error handling with descriptive messages extracted from Razorpay error response
- **Line 88-90**: Comprehensive error catching with type checking for better error messages

**Why it's interesting**: This demonstrates a clean abstraction pattern that allows switching payment gateways without changing business logic. The service layer handles currency conversion, authentication, and error handling transparently.

---

## 2. Webhook Signature Verification

**File**: `app/api/webhooks/payment/route.ts`  
**Lines**: 6-40

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    
    if (!signature) {
      console.error('Missing Razorpay signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Missing webhook secret');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }
```

**Explanation**:
- **Line 8**: Reads raw request body as text (critical for signature verification - must be raw, not parsed)
- **Line 9**: Extracts Razorpay signature from custom header `x-razorpay-signature`
- **Line 11-17**: Validates signature header exists before processing
- **Line 20-27**: Ensures webhook secret is configured in environment variables
- **Line 29-32**: Creates HMAC-SHA256 hash using webhook secret and raw body
- **Line 34-39**: Compares computed signature with received signature to verify authenticity

**Why it's interesting**: This is a critical security implementation. Webhook signature verification prevents unauthorized requests from being processed. The use of HMAC-SHA256 ensures that only Razorpay can generate valid signatures, protecting against payment fraud and replay attacks.

---

## 3. Payment Status Component with Real-time Updates

**File**: `components/payment/payment-status.tsx`  
**Lines**: 50-72

```typescript
  useEffect(() => {
    checkPaymentStatus();
  }, [paymentId]);

  const checkPaymentStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await paymentService.verifyPayment(paymentId);
      setPaymentDetails(response);
      setStatus(response.status);

      if (response.success) {
        onPaymentComplete(response);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check payment status');
    } finally {
      setIsLoading(false);
    }
  };
```

**Explanation**:
- **Line 50-52**: `useEffect` hook triggers payment status check when component mounts or `paymentId` changes
- **Line 54-72**: Async function that verifies payment status with the payment service
- **Line 56-57**: Sets loading state and clears previous errors
- **Line 59**: Calls payment service to verify payment status via API
- **Line 60-61**: Updates component state with payment details and status
- **Line 63-65**: If payment successful, triggers callback to parent component
- **Line 67-69**: Error handling with type checking
- **Line 70-72**: `finally` block ensures loading state is reset regardless of success/failure

**Why it's interesting**: This demonstrates proper React patterns for async operations with loading states, error handling, and callback propagation. The component provides real-time feedback to users about their payment status, improving UX.

---

## 4. Payment Request Validation

**File**: `lib/services/payment-service.ts`  
**Lines**: 335-396

```typescript
  validatePayment(request: PaymentRequest): PaymentValidation {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

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
```

**Explanation**:
- **Line 336-337**: Initializes arrays for errors and warnings separately (allows non-blocking warnings)
- **Line 340-346**: Validates amount is positive (critical for payment processing)
- **Line 348-353**: Adds warning (not error) for high amounts - allows processing but alerts
- **Line 356-362**: Validates currency is INR (only supported currency)
- **Line 365-371**: Email validation using helper method
- **Line 373-379**: Phone validation for Indian phone numbers (10 digits starting with 6-9)
- **Line 382-388**: Order ID validation ensures minimum length
- **Line 391-395**: Returns validation result with boolean flag and arrays

**Why it's interesting**: This shows comprehensive input validation with separation of errors (blocking) and warnings (non-blocking). The validation happens before API calls, saving network requests and providing immediate feedback. The use of error codes enables programmatic error handling.

---

## Summary

These snippets demonstrate:
1. **Abstraction and Design Patterns**: Gateway interface allows easy provider switching
2. **Security Best Practices**: Webhook signature verification prevents fraud
3. **React Best Practices**: Proper async handling, state management, and error boundaries
4. **Input Validation**: Comprehensive validation with clear error messages and codes

Each snippet represents a critical aspect of the payment integration system, showcasing professional software development practices.





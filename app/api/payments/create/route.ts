import { NextRequest, NextResponse } from 'next/server';
import { PaymentService, PaymentServiceFactory } from '@/lib/services/payment-service';
import { PaymentRequest } from '@/lib/types/payment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { amount, currency, orderId, customerId, customerEmail, customerPhone, description } = body;
    
    if (!amount || !currency || !orderId || !customerId || !customerEmail || !customerPhone || !description) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    // Create payment service
    const paymentService = PaymentServiceFactory.createRazorpayService(
      process.env.RAZORPAY_KEY_ID || '',
      process.env.RAZORPAY_KEY_SECRET || '',
      process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
    );

    // Create payment request
    const paymentRequest: PaymentRequest = {
      amount: parseFloat(amount),
      currency: currency || 'INR',
      orderId,
      customerId,
      customerEmail,
      customerPhone,
      description,
      returnUrl: body.returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      webhookUrl: body.webhookUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/payment`,
      metadata: body.metadata || {}
    };

    // Create payment
    const response = await paymentService.createPayment(paymentRequest);

    if (response.success) {
      return NextResponse.json({
        success: true,
        data: {
          paymentId: response.paymentId,
          orderId: response.orderId,
          amount: response.amount,
          currency: response.currency,
          status: response.status,
          paymentUrl: response.paymentUrl,
          transactionId: response.transactionId
        }
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: response.error?.message || 'Payment creation failed' 
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

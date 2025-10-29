import { NextRequest, NextResponse } from 'next/server';
import { PaymentService, PaymentServiceFactory } from '@/lib/services/payment-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId } = body;
    
    if (!paymentId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment ID is required' 
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

    // Verify payment
    const response = await paymentService.verifyPayment(paymentId);

    return NextResponse.json({
      success: response.success,
      data: {
        paymentId: response.paymentId,
        orderId: response.orderId,
        amount: response.amount,
        currency: response.currency,
        status: response.status,
        transactionId: response.transactionId,
        timestamp: response.timestamp
      },
      error: response.error
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PaymentService, PaymentServiceFactory } from '@/lib/services/payment-service';
import { PaymentWebhook } from '@/lib/types/payment';
import crypto from 'crypto';

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

    // Parse webhook payload
    const webhookData: PaymentWebhook = JSON.parse(body);
    
    // Create payment service
    const paymentService = PaymentServiceFactory.createRazorpayService(
      process.env.RAZORPAY_KEY_ID || '',
      process.env.RAZORPAY_KEY_SECRET || '',
      process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
    );

    // Handle webhook
    const success = await paymentService.handleWebhook(webhookData);

    if (success) {
      console.log('Webhook processed successfully:', webhookData.event);
      return NextResponse.json({ success: true });
    } else {
      console.error('Webhook processing failed');
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

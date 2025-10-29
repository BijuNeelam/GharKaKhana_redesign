"use client"

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PaymentStatusComponent } from '@/components/payment/payment-status';
import { PaymentResponse } from '@/lib/types/payment';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const orderId = searchParams.get('order_id');
    
    if (paymentId && orderId) {
      // Create a mock successful payment response
      const response: PaymentResponse = {
        success: true,
        paymentId,
        orderId,
        amount: 0, // Will be fetched from payment verification
        currency: 'INR',
        status: 'success' as any,
        timestamp: new Date().toISOString()
      };
      
      setPaymentResponse(response);
    }
    
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (!paymentResponse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Verification Failed</h1>
          <p className="text-gray-600 mb-6">Unable to verify your payment. Please contact support.</p>
          <a 
            href="/contact" 
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <PaymentStatusComponent
      paymentId={paymentResponse.paymentId}
      orderId={paymentResponse.orderId}
      onPaymentComplete={() => {}}
      onRetry={() => window.location.href = '/checkout'}
      onGoHome={() => window.location.href = '/'}
    />
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}

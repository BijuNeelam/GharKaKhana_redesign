"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  RefreshCw,
  ArrowLeft,
  Home,
  Receipt
} from 'lucide-react';
import { PaymentStatus, PaymentResponse } from '@/lib/types/payment';
import { PaymentService, PaymentServiceFactory } from '@/lib/services/payment-service';
import { PaymentUtils } from '@/lib/services/payment-service';

interface PaymentStatusProps {
  paymentId: string;
  orderId: string;
  onPaymentComplete: (response: PaymentResponse) => void;
  onRetry: () => void;
  onGoHome: () => void;
}

export function PaymentStatusComponent({
  paymentId,
  orderId,
  onPaymentComplete,
  onRetry,
  onGoHome
}: PaymentStatusProps) {
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentResponse | null>(null);

  // Initialize payment service
  const [paymentService] = useState(() => 
    PaymentServiceFactory.createRazorpayService(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET || '',
      process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
    )
  );

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

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.SUCCESS:
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case PaymentStatus.FAILED:
        return <XCircle className="h-16 w-16 text-red-500" />;
      case PaymentStatus.CANCELLED:
        return <XCircle className="h-16 w-16 text-gray-500" />;
      case PaymentStatus.PENDING:
      case PaymentStatus.PROCESSING:
        return <Clock className="h-16 w-16 text-yellow-500" />;
      default:
        return <AlertCircle className="h-16 w-16 text-gray-500" />;
    }
  };

  const getStatusTitle = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.SUCCESS:
        return 'Payment Successful!';
      case PaymentStatus.FAILED:
        return 'Payment Failed';
      case PaymentStatus.CANCELLED:
        return 'Payment Cancelled';
      case PaymentStatus.PENDING:
        return 'Payment Pending';
      case PaymentStatus.PROCESSING:
        return 'Processing Payment';
      default:
        return 'Payment Status Unknown';
    }
  };

  const getStatusDescription = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.SUCCESS:
        return 'Your payment has been processed successfully. Your order is confirmed and will be prepared fresh for delivery.';
      case PaymentStatus.FAILED:
        return 'We encountered an issue processing your payment. Please try again or contact support if the problem persists.';
      case PaymentStatus.CANCELLED:
        return 'Your payment was cancelled. No charges have been made to your account.';
      case PaymentStatus.PENDING:
        return 'Your payment is being processed. Please wait while we confirm your payment.';
      case PaymentStatus.PROCESSING:
        return 'Your payment is being processed. This may take a few moments.';
      default:
        return 'We are unable to determine the status of your payment. Please contact support.';
    }
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.SUCCESS:
        return 'bg-green-100 text-green-800 border-green-200';
      case PaymentStatus.FAILED:
        return 'bg-red-100 text-red-800 border-red-200';
      case PaymentStatus.CANCELLED:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case PaymentStatus.PENDING:
      case PaymentStatus.PROCESSING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const canRetry = status === PaymentStatus.FAILED || status === PaymentStatus.CANCELLED;
  const isSuccess = status === PaymentStatus.SUCCESS;
  const isPending = status === PaymentStatus.PENDING || status === PaymentStatus.PROCESSING;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isLoading ? (
              <RefreshCw className="h-16 w-16 text-orange-500 animate-spin" />
            ) : status ? (
              getStatusIcon(status)
            ) : (
              <AlertCircle className="h-16 w-16 text-gray-500" />
            )}
          </div>
          
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isLoading ? 'Checking Payment Status...' : status ? getStatusTitle(status) : 'Payment Status'}
          </CardTitle>
          
          <p className="text-gray-600 mt-2">
            {isLoading 
              ? 'Please wait while we verify your payment' 
              : status 
                ? getStatusDescription(status)
                : 'Unable to determine payment status'
            }
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment Details */}
          {paymentDetails && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono">{paymentDetails.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono">{paymentDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">{PaymentUtils.formatAmount(paymentDetails.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(paymentDetails.status)}>
                    {paymentDetails.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Time:</span>
                  <span>{new Date(paymentDetails.timestamp).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-800">Error</span>
              </div>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Order Confirmed!</span>
              </div>
              <p className="text-green-700">
                Your order has been confirmed and will be prepared fresh. You will receive a confirmation email shortly.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {canRetry && (
              <Button
                onClick={onRetry}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            
            {isSuccess && (
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Print Receipt
              </Button>
            )}
            
            <Button
              onClick={onGoHome}
              variant="outline"
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Button>
          </div>

          {/* Additional Information */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Need help? Contact us at{' '}
              <a href="tel:+918108325444" className="text-orange-600 hover:underline">
                +91 81083 25444
              </a>
            </p>
            <p className="mt-1">
              or email us at{' '}
              <a href="mailto:support@gharkakhana.life" className="text-orange-600 hover:underline">
                support@gharkakhana.life
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

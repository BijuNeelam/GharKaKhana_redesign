"use client"

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, RefreshCw, Home, Phone } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error_code');
  const errorDescription = searchParams.get('error_description');

  const getErrorMessage = () => {
    if (errorDescription) {
      return errorDescription;
    }
    
    switch (errorCode) {
      case 'PAYMENT_CANCELLED':
        return 'You cancelled the payment. No charges have been made to your account.';
      case 'PAYMENT_FAILED':
        return 'Your payment could not be processed. Please try again or use a different payment method.';
      case 'INSUFFICIENT_FUNDS':
        return 'Your account has insufficient funds. Please try with a different payment method.';
      case 'CARD_DECLINED':
        return 'Your card was declined. Please try with a different card or contact your bank.';
      default:
        return 'We encountered an issue processing your payment. Please try again or contact support.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Failed
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {getErrorMessage()}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Error Details */}
          {errorCode && (
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm text-red-700">
                <div className="font-semibold">Error Code: {errorCode}</div>
                {errorDescription && (
                  <div className="mt-1">Details: {errorDescription}</div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/checkout" className="block">
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </Link>
            
            <Link href="/menu" className="block">
              <Button variant="outline" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Browse Menu
              </Button>
            </Link>
          </div>

          {/* Support Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you continue to experience issues, please contact our support team.
            </p>
            <div className="space-y-2">
              <a 
                href="tel:+918108325444" 
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
              >
                <Phone className="h-4 w-4" />
                <span>+91 81083 25444</span>
              </a>
              <a 
                href="mailto:support@gharkakhana.life" 
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
              >
                <span className="h-4 w-4">✉</span>
                <span>support@gharkakhana.life</span>
              </a>
            </div>
          </div>

          {/* Common Solutions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Common Solutions</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Ensure your card has sufficient funds</li>
              <li>• Try a different payment method</li>
              <li>• Contact your bank if the issue persists</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

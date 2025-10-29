"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Lock
} from 'lucide-react';
import { 
  PaymentRequest, 
  PaymentResponse, 
  PaymentMethod, 
  PaymentStatus,
  PaymentError 
} from '@/lib/types/payment';
import { PaymentService, PaymentServiceFactory } from '@/lib/services/payment-service';
import { PaymentUtils } from '@/lib/services/payment-service';

interface PaymentFormProps {
  orderId: string;
  amount: number;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  onPaymentSuccess: (response: PaymentResponse) => void;
  onPaymentError: (error: PaymentError) => void;
  onPaymentCancel: () => void;
}

export function PaymentForm({
  orderId,
  amount,
  customerEmail,
  customerPhone,
  customerName,
  onPaymentSuccess,
  onPaymentError,
  onPaymentCancel
}: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(PaymentMethod.CARD);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Initialize payment service
  const [paymentService] = useState(() => 
    PaymentServiceFactory.createRazorpayService(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET || '',
      process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
    )
  );

  const paymentMethods = [
    {
      id: PaymentMethod.CARD,
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay',
      popular: true
    },
    {
      id: PaymentMethod.UPI,
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm',
      popular: true
    },
    {
      id: PaymentMethod.NET_BANKING,
      name: 'Net Banking',
      icon: Building2,
      description: 'All major banks',
      popular: false
    },
    {
      id: PaymentMethod.WALLET,
      name: 'Wallet',
      icon: Wallet,
      description: 'Paytm, PhonePe, Mobikwik',
      popular: false
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const paymentRequest: PaymentRequest = {
        amount,
        currency: 'INR',
        orderId,
        customerId: customerEmail,
        customerEmail,
        customerPhone,
        description: `Payment for Ghar Ka Khana Order #${orderId}`,
        returnUrl: `${window.location.origin}/payment/success`,
        webhookUrl: `${window.location.origin}/api/webhooks/payment`,
        metadata: {
          customerName,
          paymentMethod: selectedMethod
        }
      };

      const response = await paymentService.createPayment(paymentRequest);

      if (response.success && response.paymentUrl) {
        // Redirect to payment gateway
        window.location.href = response.paymentUrl;
      } else {
        throw new Error(response.error?.message || 'Payment creation failed');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      onPaymentError({
        code: 'PAYMENT_FAILED',
        message: errorMessage
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'number') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
    } else if (field === 'expiry') {
      // Format expiry date
      formattedValue = value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      // Limit CVV to 4 digits
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const isCardValid = () => {
    if (selectedMethod !== PaymentMethod.CARD) return true;
    
    const { number, expiry, cvv, name } = cardDetails;
    return (
      number.replace(/\s/g, '').length >= 13 &&
      expiry.length === 5 &&
      cvv.length >= 3 &&
      name.trim().length > 0
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <Card className="border-2 border-orange-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Lock className="h-6 w-6 text-orange-600" />
            Secure Payment
          </CardTitle>
          <p className="text-gray-600">Complete your order with confidence</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order #{orderId}</span>
              <span className="text-xl font-bold text-orange-600">
                {PaymentUtils.formatAmount(amount)}
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{method.name}</div>
                        <div className="text-xs text-gray-500">{method.description}</div>
                      </div>
                      {method.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card Details Form */}
          {selectedMethod === PaymentMethod.CARD && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Card Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => handleCardInputChange('number', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => handleCardInputChange('name', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Security Features */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">Secure Payment</span>
            </div>
            <div className="text-sm text-green-700 space-y-1">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>PCI DSS compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Your card details are never stored</span>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">Payment Error</span>
              </div>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onPaymentCancel}
              variant="outline"
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={!isCardValid() || isProcessing}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pay {PaymentUtils.formatAmount(amount)}
                </>
              )}
            </Button>
          </div>

          {/* Terms and Conditions */}
          <div className="text-xs text-gray-500 text-center">
            By proceeding, you agree to our{' '}
            <a href="/terms" className="text-orange-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-orange-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

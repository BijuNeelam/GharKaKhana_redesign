"use client"

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ShoppingCart, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { PaymentForm } from '@/components/payment/payment-form';
import { OrderSummary } from '@/components/payment/order-summary';
import { PaymentStatusComponent } from '@/components/payment/payment-status';
import { 
  MenuPlan, 
  Order, 
  OrderItem, 
  DeliveryAddress, 
  PaymentResponse, 
  PaymentError,
  PaymentStatus
} from '@/lib/types/payment';
import { getMenuPlanById, calculatePlanPricing } from '@/lib/data/menu-plans';
import { PaymentUtils } from '@/lib/services/payment-service';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [currentStep, setCurrentStep] = useState<'order' | 'payment' | 'status'>('order');
  const [selectedPlan, setSelectedPlan] = useState<MenuPlan | null>(null);
  const [duration, setDuration] = useState<'weekly' | 'monthly'>('weekly');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    pincode: '',
    deliveryInstructions: ''
  });
  const [order, setOrder] = useState<Order | null>(null);
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize from URL parameters
  useEffect(() => {
    const planId = searchParams.get('plan');
    const durationParam = searchParams.get('duration');
    
    if (planId) {
      const plan = getMenuPlanById(planId);
      if (plan) {
        setSelectedPlan(plan);
        setDuration(durationParam === 'monthly' ? 'monthly' : 'weekly');
      }
    }
  }, [searchParams]);

  // Validation functions
  const validateCustomerInfo = () => {
    const newErrors: Record<string, string> = {};
    
    if (!customerInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(customerInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDeliveryAddress = () => {
    const newErrors: Record<string, string> = {};
    
    if (!deliveryAddress.name.trim()) {
      newErrors.deliveryName = 'Delivery name is required';
    }
    
    if (!deliveryAddress.phone.trim()) {
      newErrors.deliveryPhone = 'Delivery phone is required';
    } else if (!/^[6-9]\d{9}$/.test(deliveryAddress.phone.replace(/\D/g, ''))) {
      newErrors.deliveryPhone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!deliveryAddress.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!deliveryAddress.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(deliveryAddress.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Create order
  const createOrder = () => {
    if (!selectedPlan) return null;

    const pricing = calculatePlanPricing(selectedPlan.id, duration);
    const orderId = PaymentUtils.generateOrderId();
    
    const orderItem: OrderItem = {
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      quantity: 1,
      unitPrice: pricing.unitPrice,
      totalPrice: pricing.totalPrice,
      duration,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + (duration === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000).toISOString()
    };

    const newOrder: Order = {
      id: orderId,
      customerId: customerInfo.email,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      customerName: customerInfo.name,
      deliveryAddress,
      items: [orderItem],
      subtotal: pricing.totalPrice,
      deliveryFee: 0, // Free delivery
      discount: pricing.savings,
      total: pricing.totalPrice,
      status: 'pending' as any,
      paymentStatus: 'pending' as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOrder(newOrder);
    return newOrder;
  };

  // Handle form submission
  const handleOrderSubmit = () => {
    if (!validateCustomerInfo() || !validateDeliveryAddress()) {
      return;
    }

    const newOrder = createOrder();
    if (newOrder) {
      setCurrentStep('payment');
    }
  };

  // Handle payment success
  const handlePaymentSuccess = (response: PaymentResponse) => {
    setPaymentResponse(response);
    setCurrentStep('status');
    
    // Update order with payment information
    if (order) {
      setOrder({
        ...order,
        paymentId: response.paymentId,
        paymentStatus: response.status,
        status: response.status === PaymentStatus.SUCCESS ? 'confirmed' as any : 'pending' as any,
        updatedAt: new Date().toISOString()
      });
    }
  };

  // Handle payment error
  const handlePaymentError = (error: PaymentError) => {
    console.error('Payment error:', error);
    // Handle error display
  };

  // Handle payment cancel
  const handlePaymentCancel = () => {
    setCurrentStep('order');
  };

  // Handle retry payment
  const handleRetryPayment = () => {
    setCurrentStep('payment');
  };

  // Handle go home
  const handleGoHome = () => {
    router.push('/');
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Plan Not Found</h2>
            <p className="text-gray-600 mb-4">The selected meal plan could not be found.</p>
            <Link href="/menu">
              <Button className="w-full">Browse Menu Plans</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pricing = calculatePlanPricing(selectedPlan.id, duration);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/menu" className="flex items-center space-x-2 text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Menu</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-orange-600" />
              <span className="font-semibold">Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6 lg:mb-8">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className={`flex items-center space-x-1 lg:space-x-2 ${currentStep === 'order' ? 'text-orange-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-sm lg:text-base ${currentStep === 'order' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="font-medium text-sm lg:text-base hidden sm:block">Order Details</span>
              </div>
              <div className="w-4 lg:w-8 h-0.5 bg-gray-200"></div>
              <div className={`flex items-center space-x-1 lg:space-x-2 ${currentStep === 'payment' ? 'text-orange-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-sm lg:text-base ${currentStep === 'payment' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="font-medium text-sm lg:text-base hidden sm:block">Payment</span>
              </div>
              <div className="w-4 lg:w-8 h-0.5 bg-gray-200"></div>
              <div className={`flex items-center space-x-1 lg:space-x-2 ${currentStep === 'status' ? 'text-orange-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-sm lg:text-base ${currentStep === 'status' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="font-medium text-sm lg:text-base hidden sm:block">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Order Details Step */}
          {currentStep === 'order' && (
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Order Form */}
              <div className="space-y-6 order-2 lg:order-1">
                {/* Selected Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-orange-600" />
                      Selected Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-bold text-lg text-orange-800">{selectedPlan.name}</h3>
                      <p className="text-orange-700 mb-3">{selectedPlan.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">
                            {duration === 'weekly' ? 'Weekly Plan' : 'Monthly Plan'}
                          </span>
                          <div className="text-2xl font-bold text-orange-600">
                            {PaymentUtils.formatAmount(pricing.totalPrice)}
                          </div>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">
                          {selectedPlan.category === 'special' ? 'Special' : 'Normal'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-orange-600" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Name *
                      </label>
                      <Input
                        type="text"
                        value={deliveryAddress.name}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter delivery name"
                        className={errors.deliveryName ? 'border-red-500' : ''}
                      />
                      {errors.deliveryName && <p className="text-red-500 text-sm mt-1">{errors.deliveryName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Phone *
                      </label>
                      <Input
                        type="tel"
                        value={deliveryAddress.phone}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter delivery phone"
                        className={errors.deliveryPhone ? 'border-red-500' : ''}
                      />
                      {errors.deliveryPhone && <p className="text-red-500 text-sm mt-1">{errors.deliveryPhone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <Textarea
                        value={deliveryAddress.address}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter complete address"
                        className={errors.address ? 'border-red-500' : ''}
                        rows={3}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Landmark
                        </label>
                        <Input
                          type="text"
                          value={deliveryAddress.landmark}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, landmark: e.target.value }))}
                          placeholder="Near landmark"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode *
                        </label>
                        <Input
                          type="text"
                          value={deliveryAddress.pincode}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, pincode: e.target.value }))}
                          placeholder="400614"
                          className={errors.pincode ? 'border-red-500' : ''}
                        />
                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Instructions
                      </label>
                      <Textarea
                        value={deliveryAddress.deliveryInstructions}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, deliveryInstructions: e.target.value }))}
                        placeholder="Any special delivery instructions"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={handleOrderSubmit}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-base lg:text-lg py-3"
                >
                  <CreditCard className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  Proceed to Payment
                </Button>
              </div>

              {/* Order Summary */}
              <div className="order-1 lg:order-2">
                {order && <OrderSummary order={order} showActions={false} />}
              </div>
            </div>
          )}

          {/* Payment Step */}
          {currentStep === 'payment' && order && (
            <PaymentForm
              orderId={order.id}
              amount={order.total}
              customerEmail={order.customerEmail}
              customerPhone={order.customerPhone}
              customerName={order.customerName}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              onPaymentCancel={handlePaymentCancel}
            />
          )}

          {/* Status Step */}
          {currentStep === 'status' && paymentResponse && (
            <PaymentStatusComponent
              paymentId={paymentResponse.paymentId}
              orderId={order?.id || ''}
              onPaymentComplete={handlePaymentSuccess}
              onRetry={handleRetryPayment}
              onGoHome={handleGoHome}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Mail,
  Truck,
  Shield,
  CheckCircle
} from 'lucide-react';
import { Order, OrderItem, DeliveryAddress } from '@/lib/types/payment';
import { PaymentUtils } from '@/lib/services/payment-service';

interface OrderSummaryProps {
  order: Order;
  onEditOrder?: () => void;
  onCancelOrder?: () => void;
  showActions?: boolean;
}

export function OrderSummary({ 
  order, 
  onEditOrder, 
  onCancelOrder, 
  showActions = true 
}: OrderSummaryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <Card className="sticky top-4">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-orange-600" />
              <span className="text-lg sm:text-xl">Order #{order.id}</span>
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(order.status)}>
                {order.status.replace('_', ' ').toUpperCase()}
              </Badge>
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {order.paymentStatus.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Placed on {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{order.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{order.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Delivery Address
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium">{order.deliveryAddress.name}</div>
              <div className="text-gray-600">{order.deliveryAddress.address}</div>
              {order.deliveryAddress.landmark && (
                <div className="text-gray-600">Landmark: {order.deliveryAddress.landmark}</div>
              )}
              <div className="text-gray-600">
                {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
              </div>
              {order.deliveryAddress.deliveryInstructions && (
                <div className="text-sm text-gray-500 mt-2">
                  Instructions: {order.deliveryAddress.deliveryInstructions}
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.planName}</h4>
                      <p className="text-sm text-gray-600">
                        {item.duration === 'weekly' ? 'Weekly Plan' : 'Monthly Plan'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {PaymentUtils.formatAmount(item.totalPrice)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.quantity} × {PaymentUtils.formatAmount(item.unitPrice)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div>Duration: {formatDate(item.startDate)} to {formatDate(item.endDate)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Notes */}
          {order.notes && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Special Instructions</h3>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">{order.notes}</p>
              </div>
            </div>
          )}

          {/* Pricing Breakdown */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Pricing Breakdown</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{PaymentUtils.formatAmount(order.subtotal)}</span>
              </div>
              {order.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{PaymentUtils.formatAmount(order.deliveryFee)}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{PaymentUtils.formatAmount(order.discount)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-orange-600">{PaymentUtils.formatAmount(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Delivery Information</span>
            </div>
            <div className="text-sm text-blue-700 space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Delivery Time: 11:00 AM - 1:30 PM or 7:00 PM - 9:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Free delivery within CBD Belapur area</span>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Secure Order</span>
            </div>
            <div className="text-sm text-green-700 space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Payment secured with 256-bit SSL encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Order confirmation sent to your email</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="flex flex-col sm:flex-row gap-3">
              {onEditOrder && (
                <Button
                  onClick={onEditOrder}
                  variant="outline"
                  className="flex-1"
                >
                  Edit Order
                </Button>
              )}
              {onCancelOrder && order.status === 'pending' && (
                <Button
                  onClick={onCancelOrder}
                  variant="destructive"
                  className="flex-1"
                >
                  Cancel Order
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

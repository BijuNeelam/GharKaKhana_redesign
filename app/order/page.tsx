"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Clock, 
  MapPin, 
  Heart, 
  Shield, 
  Truck, 
  CheckCircle, 
  Star, 
  Menu, 
  X,
  ArrowRight,
  Phone,
  CreditCard
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MENU_PLANS, getMenuPlansByType, getPopularMenuPlans } from '@/lib/data/menu-plans';
import { PaymentUtils } from '@/lib/services/payment-service';

export default function OrderPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'veg' | 'non-veg' | 'combo'>('all');

  const getFilteredPlans = () => {
    switch (selectedCategory) {
      case 'veg':
        return getMenuPlansByType('veg');
      case 'non-veg':
        return getMenuPlansByType('non-veg');
      case 'combo':
        return getMenuPlansByType('combo');
      default:
        return MENU_PLANS;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'veg':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'non-veg':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'combo':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'veg':
        return '🥗';
      case 'non-veg':
        return '🍗';
      case 'combo':
        return '🍽️';
      default:
        return '🍽️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
                <Image src="/images/logo.png" alt="Ghar-Ka-Khana Logo" width={200} height={60} className="h-12 w-auto" />
              </Link>
              <div className="hidden lg:block">
                <div className="text-lg font-bold text-gray-900">Cloud Kitchen</div>
                <div className="text-sm text-gray-600">Free Homely Food Delivery at your Home & Office</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Menu
              </Link>
              <Link href="/order" className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-1">
                Order Now
              </Link>
              <Link href="/before-ordering" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Before Ordering
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Contact Us
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-orange-100 bg-white">
              <nav className="px-4 py-4 space-y-3">
                <Link 
                  href="/" 
                  className="block py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/menu" 
                  className="block py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link 
                  href="/order" 
                  className="block py-3 px-4 text-orange-600 font-semibold border-l-4 border-orange-600 bg-orange-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Order Now
                </Link>
                <Link 
                  href="/before-ordering" 
                  className="block py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Before Ordering
                </Link>
                <Link 
                  href="/about" 
                  className="block py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="block py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 lg:py-12 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Order Your <span className="text-yellow-300">Homely Meals</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Fresh, authentic, and delicious meals delivered to your doorstep daily
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#menu-plans">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Browse Plans
                </Button>
              </Link>
              <a href="tel:+918108325444">
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full text-lg font-semibold">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Order Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Quick Order</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our popular meal plans and place your order in just a few clicks
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Plans
            </button>
            <button
              onClick={() => setSelectedCategory('veg')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'veg'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🥗 Vegetarian
            </button>
            <button
              onClick={() => setSelectedCategory('non-veg')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'non-veg'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🍗 Non-Vegetarian
            </button>
            <button
              onClick={() => setSelectedCategory('combo')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'combo'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🍽️ Combo Plans
            </button>
          </div>

          {/* Menu Plans Grid */}
          <div id="menu-plans" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {getFilteredPlans().map((plan) => (
              <Card key={plan.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-orange-200">
                <div className={`absolute top-0 left-0 w-full h-1 ${
                  plan.type === 'veg' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  plan.type === 'non-veg' ? 'bg-gradient-to-r from-red-400 to-red-600' :
                  'bg-gradient-to-r from-purple-400 to-purple-600'
                }`}></div>
                
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <span className="text-3xl">{getCategoryIcon(plan.type)}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Badge className={getCategoryColor(plan.type)}>
                        {plan.category === 'special' ? 'Special' : 'Normal'}
                      </Badge>
                      {plan.isPopular && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3 flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Per Meal</div>
                        <div className="text-2xl font-bold text-orange-600">
                          {PaymentUtils.formatAmount(plan.pricePerMeal)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <div className="text-xs text-gray-600 mb-1">Weekly</div>
                        <div className="text-lg font-bold text-orange-700">
                          {PaymentUtils.formatAmount(plan.weeklyPrice)}
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="text-xs text-gray-600 mb-1">Monthly</div>
                        <div className="text-lg font-bold text-green-700">
                          {PaymentUtils.formatAmount(plan.monthlyPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/checkout?plan=${plan.id}&duration=weekly`} className="flex-1">
                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm py-2">
                          <CreditCard className="h-4 w-4 mr-1" />
                          Order Weekly
                        </Button>
                      </Link>
                      <Link href={`/checkout?plan=${plan.id}&duration=monthly`} className="flex-1">
                        <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 text-sm py-2">
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Order Monthly
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Ghar Ka Khana?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to bringing you the authentic taste of home with every meal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Free Home Delivery</h3>
                <p className="text-gray-600">
                  Free delivery within CBD Belapur and surrounding areas. Fresh meals delivered to your doorstep.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quality You Can Trust</h3>
                <p className="text-gray-600">
                  Fresh ingredients, never reused. Consistent taste and health in every meal with authentic recipes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Payment</h3>
                <p className="text-gray-600">
                  Safe and secure payment processing with multiple payment options. Your data is always protected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Getting your homely meals is as easy as 1-2-3</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Plan</h3>
              <p className="text-gray-600">
                Select from our variety of meal plans that suit your preferences and dietary requirements
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Place Your Order</h3>
              <p className="text-gray-600">
                Fill in your details, choose payment method, and place your order with secure payment processing
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enjoy Your Meal</h3>
              <p className="text-gray-600">
                We deliver fresh, hot meals to your doorstep during our delivery windows
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who enjoy our authentic homely meals every day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#menu-plans">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Start Ordering
                </Button>
              </Link>
              <a href="tel:+918108325444">
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full text-lg font-semibold">
                  <Phone className="h-5 w-5 mr-2" />
                  Call +91 81083 25444
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Image
                src="/images/logo.png"
                alt="Ghar-Ka-Khana Logo"
                width={200}
                height={60}
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-300 mb-6 max-w-md">
                Delicious home-cooked meals delivered to your doorstep daily. Taste the love in every bite.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-400" />
                  <span className="text-lg font-semibold">+91 81083 25444</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  <span>Shop No. 1, Fanaspada Village, Sector 19, CBD Belapur, Navi Mumbai 400614</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="text-gray-300 hover:text-orange-400 transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/order" className="text-gray-300 hover:text-orange-400 transition-colors">
                    Order Now
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-orange-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span className="font-semibold">Monday to Saturday</span>
                </div>
                <div className="text-sm">
                  <div>Day Delivery: 11:00 AM - 1:30 PM</div>
                  <div>Night Delivery: 7:00 PM - 9:30 PM</div>
                </div>
                <div className="text-sm text-gray-400 mt-2">No service on Sundays and public holidays</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2025 Neelam Ghar Ka Khana. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="/order">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold">
                    Order Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

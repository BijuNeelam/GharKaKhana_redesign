"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Clock, MapPin, Heart, Shield, Truck, CheckCircle, Star, ArrowLeft, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function MenuPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
              <Link href="/menu" className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-1">
                Menu
              </Link>
              <Link href="/order" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
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
                  className="block py-3 px-4 text-orange-600 font-semibold border-l-4 border-orange-600 bg-orange-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link 
                  href="/order" 
                  className="block py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
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

      {/* Back to Home Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Menu Hero Section */}
      <section className="py-4 lg:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">Our Complete Menu</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our variety of meal plans designed to suit different preferences and budgets
            </p>
          </div>
        </div>
      </section>

      {/* Meal Plans Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Veg Normal Plan */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <span className="text-2xl">🥗</span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Veg Normal</h3>
                  <div className="text-3xl font-black text-green-600">₹79</div>
                  <div className="text-sm text-gray-500">per meal</div>
                </div>
                
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Chapathis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Rice</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Bhaji</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Dal/Kadi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Salad</span>
                  </div>
                </div>

                <div className="space-y-3 mt-auto pt-6">
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Weekly</div>
                      <div className="text-lg font-bold text-green-700">₹474</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Monthly</div>
                      <div className="text-lg font-bold text-green-800">
                        <span className="line-through text-gray-500">₹1975</span> ₹1925
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/checkout?plan=veg-normal&duration=weekly" className="flex-1">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2">
                        Order Weekly
                      </Button>
                    </Link>
                    <Link href="/checkout?plan=veg-normal&duration=monthly" className="flex-1">
                      <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 text-sm py-2">
                        Order Monthly
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Veg Special Plan */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Veg Special</h3>
                  <div className="text-3xl font-black text-green-600">₹89</div>
                  <div className="text-sm text-gray-500">per meal</div>
                </div>
                
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Chapathis (May be combined)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Rice</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Bhaji</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Dal/Kadi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Dessert-Sweets/Double-Salad/Papad-Or-Pickle</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-semibold text-green-600">Compliment</span>
                  </div>
                </div>

                <div className="space-y-3 mt-auto pt-6">
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Weekly</div>
                      <div className="text-lg font-bold text-green-700">₹534</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Monthly</div>
                      <div className="text-lg font-bold text-green-800">
                        <span className="line-through text-gray-500">₹2225</span> ₹2175
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/checkout?plan=veg-special&duration=weekly" className="flex-1">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2">
                        Order Weekly
                      </Button>
                    </Link>
                    <Link href="/checkout?plan=veg-special&duration=monthly" className="flex-1">
                      <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 text-sm py-2">
                        Order Monthly
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Combo Normal NV + Veg Plan */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-red-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
              <div className="p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <span className="text-2xl">🍗</span>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Combo Normal</h3>
                  <div className="text-3xl font-black">
                    <span className="text-red-600">NV</span>
                    <span className="text-gray-600"> + </span>
                    <span className="text-green-600">Veg</span>
                  </div>
                </div>
                
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Chapathi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Rice</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-semibold">Wednesday & Friday - Chicken Masala Curry</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-semibold">Remaining Days - Veg Curry</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Salad</span>
                  </div>
                </div>

                <div className="space-y-3 mt-auto pt-6">
                  <div className="bg-red-50 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Weekly</div>
                      <div className="text-lg font-bold text-red-700">₹505</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-100 to-red-200 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Monthly</div>
                      <div className="text-lg font-bold text-red-800">
                        <span className="line-through text-gray-500">₹2223</span> ₹2165
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/checkout?plan=combo-normal&duration=weekly" className="flex-1">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2">
                        Order Weekly
                      </Button>
                    </Link>
                    <Link href="/checkout?plan=combo-normal&duration=monthly" className="flex-1">
                      <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 text-sm py-2">
                        Order Monthly
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Combo Special NV + Veg Plan */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-red-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
              <div className="p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <span className="text-2xl">👑</span>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Combo Special</h3>
                  <div className="text-3xl font-black">
                    <span className="text-red-600">NV</span>
                    <span className="text-gray-600"> + </span>
                    <span className="text-green-600">Veg</span>
                  </div>
                </div>
                
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Chapathi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Rice</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-semibold">Wednesday & Friday - Chicken Masala Curry</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-semibold">Remaining Days - Veg Curry</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Dessert-Sweets/Double-Salad/Papad-Or-Pickle</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 font-semibold text-red-600">Compliment</span>
                  </div>
                </div>

                <div className="space-y-3 mt-auto pt-6">
                  <div className="bg-red-50 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Weekly</div>
                      <div className="text-lg font-bold text-red-700">₹565</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-100 to-red-200 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Monthly</div>
                      <div className="text-lg font-bold text-red-800">
                        <span className="line-through text-gray-500">₹2475</span> ₹2415
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/checkout?plan=combo-special&duration=weekly" className="flex-1">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2">
                        Order Weekly
                      </Button>
                    </Link>
                    <Link href="/checkout?plan=combo-special&duration=monthly" className="flex-1">
                      <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 text-sm py-2">
                        Order Monthly
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Non-Veg (Chicken) Normal Plan */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-red-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
              <div className="p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <span className="text-2xl">🍗</span>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Non-Veg</h3>
                  <div className="text-3xl font-black text-red-600 mb-2">(Chicken)</div>
                  <div className="text-xl font-semibold text-gray-600">Normal</div>
                </div>
                
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Chapathi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Rice</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Chicken Curry</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Salad</span>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <div className="bg-gradient-to-r from-red-100 to-red-200 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Price</div>
                      <div className="text-lg font-bold text-red-800">₹110</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link href="/checkout?plan=non-veg-normal&duration=weekly">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2">
                        Order Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Non-Veg (Chicken) Special Plan */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-red-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
              <div className="p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <span className="text-2xl">👑</span>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Non-Veg</h3>
                  <div className="text-3xl font-black text-red-600 mb-2">(Chicken)</div>
                  <div className="text-xl font-semibold text-gray-600">Special</div>
                </div>
                
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Chapathi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Rice</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Chicken Curry</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Dessert-Sweets/Double-Salad/Papad-Or-Pickle</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 font-semibold text-red-600">Compliment</span>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <div className="bg-gradient-to-r from-red-100 to-red-200 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Price</div>
                      <div className="text-lg font-bold text-red-800">₹120</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link href="/checkout?plan=non-veg-special&duration=weekly">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2">
                        Order Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Important Notes */}
          <div className="mt-12 bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Important Notes</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">1</div>
                  <p className="text-gray-700 text-lg">Special Meal will have Dessert-Sweets/Double-Salad/Papad-Or-Pickle</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">2</div>
                  <p className="text-gray-700 text-lg">Veg Meal will have Chapati, Rice, Bhaji, Daal Or Kadi & Salad</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">3</div>
                  <p className="text-gray-700 text-lg">No Service on Sundays and Public Holidays</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">4</div>
                  <p className="text-gray-700 text-lg">Week is of 6 days & Month is of 25 days</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">5</div>
                  <p className="text-gray-700 text-lg">Combo Pack have 2 days (Wednesday & Friday) Chicken & remaining 4 days Veg</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">6</div>
                  <p className="text-gray-700 text-lg">Rs. 9 would be charged additional for 1-Single Delivery</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">7</div>
                                     <p className="text-gray-700 text-lg">Do look into "Before Ordering" Section of our Website <a href="https://gharkakhana.life/before-ordering" className="text-orange-600 hover:text-orange-700 underline" target="_blank" rel="noopener noreferrer">gharkakhana.life/before-ordering</a> for Terms</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

            {/* Want to Order Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ready to Order?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Choose your meal plan and place your order online with secure payment. Enjoy authentic home-style meals delivered fresh to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/checkout?plan=veg-special&duration=weekly">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                  🛒 Order Online Now
                </Button>
              </Link>
              <a href="tel:+918108325444">
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold">
                  📞 +91 8108 325 444
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Image
                src="/images/logo.png"
                alt="Ghar-Ka-Khana Logo"
                width={200}
                height={60}
                className="h-16 w-auto mb-4"
              />
              <p className="text-gray-300 mb-6 max-w-md">
                Delicious home-cooked meals delivered to your doorstep daily. Taste the love in every bite.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-400" />
                  <span className="text-lg font-semibold">+91 8108 325 444</span>
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
                  <Link href="/before-ordering" className="text-gray-300 hover:text-orange-400 transition-colors">
                    Before Ordering
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
                <Link href="/menu">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold">
                    View Full Menu
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

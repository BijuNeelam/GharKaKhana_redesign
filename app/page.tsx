"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Clock, MapPin, Heart, Shield, Truck, CheckCircle, Star, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
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
              <a 
                href="tel:+918108325444" 
                className="flex items-center space-x-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors cursor-pointer bg-orange-50 hover:bg-orange-100 px-3 py-2 rounded-lg text-sm select-none"
                style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
              >
                <span className="text-lg">📞</span>
                <span>Call</span>
              </a>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-1">
                Home
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
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
                  className="block py-3 px-4 text-orange-600 font-semibold border-l-4 border-orange-600 bg-orange-50 rounded-lg"
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

      {/* Hero Section */}
      <section className="relative py-8 lg:py-16 overflow-hidden">
        {/* Background Food Video */}
        <div className="absolute inset-0 z-0">
          <video 
            src="/images/video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="object-cover opacity-20 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Introductory Offer - Most Prominent */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-2xl shadow-2xl">
                <div className="flex items-center justify-between">
                  {/* Left Side - Text Content */}
                  <div className="flex-1 text-center">
                    <div className="text-sm font-semibold mb-2 opacity-90">🌟 TASTE OF HOME</div>
                    <div className="text-3xl lg:text-4xl font-bold mb-2">Your First Meal for just</div>
                    <div className="text-5xl lg:text-6xl font-black text-yellow-300 mb-2">₹79!</div>
                    <div className="text-sm opacity-90">Grab this offer as soon as possible</div>
                  </div>
                  
                  {/* Right Side - QR Code */}
                  <div className="flex-shrink-0 ml-6">
                    <Image 
                      src="/qr.jpeg" 
                      alt="QR Code for Ghar Ka Khana" 
                      width={120} 
                      height={120} 
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Free Delivery Highlight */}
              <div className="bg-gray-800 border-2 border-gray-600 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-300 text-black p-2 rounded-full">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-300">FREE Home Delivery*</div>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Guaranteed Taste, Quality, Authentic & <span className="text-orange-600">Hygienic Homely Meals</span>
                </h1>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/menu">
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
                  >
                    View Full Menu
                  </Button>
                </Link>
                <a 
                  href="tel:+918108325444"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold border-2 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group phone-buzz"
                >
                  <span className="inline-block">📞</span>
                  <span className="ml-2">+91 81083 25444</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-medium">4.8/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium">100% Hygienic</span>
                </div>
              </div>
            </div>

            {/* Right Visual Content */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Main Food Video */}
              <div className="relative max-w-lg lg:max-w-xl lg:mr-16">
                <video
                  src="/images/video.mp4"
                  alt="Delicious authentic Indian thali"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative rounded-3xl object-cover w-full h-[528px] lg:h-[624px]"
                />
              </div>

              {/* Delivery Service Overlay */}


              {/* Floating Quality Badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12">
                  Fresh Daily!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Neelam's Ghar-Ka-Khana?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to bringing you the authentic taste of home with every meal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Free Home Delivery*</h3>
                <p className="text-gray-600 leading-relaxed">
                  Free delivery within CBD Belapur (Sectors 11-15, 19-23, 29-31) and other areas in Mumbai
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quality You Can Trust</h3>
                <p className="text-gray-600 mb-4 text-center">Fresh ingredients, never reused. Consistent taste and health in every meal.</p>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Basmathi Rice – We use only Basmathi rice in meals.</span>
                  </li>

                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sanitized Cooking Practices</h3>
                <p className="text-gray-600 leading-relaxed">
                  We follow strict daily hygiene protocols to ensure every meal is prepared in a clean, safe environment
                </p>
              </CardContent>
            </Card>
          </div>

          
        </div>
      </section>



      {/* Location Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Visit our cloud kitchen or get directions to Ghar Ka Khana</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.1234567890123!2d73.0352808!3d19.016488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3a7b054efb7%3A0xba276bc16e91f56!2sGhar%20Ka%20Khana!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ghar Ka Khana Location"
                className="w-full h-[450px]"
              ></iframe>
            </div>
            

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Getting your homely meals is as easy as 1-2-3</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Plan</h3>
              <p className="text-gray-600 leading-relaxed">
                Select from our weekly or monthly subscription plans that suit your needs and preferences
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order in Advance</h3>
              <p className="text-gray-600 leading-relaxed">
                Place your order 24 hours ahead. Payment is 100% in advance for your convenience
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enjoy Your Meal</h3>
              <p className="text-gray-600 leading-relaxed">
                We deliver fresh, hot meals to your doorstep (up to 1st floor) during our delivery windows
              </p>
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

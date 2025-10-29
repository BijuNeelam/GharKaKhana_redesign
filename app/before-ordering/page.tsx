"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Phone, Clock, MapPin, Menu, X } from "lucide-react"
import { useState } from "react"

export default function BeforeOrderingPage() {
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
              <Link href="/menu" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Menu
              </Link>
              <Link href="/order" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Order Now
              </Link>
              <Link href="/before-ordering" className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-1">
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
                  className="block py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Order Now
                </Link>
                <Link 
                  href="/before-ordering" 
                  className="block py-3 px-4 text-orange-600 font-semibold border-l-4 border-orange-600 bg-orange-50 rounded-lg"
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

      {/* Main Content */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Terms and Conditions</h1>
              <p className="text-lg text-gray-700">Please read these important policies carefully before using our services.</p>
            </div>
            
            {/* Main White Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Advance Booking Required:</span> All orders must be placed at least 24 hours in advance to ensure timely preparation and delivery.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Full Payment in Advance:</span> Full payment must be made 100% in advance at the time of booking.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Delivery Limitations:</span> Tiffin delivery will be provided only up to the 1st floor of any building. Customers on higher floors are requested to coordinate accordingly.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Tiffin Box Return Policy:</span> Customers are required to return the previous day's empty tiffin box at the time of receiving the new one.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Service Days:</span> 25 Days is for a Month Package & 6 Days for a Week Package; This excludes Sundays and Public Holidays.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Holiday Schedule:</span> Refer to the Holidays list in 'About' section on our website for the full list of non-service days.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Delivery Timings:</span> Lunch: 11:00 AM – 1:30 PM & Dinner: 7:00 PM - 9:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Service Interruption Policy:</span> In case if company is unable to deliver on a scheduled day, the same will be intimated in advance & will compensate the meal by extending the service period accordingly.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Package Options:</span> Tiffin packages are available on a Weekly, Monthly Subscription & Walk-In Take-Away (From Cloud Kitchen Location) basis.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Rajma-Rice Special Note:</span> Considering Rajma-Rice being very Famous Indian Dish Combination, 'When there is a Rajma; Chapathi would be reduced to two and Rice & Rajma Quantity will be more.'</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Cancellation Policy:</span> If package is cancelled in between, so far delivered Tiffin prize would be calculated as per Per Day Prize and remaining amount be refunded.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Advance Meal Cancellation:</span> Please inform atleast 1 day in advance if you do not need Meal by next day; otherwise Meal would be calculated for the day.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-3"></div>
                  <div>
                    <p className="text-gray-700 text-lg"><span className="font-bold">Single Delivery Charge:</span> ₹9/- would be additional charge if 1-Single Delivery Ordered</p>
                  </div>
                </div>
              </div>

              {/* Important Notice Section */}
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">i</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-800 mb-2">Important Notice</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      By placing an order, you acknowledge that you have read, understood, and agree to comply with all the terms and conditions stated above. These terms are subject to change, and the most current version will always be available on this page.
                    </p>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-center text-sm text-gray-500 mt-8">
                Last Updated: August 29, 2025
              </div>
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

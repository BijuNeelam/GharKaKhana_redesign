"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Clock, MapPin, Mail, Send, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
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
              <Link href="/before-ordering" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Before Ordering
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-1">
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
                  className="block py-3 px-4 text-orange-600 font-semibold border-l-4 border-orange-600 bg-orange-50 rounded-lg"
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
          <span>← Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-4 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Details Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Get In Touch Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Have questions about our subscription plans, special dietary requirements, or anything else? Fill out the form and we'll get back to you as soon as possible.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">
                        Shop No. 1, Fanaspada Village, Sector 19, CBD Belapur, Navi Mumbai 400614
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">+91 81083 25444</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday to Saturday</p>
                        <p>Day Delivery: 11:00 AM - 1:30 PM</p>
                        <p>Night Delivery: 7:00 PM - 9:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                    <form className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          className="w-full"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="What is this about?"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          className="w-full min-h-[120px]"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Areas Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Delivery Areas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We currently serve the following areas in Mumbai. If your area is not listed, contact us to check if we can accommodate your location.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Andheri East",
                "Andheri West", 
                "Bandra East",
                "Bandra West",
                "Juhu",
                "Santacruz",
                "Vile Parle",
                "Powai"
              ].map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow border border-orange-100"
                >
                  <span className="text-gray-700 font-medium">{area}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Don't see your area? Contact us to check availability!
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Call +91 81083 25444
              </Button>
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
                  <Button className="bg-orange-700 hover:bg-orange-800 text-white px-6 py-2 rounded-full font-semibold">
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

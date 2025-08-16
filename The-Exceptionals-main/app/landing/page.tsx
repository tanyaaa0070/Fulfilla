"use client"

import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Package, Users, Shield, ArrowRight, Star, Zap, Globe } from "lucide-react"

export default function LandingPage() {
  const products = [
    {
      name: "Fresh Carrot",
      details: "Cold Stored, High Quality",
      price: "₹2.9",
      image: "/placeholder.svg?height=160&width=250",
    },
    {
      name: "Fresh Cabbage",
      details: "Room Stored, High Quality",
      price: "₹1.9",
      image: "/placeholder.svg?height=160&width=250",
    },
    {
      name: "Mustard Greens",
      details: "Green Stored, High Quality",
      price: "₹1.9",
      image: "/placeholder.svg?height=160&width=250",
    },
    {
      name: "Radish",
      details: "Purple Stored, High Quality",
      price: "₹2.5",
      image: "/placeholder.svg?height=160&width=250",
    },
  ]

  const portals = [
    {
      title: "Vendor Portal",
      description: "For buyers who want to source quality ingredients",
      features: ["Register your business", "Order raw materials", "Manage deliveries", "Track orders in real-time"],
      href: "/vendor",
      icon: <Package className="h-8 w-8" />,
      color: "bg-green-500",
    },
    {
      title: "Supplier Portal",
      description: "For farmers and producers to sell their goods",
      features: ["List your products", "Manage inventory", "Respond to buyer chats", "Track sales analytics"],
      href: "/supplier",
      icon: <Users className="h-8 w-8" />,
      color: "bg-orange-500",
    },
    {
      title: "Admin Portal",
      description: "For platform management and oversight",
      features: ["Approve vendor applications", "Track platform activity", "Handle disputes", "Generate reports"],
      href: "/admin",
      icon: <Shield className="h-8 w-8" />,
      color: "bg-blue-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center text-white">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-orange-500 text-white p-3 rounded-xl">
                <Package className="h-8 w-8" />
              </div>
              <h1 className="text-5xl font-bold">Fulfilla</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">Buy Smarter. Sell Faster. Manage Better.</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Empowering Indian street food vendors with AI-powered supply chain solutions, multilingual voice ordering,
              and hyperlocal marketplace connections.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                AI Powered
              </Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                11 Languages
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Smart Recommendations
              </Badge>
            </div>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
              Explore the Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Now</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div className="h-40 bg-gray-200 rounded-t-lg overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.details}</p>
                        <p className="text-lg font-bold text-green-600">{product.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Portals</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {portals.map((portal, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-orange-500"
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className={`${portal.color} text-white p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {portal.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{portal.title}</h3>
                      <p className="text-gray-600 mb-6">{portal.description}</p>

                      <ul className="text-left space-y-2 mb-8">
                        {portal.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => (window.location.href = portal.href)}
                      >
                        {portal.title.split(" ")[0]} Login
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6">Empowering Local Markets, One Tap at a Time</h2>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-orange-500 hover:bg-gray-100 border-white px-8 py-3"
              >
                Explore the Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Fulfilla Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

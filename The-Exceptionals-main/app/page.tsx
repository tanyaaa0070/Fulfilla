"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { MapPin, TrendingUp, Sparkles, DollarSign, Zap, ArrowRight } from "lucide-react"
import WeatherWidget from "./components/WeatherWidget"
import SupplierList from "./components/SupplierList"
import OrderForm from "./components/OrderForm"
import VendorExchange from "./components/VendorExchange"
import DemandPrediction from "./components/DemandPrediction"
import SmartRecommendations from "./components/SmartRecommendations"
import PriceComparison from "./components/PriceComparison"
import Image from "next/image"
import { Button } from "../components/ui/button"

export default function Home() {
  const [location, setLocation] = useState({ lat: 28.61, lon: 77.21, city: "Delhi" })
  const [voiceInput, setVoiceInput] = useState("")
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    // Fetch weather data for recommendations
    fetchWeather()
  }, [location])

  const fetchWeather = async () => {
    try {
      const response = await fetch(`/api/weather?lat=${location.lat}&lon=${location.lon}`)
      const data = await response.json()
      setWeather(data)
    } catch (error) {
      console.error("Error fetching weather:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Hero Banner with Background Image */}
      <div
        className="relative h-64 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 to-red-600/80"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative w-16 h-16 bg-white/20 rounded-full p-2">
                <Image src="/logo.png" alt="Fulfilla Logo" fill className="object-contain" />
              </div>
              <h1 className="text-5xl font-bold">Fulfilla</h1>
            </div>
            <p className="text-2xl mb-4">Smart Sourcing for Street Sellers</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Powered
              </Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                11 Languages
              </Badge>
              <Badge className="bg-white/20 text-white border-white px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                {location.city}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-orange-600"
                onClick={() => (window.location.href = "/landing")}
              >
                🏠 Home
              </Button>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-orange-600"
                onClick={() => (window.location.href = "/vendor")}
              >
                🛒 Vendor Portal
              </Button>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-orange-600"
                onClick={() => (window.location.href = "/supplier")}
              >
                🌾 Supplier Portal
              </Button>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content with Background Pattern */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        style={{
          backgroundImage: "url('/placeholder.svg?height=100&width=100&opacity=0.1')",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Weather, Demand & Recommendations */}
          <div className="space-y-6">
            <WeatherWidget location={location} />
            <DemandPrediction location={location} />
            <SmartRecommendations weather={weather} location={location} budget={5000} />
          </div>

          {/* Middle Column - Main Features */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="suppliers" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg rounded-lg h-12">
                <TabsTrigger
                  value="suppliers"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white font-medium"
                >
                  🏪 Suppliers
                </TabsTrigger>
                <TabsTrigger
                  value="order"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white font-medium"
                >
                  <div className="flex items-center space-x-1">
                    <span>🎤 Voice Order</span>
                    <Sparkles className="h-3 w-3" />
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="exchange"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white font-medium"
                >
                  🔄 Exchange
                </TabsTrigger>
                <TabsTrigger
                  value="prices"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white font-medium"
                >
                  <div className="flex items-center space-x-1">
                    <span>💰 Prices</span>
                    <DollarSign className="h-3 w-3" />
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white font-medium"
                >
                  📊 Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="suppliers" className="mt-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                  <SupplierList location={location} />
                </div>
              </TabsContent>

              <TabsContent value="order" className="mt-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                  <OrderForm voiceInput={voiceInput} />
                </div>
              </TabsContent>

              <TabsContent value="exchange" className="mt-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                  <VendorExchange />
                </div>
              </TabsContent>

              <TabsContent value="prices" className="mt-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                  <PriceComparison />
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6" />
                      <span>📊 Business Analytics</span>
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      Track your performance and optimize operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-bold mb-2">₹12,450</div>
                        <div className="text-sm opacity-90">💰 Monthly Savings</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-bold mb-2">85%</div>
                        <div className="text-sm opacity-90">✅ Order Accuracy</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-bold mb-2">23</div>
                        <div className="text-sm opacity-90">👥 Group Orders</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-bold mb-2">4.8★</div>
                        <div className="text-sm opacity-90">⭐ Supplier Rating</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer with Gradient */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative w-12 h-12 bg-white/20 rounded-full p-2">
              <Image src="/logo.png" alt="Fulfilla Logo" fill className="object-contain" />
            </div>
            <span className="text-2xl font-bold">Fulfilla</span>
          </div>
          <p className="text-lg mb-4">🌟 Smart Sourcing for Street Sellers</p>
          <p className="text-gray-300">
            &copy; 2025 Fulfilla - Empowering Local Markets, One Tap at a Time. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

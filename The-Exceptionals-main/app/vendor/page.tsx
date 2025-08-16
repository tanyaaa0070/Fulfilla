"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Bot, Shuffle, Cloud, Users, Mic, Search, AlertTriangle, Info, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function VendorPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [bargainResult, setBargainResult] = useState("")
  const [weatherPrediction, setWeatherPrediction] = useState("Loading weather and demand predictions...")
  const [recentOrders, setRecentOrders] = useState([])
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    loadWeatherPrediction()
    loadRecentOrders()
  }, [])

  const loadWeatherPrediction = () => {
    const predictions = [
      "Sunny weather expected - stock up on salads and fresh juices",
      "Rain forecast - demand for soups and hot meals will increase",
      "Heat wave coming - ice cream and cold drinks will be in high demand",
      "Festival season approaching - expect higher demand for specialty ingredients",
    ]

    setTimeout(() => {
      const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)]
      setWeatherPrediction(`${randomPrediction}\nRecommended stock: Increase by 15-20%`)
    }, 1000)
  }

  const loadRecentOrders = () => {
    const orders = [
      {
        id: 1001,
        date: "2023-06-15",
        items: ["Organic Carrots (10kg)", "Fresh Cabbage (5kg)"],
        total: 42.5,
        status: "Delivered",
      },
      {
        id: 1002,
        date: "2023-06-10",
        items: ["Mustard Greens (8kg)", "Red Radish (5kg)"],
        total: 30.7,
        status: "Delivered",
      },
      { id: 1003, date: "2023-06-05", items: ["Organic Tomatoes (15kg)"], total: 48.0, status: "In Transit" },
    ]
    setRecentOrders(orders)
  }

  const startBargain = () => {
    setBargainResult("Negotiating with suppliers...")
    setTimeout(() => {
      const savings = (Math.random() * 15 + 5).toFixed(2)
      setBargainResult(`Success! The Bargain Bot saved you ₹${savings} on your next order.`)
    }, 2000)
  }

  const startVoiceOrder = () => {
    setIsListening(true)
    setTimeout(() => {
      setIsListening(false)
      alert("Voice order processed: 2kg tomatoes, 1kg onions added to cart!")
    }, 3000)
  }

  const viewSwapOptions = () => {
    alert(
      "Found 3 nearby vendors willing to swap: \n• Vendor A: 5kg carrots for 3kg cabbage\n• Vendor B: 2kg spinach for 1kg tomatoes\n• Vendor C: 10kg potatoes for 8kg onions",
    )
  }

  const joinGroupBuy = () => {
    alert("Joined group buy! 12 vendors participating. 15% discount unlocked on bulk orders.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Hero Header with Background */}
      <div
        className="relative h-56 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/85 to-blue-600/85"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 bg-white/20 rounded-full p-3">
                  <Image src="/logo.png" alt="Fulfilla Logo" fill className="object-contain" />
                </div>
                <div className="text-white">
                  <h1 className="text-4xl font-bold">🛒 Vendor Portal</h1>
                  <p className="text-xl opacity-90">Smart sourcing for street sellers</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-white/20 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3"
                onClick={() => (window.location.href = "/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 bg-white shadow-lg rounded-lg h-14">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-medium"
            >
              📊 Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="registration"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-medium"
            >
              📝 Registration
            </TabsTrigger>
            <TabsTrigger
              value="catalog"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-medium"
            >
              📚 Catalog
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-medium"
            >
              📦 Orders
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-medium"
            >
              💬 Chat
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-medium"
            >
              📈 Reports
            </TabsTrigger>
            <TabsTrigger
              value="subsidies"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-medium"
            >
              💰 Subsidies
            </TabsTrigger>
            <TabsTrigger
              value="safety"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-medium"
            >
              🛡️ Safety Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Smart Bargain Bot */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="h-6 w-6" />
                    <span>🤖 Smart Bargain Bot</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Let our AI negotiate the best prices with suppliers automatically
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Button
                    onClick={startBargain}
                    className="mb-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3"
                  >
                    🤖 Activate Bargain Bot
                  </Button>
                  {bargainResult && (
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">✅ {bargainResult}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Magic Pantry */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Shuffle className="h-6 w-6" />
                    <span>🔄 Magic Pantry (Swap System)</span>
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Trade extra stock with nearby vendors through our barter system
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Button
                    onClick={viewSwapOptions}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-6 py-3"
                  >
                    🔄 View Swap Options
                  </Button>
                </CardContent>
              </Card>

              {/* Weather & Demand Predictor */}
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Cloud className="h-6 w-6" />
                    <span>🌤️ Weather & Demand Predictor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="p-4 bg-white border-l-4 border-orange-400 rounded-lg shadow-inner">
                    <p className="text-sm text-orange-800 whitespace-pre-line font-medium">📊 {weatherPrediction}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Virtual Group Buying */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-6 w-6" />
                    <span>👥 Virtual Group Buying</span>
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Join forces with other vendors to get bulk discounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Button
                    onClick={joinGroupBuy}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3"
                  >
                    👥 Join Group Buy
                  </Button>
                </CardContent>
              </Card>

              {/* AI Ration Card */}
              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-6 w-6" />
                    <span>💳 AI Ration Card (Smart Subsidy Alert)</span>
                  </CardTitle>
                  <CardDescription className="text-indigo-100">
                    You may be eligible for 2 government subsidies based on your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Button
                    onClick={() => setActiveTab("subsidies")}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 px-6 py-3"
                  >
                    💰 View Subsidies
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Alert */}
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6" />
                    <span>🚨 Crowdsourced Safety Alert</span>
                  </CardTitle>
                  <CardDescription className="text-red-100">
                    1 new report in your area about hafta collection
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Button
                    onClick={() => setActiveTab("safety")}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3"
                  >
                    🚨 View Safety Map
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="mt-8 bg-white shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="text-gray-800 flex items-center space-x-2">
                  <span>📋 Recent Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">📦 Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">📅 Date: {order.date}</p>
                        <p className="text-sm text-gray-600">🛒 Items: {order.items.join(", ")}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-green-600">₹{order.total}</p>
                        <Badge
                          variant={order.status === "Delivered" ? "default" : "secondary"}
                          className="mt-2 px-3 py-1"
                        >
                          {order.status === "Delivered" ? "✅" : "🚚"} {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subsidies" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Ration Card (Smart Subsidy Alert)</CardTitle>
                <CardDescription>
                  Based on your business profile and location, you may be eligible for these government schemes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Street Vendor AtmaNirbhar Nidhi (SVANidhi)</h3>
                      <Badge className="bg-green-100 text-green-800">Eligible</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Working capital loan up to ₹10,000 for vendors. Interest subsidy @ 7%.
                    </p>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      Apply Now
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">PM Formalization Scheme (PMFME)</h3>
                      <Badge className="bg-yellow-100 text-yellow-800">Likely Eligible</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Credit linked capital subsidy @35% of eligible project cost up to ₹10 lakh.
                    </p>
                    <Button size="sm" variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
                      Check Eligibility
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalog" className="mt-8">
            <Card className="bg-white shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-gray-800 flex items-center space-x-2">
                  <span>🛒 Supplier Catalog</span>
                </CardTitle>
                <CardDescription>Browse and order from verified suppliers</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="🔍 Search products..."
                        className="pl-10 border-2 border-gray-200 focus:border-green-500 h-12 text-lg"
                      />
                    </div>
                    <Button
                      onClick={startVoiceOrder}
                      className={`flex items-center space-x-2 px-8 py-3 text-lg ${
                        isListening
                          ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      }`}
                      disabled={isListening}
                    >
                      <Mic className={`h-5 w-5 ${isListening ? "animate-pulse" : ""}`} />
                      <span>{isListening ? "🎤 Listening..." : "🎤 Voice Order"}</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      {
                        name: "Organic Carrots",
                        supplier: "Green Farms",
                        price: "₹2.9/kg",
                        image: "/placeholder.svg?height=200&width=250",
                        rating: "4.8⭐",
                        emoji: "🥕",
                      },
                      {
                        name: "Fresh Cabbage",
                        supplier: "Valley Produce",
                        price: "₹1.9/kg",
                        image: "/placeholder.svg?height=200&width=250",
                        rating: "4.6⭐",
                        emoji: "🥬",
                      },
                      {
                        name: "Mustard Greens",
                        supplier: "Leafy Farms",
                        price: "₹1.9/kg",
                        image: "/placeholder.svg?height=200&width=250",
                        rating: "4.7⭐",
                        emoji: "🥬",
                      },
                    ].map((product, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-t-lg overflow-hidden relative">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 rounded-full p-2 text-2xl">
                              {product.emoji}
                            </div>
                          </div>
                          <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                            <h3 className="font-bold text-gray-800 mb-2 text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">🏪 {product.supplier}</p>
                            <p className="text-sm text-gray-600 mb-3">{product.rating}</p>
                            <p className="text-2xl font-bold text-green-600 mb-4">{product.price}</p>
                            <Button
                              size="sm"
                              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-3 text-lg"
                            >
                              🛒 Add to Order
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keep other tabs with similar enhanced styling */}
        </Tabs>
      </main>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { TrendingUp, Bot, WarehouseIcon as Inventory, Plus, Edit, RefreshCw, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function SupplierPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Carrots",
      price: 2.9,
      category: "vegetables",
      quantity: 150,
      description: "Fresh organic carrots, harvested daily",
    },
    {
      id: 2,
      name: "Heirloom Tomatoes",
      price: 3.5,
      category: "vegetables",
      quantity: 80,
      description: "Juicy heirloom tomatoes, vine-ripened",
    },
    {
      id: 3,
      name: "Fresh Spinach",
      price: 2.1,
      category: "greens",
      quantity: 45,
      description: "Tender baby spinach leaves",
    },
    {
      id: 4,
      name: "Sweet Potatoes",
      price: 2.8,
      category: "vegetables",
      quantity: 200,
      description: "Naturally sweet, perfect for roasting",
    },
  ])
  const [pricingAdvice, setPricingAdvice] = useState("")
  const [demandForecast, setDemandForecast] = useState("Loading demand forecast data...")

  useEffect(() => {
    loadDemandForecast()
  }, [])

  const loadDemandForecast = () => {
    const forecasts = [
      "Increased demand expected for leafy greens next week",
      "Tomato prices rising in market - good opportunity",
      "Carrot supply exceeding demand - consider adjusting price",
      "Festival season approaching - stock up on popular items",
    ]

    setTimeout(() => {
      const randomForecast = forecasts[Math.floor(Math.random() * forecasts.length)]
      setDemandForecast(randomForecast)
    }, 1000)
  }

  const getPricingSuggestions = () => {
    setPricingAdvice("Analyzing market trends...")
    setTimeout(() => {
      const suggestions = [
        "Recommend increasing carrot price to ₹3.2/kg (current avg: ₹3.0)",
        "Tomato prices stable - maintain current pricing",
        "Consider 10% discount on spinach for bulk orders",
        "Market undersupplied on sweet potatoes - could increase price 15%",
      ]
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
      setPricingAdvice(randomSuggestion)
    }, 2000)
  }

  const restockProduct = (productId) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + Math.floor(Math.random() * 100) + 50 }
          : product,
      ),
    )
    alert(`Product restocked successfully! New quantity updated.`)
  }

  const addNewProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: "New Product",
      price: 2.5,
      category: "vegetables",
      quantity: 100,
      description: "Fresh new product",
    }
    setProducts([...products, newProduct])
    alert("New product added successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Hero Header with Background */}
      <div
        className="relative h-56 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/85 to-yellow-600/85"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 bg-white/20 rounded-full p-3">
                  <Image src="/logo.png" alt="Fulfilla Logo" fill className="object-contain" />
                </div>
                <div className="text-white">
                  <h1 className="text-4xl font-bold">🌾 Supplier Portal</h1>
                  <p className="text-xl opacity-90">For farmers and producers to sell their goods</p>
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
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-lg rounded-lg h-14">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white font-medium"
            >
              📊 Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white font-medium"
            >
              📦 Inventory
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white font-medium"
            >
              📋 Orders
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white font-medium"
            >
              💬 Chat
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white font-medium"
            >
              📈 Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white font-medium"
            >
              ⚙️ Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Pricing Assistant */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="h-6 w-6" />
                    <span>🤖 AI Pricing Assistant</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Get smart pricing suggestions based on market trends
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Button
                    onClick={getPricingSuggestions}
                    className="mb-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3"
                  >
                    💡 Get Pricing Advice
                  </Button>
                  {pricingAdvice && (
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">📊 {pricingAdvice}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Demand Forecast */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6" />
                    <span>📈 Demand Forecast</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">📊 {demandForecast}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Alerts */}
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Inventory className="h-6 w-6" />
                    <span>⚠️ Inventory Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {products
                      .filter((p) => p.quantity < 50)
                      .map((product) => (
                        <div key={product.id} className="text-sm bg-white p-3 rounded-lg border-l-4 border-red-400">
                          <span className="font-medium">📦 {product.name}:</span> {product.quantity}kg remaining
                          <Badge variant="destructive" className="ml-2">
                            {product.quantity < 20 ? "🚨 CRITICAL" : "⚠️ LOW"}
                          </Badge>
                        </div>
                      ))}
                    {products.filter((p) => p.quantity < 50).length === 0 && (
                      <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                        ✅ All products have sufficient stock.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Smart Bargain Bot */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle>🤖 Smart Bargain Bot</CardTitle>
                  <CardDescription className="text-purple-100">
                    Respond to AI negotiation requests from buyers
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 px-6 py-3"
                  >
                    👁️ View Negotiations
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="mt-8">
            <Card className="bg-white shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <span>📦 Manage Inventory</span>
                </CardTitle>
                <CardDescription>Add and manage your products</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Button
                  onClick={addNewProduct}
                  className="mb-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3 text-lg"
                >
                  <Plus className="h-5 w-5 mr-2" />➕ Add New Product
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className={`hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden ${
                        product.quantity < 20
                          ? "ring-2 ring-red-400"
                          : product.quantity < 50
                            ? "ring-2 ring-yellow-400"
                            : "ring-2 ring-green-400"
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="h-48 bg-gradient-to-br from-green-100 to-yellow-100 rounded-t-lg overflow-hidden relative">
                          <img
                            src={`/placeholder.svg?height=200&width=250&query=${product.name.toLowerCase()}`}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 bg-white/90 rounded-full px-3 py-1 text-sm font-bold">
                            {product.quantity < 20 ? "🚨" : product.quantity < 50 ? "⚠️" : "✅"}
                          </div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                          <h3 className="font-bold text-lg mb-2">🌱 {product.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">📂 Category: {product.category}</p>
                          <p className="text-sm mb-1">💰 Price: ₹{product.price}/kg</p>
                          <p className="text-sm mb-4">📦 Quantity: {product.quantity}kg</p>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Edit className="h-3 w-3 mr-1" />
                              ✏️ Edit
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => restockProduct(product.id)}
                              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />🔄 Restock
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keep other tab contents with similar enhanced styling */}
        </Tabs>
      </main>
    </div>
  )
}

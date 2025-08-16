"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Search, TrendingDown, Star, MapPin } from "lucide-react"

interface PriceData {
  supplier: string
  price: number
  rating: number
  distance: number
}

interface PriceComparisonResult {
  item: string
  prices: PriceData[]
  bestPrice: number
  averagePrice: number
  savings: number
  totalSuppliers: number
}

export default function PriceComparison() {
  const [searchItem, setSearchItem] = useState("")
  const [priceData, setPriceData] = useState<PriceComparisonResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState("price")

  const searchPrices = async () => {
    if (!searchItem.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/price-comparison?item=${encodeURIComponent(searchItem)}&sortBy=${sortBy}`)
      const data = await response.json()
      setPriceData(data)
    } catch (error) {
      console.error("Error fetching price comparison:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingDown className="h-5 w-5" />
          <span>Price Comparison</span>
        </CardTitle>
        <CardDescription>Compare prices across multiple suppliers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for items (e.g., tomatoes, onions)"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === "Enter" && searchPrices()}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="distance">Sort by Distance</option>
            </select>
            <Button onClick={searchPrices} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Results */}
          {priceData && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">₹{priceData.bestPrice}</div>
                  <div className="text-xs text-gray-600">Best Price</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">₹{priceData.averagePrice}</div>
                  <div className="text-xs text-gray-600">Average Price</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">₹{priceData.savings}</div>
                  <div className="text-xs text-gray-600">Potential Savings</div>
                </div>
              </div>

              {/* Supplier List */}
              <div className="space-y-3">
                {priceData.prices.map((supplier, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{supplier.supplier}</div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{supplier.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{supplier.distance} km</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">₹{supplier.price}</div>
                      {supplier.price === priceData.bestPrice && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Best Price</Badge>
                      )}
                    </div>
                    <Button size="sm" className="ml-3">
                      Select
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

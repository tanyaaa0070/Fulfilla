"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { MapPin, Star, Truck, Search } from "lucide-react"

interface Supplier {
  id: string
  name: string
  category: string
  rating: number
  distance: number
  deliveryTime: string
  products: string[]
  priceRange: string
  verified: boolean
}

interface Location {
  lat: number
  lon: number
  city: string
}

export default function SupplierList({ location }: { location: Location }) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    fetchSuppliers()
  }, [location])

  useEffect(() => {
    filterSuppliers()
  }, [searchTerm, selectedCategory, suppliers])

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`/api/suppliers?lat=${location.lat}&lon=${location.lon}`)
      const data = await response.json()
      setSuppliers(data)
      setFilteredSuppliers(data)
    } catch (error) {
      console.error("Error fetching suppliers:", error)
    }
  }

  const filterSuppliers = () => {
    let filtered = suppliers

    if (searchTerm) {
      filtered = filtered.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((supplier) => supplier.category === selectedCategory)
    }

    setFilteredSuppliers(filtered)
  }

  const categories = ["all", "vegetables", "spices", "dairy", "grains", "meat"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Local Suppliers</span>
          </CardTitle>
          <CardDescription>Find verified suppliers near your location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search suppliers or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Suppliers List */}
            <div className="space-y-4">
              {filteredSuppliers.map((supplier) => (
                <div key={supplier.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{supplier.name}</h3>
                        {supplier.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{supplier.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{supplier.distance} km away</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Truck className="h-4 w-4" />
                          <span>{supplier.deliveryTime}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{supplier.category}</Badge>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">Available Products:</div>
                    <div className="flex flex-wrap gap-2">
                      {supplier.products.slice(0, 4).map((product, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                      {supplier.products.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{supplier.products.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-600">Price Range: </span>
                      <span className="font-medium">{supplier.priceRange}</span>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        Add to Order
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ArrowRightLeft, Plus, MapPin, Clock, User } from "lucide-react"

interface ExchangeItem {
  id: string
  vendorName: string
  offering: string
  quantity: string
  seeking: string
  location: string
  timePosted: string
  distance: number
  type: "offer" | "request"
}

export default function VendorExchange() {
  const [exchanges, setExchanges] = useState<ExchangeItem[]>([
    {
      id: "1",
      vendorName: "Raj Chaat Corner",
      offering: "Fresh Tomatoes",
      quantity: "5 kg",
      seeking: "Onions",
      location: "Connaught Place",
      timePosted: "2 hours ago",
      distance: 0.5,
      type: "offer",
    },
    {
      id: "2",
      vendorName: "Sharma Snacks",
      offering: "Cooking Oil",
      quantity: "2 liters",
      seeking: "Potatoes",
      location: "Karol Bagh",
      timePosted: "1 hour ago",
      distance: 1.2,
      type: "offer",
    },
    {
      id: "3",
      vendorName: "Delhi Dosa",
      offering: "",
      quantity: "",
      seeking: "Rice (10 kg)",
      location: "Lajpat Nagar",
      timePosted: "30 minutes ago",
      distance: 2.1,
      type: "request",
    },
  ])

  const [newExchange, setNewExchange] = useState({
    offering: "",
    quantity: "",
    seeking: "",
    location: "",
    type: "offer" as "offer" | "request",
  })

  const handleSubmitExchange = () => {
    const exchange: ExchangeItem = {
      id: Date.now().toString(),
      vendorName: "Your Stall",
      offering: newExchange.offering,
      quantity: newExchange.quantity,
      seeking: newExchange.seeking,
      location: newExchange.location,
      timePosted: "Just now",
      distance: 0,
      type: newExchange.type,
    }

    setExchanges((prev) => [exchange, ...prev])
    setNewExchange({
      offering: "",
      quantity: "",
      seeking: "",
      location: "",
      type: "offer",
    })
  }

  const handleExchangeRequest = (exchangeId: string) => {
    alert("Exchange request sent! The vendor will be notified.")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRightLeft className="h-5 w-5" />
            <span>Vendor Exchange Network</span>
          </CardTitle>
          <CardDescription>Trade surplus ingredients with nearby vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Exchanges</TabsTrigger>
              <TabsTrigger value="post">Post Exchange</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="mt-6">
              <div className="space-y-4">
                {exchanges.map((exchange) => (
                  <div key={exchange.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                          <User className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{exchange.vendorName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{exchange.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{exchange.timePosted}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge variant={exchange.type === "offer" ? "default" : "secondary"}>
                        {exchange.type === "offer" ? "Offering" : "Requesting"}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      {exchange.type === "offer" ? (
                        <div className="flex items-center justify-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Offering</div>
                            <div className="font-medium text-green-600">
                              {exchange.offering} ({exchange.quantity})
                            </div>
                          </div>
                          <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Seeking</div>
                            <div className="font-medium text-blue-600">{exchange.seeking}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Requesting</div>
                          <div className="font-medium text-blue-600">{exchange.seeking}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">{exchange.distance} km away</div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Message
                        </Button>
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={() => handleExchangeRequest(exchange.id)}
                        >
                          {exchange.type === "offer" ? "Request Exchange" : "Offer Help"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="post" className="mt-6">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button
                    variant={newExchange.type === "offer" ? "default" : "outline"}
                    onClick={() => setNewExchange((prev) => ({ ...prev, type: "offer" }))}
                    className="flex-1"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Offer Items
                  </Button>
                  <Button
                    variant={newExchange.type === "request" ? "default" : "outline"}
                    onClick={() => setNewExchange((prev) => ({ ...prev, type: "request" }))}
                    className="flex-1"
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Request Items
                  </Button>
                </div>

                {newExchange.type === "offer" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">What are you offering?</label>
                      <Input
                        placeholder="e.g., Fresh Tomatoes, Cooking Oil"
                        value={newExchange.offering}
                        onChange={(e) => setNewExchange((prev) => ({ ...prev, offering: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Quantity</label>
                      <Input
                        placeholder="e.g., 5 kg, 2 liters"
                        value={newExchange.quantity}
                        onChange={(e) => setNewExchange((prev) => ({ ...prev, quantity: e.target.value }))}
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {newExchange.type === "offer" ? "What do you need in return?" : "What do you need?"}
                  </label>
                  <Input
                    placeholder="e.g., Onions, Potatoes, Spices"
                    value={newExchange.seeking}
                    onChange={(e) => setNewExchange((prev) => ({ ...prev, seeking: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Location</label>
                  <Input
                    placeholder="e.g., Connaught Place, Karol Bagh"
                    value={newExchange.location}
                    onChange={(e) => setNewExchange((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <Button
                  onClick={handleSubmitExchange}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={!newExchange.seeking || !newExchange.location}
                >
                  Post Exchange {newExchange.type === "offer" ? "Offer" : "Request"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

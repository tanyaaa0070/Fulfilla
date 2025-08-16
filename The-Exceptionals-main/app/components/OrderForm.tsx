"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Badge } from "../../components/ui/badge"
import { Users, ShoppingCart, Plus, Minus, Truck } from "lucide-react"
import VoiceOrderWidget from "./VoiceOrderWidget"

interface OrderItem {
  id: string
  name: string
  quantity: number
  unit: string
  pricePerUnit: number
  supplier: string
}

export default function OrderForm({ voiceInput }: { voiceInput: string }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [groupMembers, setGroupMembers] = useState(3)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [estimatedDelivery, setEstimatedDelivery] = useState("")

  const addQuickItem = (name: string, unit: string, price: number) => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      name,
      quantity: 1,
      unit,
      pricePerUnit: price,
      supplier: "Local Supplier",
    }
    setOrderItems((prev) => [...prev, newItem])
  }

  const handleVoiceItemsDetected = (items: OrderItem[]) => {
    setOrderItems((prev) => [...prev, ...items])
  }

  const handleVoiceInput = (input: string) => {
    // This is called when voice input is received
    console.log("Voice input received:", input)
  }

  const updateQuantity = (id: string, change: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + item.quantity * item.pricePerUnit, 0)
  }

  const getGroupDiscount = () => {
    const total = getTotalAmount()
    if (groupMembers >= 5) return total * 0.15
    if (groupMembers >= 3) return total * 0.1
    return total * 0.05
  }

  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        items: orderItems,
        groupMembers,
        deliveryAddress,
        specialInstructions,
        totalAmount: getTotalAmount(),
        discount: getGroupDiscount(),
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        alert("Order placed successfully!")
        setOrderItems([])
        setEstimatedDelivery("2-4 hours")
      }
    } catch (error) {
      console.error("Error placing order:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Voice Order Widget */}
      <VoiceOrderWidget onItemsDetected={handleVoiceItemsDetected} onVoiceInput={handleVoiceInput} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Group Order</span>
          </CardTitle>
          <CardDescription>Create or join a group order to get better prices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Group Info */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Group Order Active</div>
                  <div className="text-sm text-gray-600">{groupMembers} vendors participating</div>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {groupMembers >= 5 ? "15%" : groupMembers >= 3 ? "10%" : "5%"} Discount
              </Badge>
            </div>

            {/* Quick Add Items */}
            <div>
              <h3 className="font-medium mb-3">Quick Add Common Items</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: "Tomatoes", unit: "kg", price: 40 },
                  { name: "Onions", unit: "kg", price: 30 },
                  { name: "Potatoes", unit: "kg", price: 25 },
                  { name: "Cooking Oil", unit: "liter", price: 120 },
                  { name: "Rice", unit: "kg", price: 60 },
                  { name: "Wheat Flour", unit: "kg", price: 45 },
                  { name: "Spices Mix", unit: "pack", price: 80 },
                  { name: "Salt", unit: "kg", price: 20 },
                ].map((item) => (
                  <Button
                    key={item.name}
                    variant="outline"
                    size="sm"
                    onClick={() => addQuickItem(item.name, item.unit, item.price)}
                    className="text-xs"
                  >
                    + {item.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Order Items */}
            {orderItems.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Order Items</h3>
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          ₹{item.pricePerUnit} per {item.unit} • {item.supplier}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="font-medium w-20 text-right">₹{item.quantity * item.pricePerUnit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Address</label>
                <Input
                  placeholder="Enter your stall location..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Special Instructions</label>
                <Textarea
                  placeholder="Any special requirements or notes..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Order Summary */}
            {orderItems.length > 0 && (
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{getTotalAmount()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Group Discount ({groupMembers} vendors):</span>
                    <span>-₹{getGroupDiscount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>₹{(getTotalAmount() - getGroupDiscount()).toFixed(2)}</span>
                  </div>
                </div>

                {estimatedDelivery && (
                  <div className="flex items-center space-x-2 mt-4 p-3 bg-green-50 rounded-lg">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">Estimated delivery: {estimatedDelivery}</span>
                  </div>
                )}

                <Button
                  onClick={handleSubmitOrder}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
                  disabled={!deliveryAddress}
                >
                  Place Group Order
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Lightbulb, TrendingUp, Cloud, Users, DollarSign, Calendar } from "lucide-react"

interface Recommendation {
  type: string
  item: string
  reason: string
  priority: "high" | "medium" | "low"
  expectedDemandIncrease?: string
  savings?: string
  priceChange?: string
}

interface SmartRecommendationsProps {
  weather: any
  location: any
  budget?: number
}

export default function SmartRecommendations({ weather, location, budget }: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecommendations()
  }, [weather, location, budget])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/smart-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentWeather: weather,
          location: location,
          budget: budget,
          orderHistory: [], // Would contain actual order history
        }),
      })

      const data = await response.json()
      setRecommendations(data.recommendations || [])
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "weather":
        return <Cloud className="h-4 w-4" />
      case "budget":
        return <DollarSign className="h-4 w-4" />
      case "seasonal":
        return <Calendar className="h-4 w-4" />
      case "group_buying":
        return <Users className="h-4 w-4" />
      case "optimization":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>Smart Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5" />
          <span>Smart Recommendations</span>
        </CardTitle>
        <CardDescription>AI-powered suggestions for your business</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(rec.type)}
                  <h4 className="font-medium">{rec.item}</h4>
                </div>
                <Badge className={getPriorityColor(rec.priority)}>{rec.priority} priority</Badge>
              </div>

              <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {rec.expectedDemandIncrease && (
                    <Badge variant="outline" className="text-xs">
                      +{rec.expectedDemandIncrease} demand
                    </Badge>
                  )}
                  {rec.savings && (
                    <Badge variant="outline" className="text-xs text-green-600">
                      Save {rec.savings}
                    </Badge>
                  )}
                  {rec.priceChange && (
                    <Badge variant="outline" className="text-xs text-orange-600">
                      {rec.priceChange} price change
                    </Badge>
                  )}
                </div>
                <Button size="sm" variant="outline">
                  Add to Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

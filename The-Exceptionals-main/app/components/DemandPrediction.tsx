"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, Calendar } from "lucide-react"

interface DemandPrediction {
  item: string
  currentDemand: "high" | "medium" | "low"
  predictedDemand: "high" | "medium" | "low"
  trend: "up" | "down" | "stable"
  reason: string
  confidence: number
}

interface Location {
  lat: number
  lon: number
  city: string
}

export default function DemandPrediction({ location }: { location: Location }) {
  const [predictions, setPredictions] = useState<DemandPrediction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDemandPredictions()
  }, [location])

  const fetchDemandPredictions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/demand-prediction?lat=${location.lat}&lon=${location.lon}`)
      const data = await response.json()
      setPredictions(data)
    } catch (error) {
      console.error("Error fetching demand predictions:", error)
    } finally {
      setLoading(false)
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>AI Demand Prediction</span>
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
          <TrendingUp className="h-5 w-5" />
          <span>AI Demand Prediction</span>
        </CardTitle>
        <CardDescription>Smart forecasting for your ingredients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{prediction.item}</h4>
                  {getTrendIcon(prediction.trend)}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Confidence</div>
                  <div className="text-sm font-medium">{prediction.confidence}%</div>
                </div>
              </div>

              <div className="flex space-x-2 mb-2">
                <Badge className={getDemandColor(prediction.currentDemand)}>Current: {prediction.currentDemand}</Badge>
                <Badge className={getDemandColor(prediction.predictedDemand)}>
                  Predicted: {prediction.predictedDemand}
                </Badge>
              </div>

              <p className="text-sm text-gray-600">{prediction.reason}</p>
            </div>
          ))}

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Upcoming Events</span>
            </div>
            <div className="text-sm text-blue-700">
              • Festival season approaching - expect 30% higher demand for sweets ingredients
              <br />• Weekend rush - stock up on popular snack items
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

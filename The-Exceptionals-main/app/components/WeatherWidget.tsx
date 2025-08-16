"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react"

interface WeatherData {
  temperature: number
  description: string
  humidity: number
  windSpeed: number
}

interface Location {
  lat: number
  lon: number
  city: string
}

export default function WeatherWidget({ location }: { location: Location }) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWeather()
  }, [location])

  const fetchWeather = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/weather?lat=${location.lat}&lon=${location.lon}`)
      const data = await response.json()
      setWeather(data)
    } catch (error) {
      console.error("Error fetching weather:", error)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (description: string) => {
    if (description.includes("rain")) return <CloudRain className="h-8 w-8 text-blue-500" />
    if (description.includes("cloud")) return <Cloud className="h-8 w-8 text-gray-500" />
    return <Sun className="h-8 w-8 text-yellow-500" />
  }

  const getWeatherRecommendation = (weather: WeatherData) => {
    if (weather.description.includes("rain")) {
      return "☔ Rainy weather - Stock up on chai, pakoras, and hot snacks!"
    }
    if (weather.temperature > 30) {
      return "🌞 Hot weather - Cold drinks, ice cream, and fresh fruits in demand!"
    }
    if (weather.temperature < 20) {
      return "🌡️ Cool weather - Hot food items and warm beverages recommended!"
    }
    return "🌤️ Pleasant weather - Perfect for all street food items!"
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5" />
            <span>Weather Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Thermometer className="h-5 w-5" />
          <span>Weather Insights</span>
        </CardTitle>
        <CardDescription>Current conditions in {location.city}</CardDescription>
      </CardHeader>
      <CardContent>
        {weather && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getWeatherIcon(weather.description)}
                <div>
                  <div className="text-2xl font-bold">{weather.temperature}°C</div>
                  <div className="text-sm text-gray-600 capitalize">{weather.description}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Humidity:</span>
                <span className="ml-2 font-medium">{weather.humidity}%</span>
              </div>
              <div>
                <span className="text-gray-600">Wind:</span>
                <span className="ml-2 font-medium">{weather.windSpeed} km/h</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-800">{getWeatherRecommendation(weather)}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

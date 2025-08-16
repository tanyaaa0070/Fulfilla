import { type NextRequest, NextResponse } from "next/server"

const OPENWEATHER_API_KEY = "67ff5a31b5a23d9b2b9238c36fe2ae18"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat") || "28.61"
  const lon = searchParams.get("lon") || "77.21"

  try {
    // Try OpenWeather API first
    const openWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`,
    )

    if (openWeatherResponse.ok) {
      const data = await openWeatherResponse.json()
      return NextResponse.json({
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      })
    }

    // Fallback to Open-Meteo API
    const openMeteoResponse = await fetch(
      `https://api.open-meteo.com/v1/current?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`,
    )

    if (openMeteoResponse.ok) {
      const data = await openMeteoResponse.json()
      const current = data.current

      // Map weather codes to descriptions
      const getWeatherDescription = (code: number) => {
        if (code <= 3) return "clear sky"
        if (code <= 48) return "cloudy"
        if (code <= 67) return "rain"
        if (code <= 77) return "snow"
        return "clear"
      }

      return NextResponse.json({
        temperature: Math.round(current.temperature_2m),
        description: getWeatherDescription(current.weather_code),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
      })
    }

    // If both APIs fail, return mock data
    return NextResponse.json({
      temperature: 28,
      description: "partly cloudy",
      humidity: 65,
      windSpeed: 12,
    })
  } catch (error) {
    console.error("Weather API error:", error)

    // Return mock data as fallback
    return NextResponse.json({
      temperature: 28,
      description: "partly cloudy",
      humidity: 65,
      windSpeed: 12,
    })
  }
}

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  try {
    // Get current weather to influence predictions
    const weatherResponse = await fetch(`${request.nextUrl.origin}/api/weather?lat=${lat}&lon=${lon}`)
    const weather = await weatherResponse.json()

    // Generate predictions based on weather and other factors
    const predictions = generateDemandPredictions(weather)

    return NextResponse.json(predictions)
  } catch (error) {
    console.error("Demand prediction API error:", error)

    // Return fallback predictions
    return NextResponse.json([
      {
        item: "Tomatoes",
        currentDemand: "medium",
        predictedDemand: "high",
        trend: "up",
        reason: "Weekend approaching, higher demand expected for fresh vegetables",
        confidence: 85,
      },
      {
        item: "Cooking Oil",
        currentDemand: "high",
        predictedDemand: "high",
        trend: "stable",
        reason: "Consistent demand for cooking oil across all weather conditions",
        confidence: 92,
      },
      {
        item: "Spices",
        currentDemand: "medium",
        predictedDemand: "low",
        trend: "down",
        reason: "Post-festival period, reduced demand for specialty spices",
        confidence: 78,
      },
    ])
  }
}

function generateDemandPredictions(weather: any) {
  const predictions = []

  // Weather-based predictions
  if (weather.description.includes("rain")) {
    predictions.push({
      item: "Tea/Chai Ingredients",
      currentDemand: "medium",
      predictedDemand: "high",
      trend: "up",
      reason: "Rainy weather increases demand for hot beverages like chai",
      confidence: 88,
    })

    predictions.push({
      item: "Pakora Ingredients",
      currentDemand: "low",
      predictedDemand: "high",
      trend: "up",
      reason: "Rain creates high demand for fried snacks like pakoras",
      confidence: 85,
    })
  }

  if (weather.temperature > 30) {
    predictions.push({
      item: "Cold Drink Ingredients",
      currentDemand: "medium",
      predictedDemand: "high",
      trend: "up",
      reason: "Hot weather increases demand for cold beverages and ice cream",
      confidence: 90,
    })

    predictions.push({
      item: "Fresh Fruits",
      currentDemand: "medium",
      predictedDemand: "high",
      trend: "up",
      reason: "High temperature drives demand for fresh, cooling fruits",
      confidence: 82,
    })
  }

  if (weather.temperature < 20) {
    predictions.push({
      item: "Hot Snack Ingredients",
      currentDemand: "medium",
      predictedDemand: "high",
      trend: "up",
      reason: "Cool weather increases demand for hot snacks and warm food",
      confidence: 87,
    })
  }

  // Add some general predictions
  predictions.push({
    item: "Onions",
    currentDemand: "high",
    predictedDemand: "medium",
    trend: "down",
    reason: "Price stabilization expected, demand may normalize",
    confidence: 75,
  })

  predictions.push({
    item: "Rice",
    currentDemand: "medium",
    predictedDemand: "medium",
    trend: "stable",
    reason: "Staple ingredient with consistent demand throughout the week",
    confidence: 95,
  })

  return predictions.slice(0, 4) // Return top 4 predictions
}

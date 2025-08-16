import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { orderHistory, currentWeather, location, budget } = await request.json()

    // Smart recommendations based on multiple factors
    const recommendations = []

    // Weather-based recommendations
    if (currentWeather?.temperature > 30) {
      recommendations.push({
        type: "weather",
        item: "Cold Drink Ingredients",
        reason: "Hot weather increases demand for cold beverages",
        priority: "high",
        expectedDemandIncrease: "40%",
      })
    }

    if (currentWeather?.description?.includes("rain")) {
      recommendations.push({
        type: "weather",
        item: "Tea/Chai Ingredients",
        reason: "Rainy weather boosts hot beverage sales",
        priority: "high",
        expectedDemandIncrease: "60%",
      })
    }

    // Budget-based recommendations
    if (budget) {
      recommendations.push({
        type: "budget",
        item: "Bulk Rice Purchase",
        reason: "20% discount available on 50kg+ orders",
        priority: "medium",
        savings: "₹240",
      })
    }

    // Seasonal recommendations
    const currentMonth = new Date().getMonth()
    if (currentMonth >= 9 && currentMonth <= 11) {
      // Oct-Dec
      recommendations.push({
        type: "seasonal",
        item: "Festival Sweets Ingredients",
        reason: "Festival season approaching - high demand expected",
        priority: "high",
        expectedDemandIncrease: "80%",
      })
    }

    // Group buying recommendations
    recommendations.push({
      type: "group_buying",
      item: "Cooking Oil",
      reason: "5 vendors nearby need oil - join group order for 15% discount",
      priority: "medium",
      savings: "₹180 per 10L",
    })

    // Stock optimization
    recommendations.push({
      type: "optimization",
      item: "Onions",
      reason: "Price expected to rise 12% next week - stock up now",
      priority: "medium",
      priceChange: "+12%",
    })

    return NextResponse.json({
      recommendations: recommendations.slice(0, 5), // Top 5 recommendations
      generatedAt: new Date().toISOString(),
      factors: ["weather", "budget", "seasonal", "group_buying", "price_trends"],
    })
  } catch (error) {
    console.error("Smart recommendations error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}

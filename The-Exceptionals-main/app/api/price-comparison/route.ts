import { type NextRequest, NextResponse } from "next/server"

// Mock price comparison across different suppliers
const supplierPrices: { [key: string]: any } = {
  tomatoes: [
    { supplier: "Fresh Vegetables Hub", price: 40, rating: 4.8, distance: 0.8 },
    { supplier: "Green Market", price: 38, rating: 4.6, distance: 1.2 },
    { supplier: "Farm Direct", price: 42, rating: 4.9, distance: 2.1 },
    { supplier: "Local Vendor", price: 35, rating: 4.3, distance: 0.5 },
  ],
  onions: [
    { supplier: "Fresh Vegetables Hub", price: 30, rating: 4.8, distance: 0.8 },
    { supplier: "Wholesale Market", price: 28, rating: 4.5, distance: 1.5 },
    { supplier: "Farm Direct", price: 32, rating: 4.9, distance: 2.1 },
    { supplier: "Local Vendor", price: 27, rating: 4.2, distance: 0.5 },
  ],
  cooking_oil: [
    { supplier: "Oil & More", price: 120, rating: 4.5, distance: 1.5 },
    { supplier: "Wholesale Oil", price: 115, rating: 4.3, distance: 2.0 },
    { supplier: "Premium Oils", price: 125, rating: 4.8, distance: 1.8 },
    { supplier: "Local Store", price: 118, rating: 4.4, distance: 0.7 },
  ],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const item = searchParams.get("item")
  const sortBy = searchParams.get("sortBy") || "price" // price, rating, distance

  if (!item) {
    return NextResponse.json({ error: "Item parameter required" }, { status: 400 })
  }

  const itemKey = item.toLowerCase().replace(/\s+/g, "_")
  let prices = supplierPrices[itemKey]

  if (!prices) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  // Sort based on criteria
  prices = [...prices].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price
      case "rating":
        return b.rating - a.rating
      case "distance":
        return a.distance - b.distance
      default:
        return a.price - b.price
    }
  })

  const bestPrice = Math.min(...prices.map((p) => p.price))
  const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length

  return NextResponse.json({
    item: item,
    prices: prices,
    bestPrice: bestPrice,
    averagePrice: Math.round(avgPrice),
    savings: Math.round(avgPrice - bestPrice),
    totalSuppliers: prices.length,
    lastUpdated: new Date().toISOString(),
  })
}

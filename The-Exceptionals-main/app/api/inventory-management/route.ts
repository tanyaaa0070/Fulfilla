import { type NextRequest, NextResponse } from "next/server"

// Simple inventory management system
const inventory: { [key: string]: any } = {
  tomatoes: { stock: 100, unit: "kg", price: 40, supplier: "Fresh Vegetables Hub" },
  onions: { stock: 80, unit: "kg", price: 30, supplier: "Fresh Vegetables Hub" },
  potatoes: { stock: 120, unit: "kg", price: 25, supplier: "Fresh Vegetables Hub" },
  cooking_oil: { stock: 50, unit: "liter", price: 120, supplier: "Oil & More" },
  rice: { stock: 200, unit: "kg", price: 60, supplier: "Grain Warehouse" },
  wheat_flour: { stock: 150, unit: "kg", price: 45, supplier: "Grain Warehouse" },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const item = searchParams.get("item")

  if (item) {
    const itemKey = item.toLowerCase().replace(/\s+/g, "_")
    const itemData = inventory[itemKey]

    if (itemData) {
      return NextResponse.json({
        item: item,
        ...itemData,
        available: itemData.stock > 0,
        lastUpdated: new Date().toISOString(),
      })
    } else {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }
  }

  return NextResponse.json(inventory)
}

export async function POST(request: NextRequest) {
  try {
    const { item, quantity, action } = await request.json() // action: 'add' or 'subtract'
    const itemKey = item.toLowerCase().replace(/\s+/g, "_")

    if (!inventory[itemKey]) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    if (action === "subtract") {
      inventory[itemKey].stock = Math.max(0, inventory[itemKey].stock - quantity)
    } else if (action === "add") {
      inventory[itemKey].stock += quantity
    }

    return NextResponse.json({
      success: true,
      item: item,
      newStock: inventory[itemKey].stock,
      action: action,
    })
  } catch (error) {
    console.error("Inventory management error:", error)
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 })
  }
}

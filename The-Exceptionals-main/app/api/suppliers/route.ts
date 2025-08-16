import { type NextRequest, NextResponse } from "next/server"

// Mock supplier data - in real app, this would come from a database
const mockSuppliers = [
  {
    id: "1",
    name: "Fresh Vegetables Hub",
    category: "vegetables",
    rating: 4.8,
    distance: 0.8,
    deliveryTime: "30-45 mins",
    products: ["Tomatoes", "Onions", "Potatoes", "Carrots", "Cabbage", "Spinach"],
    priceRange: "₹20-80/kg",
    verified: true,
  },
  {
    id: "2",
    name: "Spice Master",
    category: "spices",
    rating: 4.9,
    distance: 1.2,
    deliveryTime: "45-60 mins",
    products: ["Turmeric", "Red Chili", "Coriander", "Cumin", "Garam Masala", "Black Pepper"],
    priceRange: "₹50-500/kg",
    verified: true,
  },
  {
    id: "3",
    name: "Dairy Fresh",
    category: "dairy",
    rating: 4.6,
    distance: 0.5,
    deliveryTime: "20-30 mins",
    products: ["Milk", "Paneer", "Curd", "Butter", "Cheese", "Ghee"],
    priceRange: "₹30-200/kg",
    verified: true,
  },
  {
    id: "4",
    name: "Grain Warehouse",
    category: "grains",
    rating: 4.7,
    distance: 2.1,
    deliveryTime: "60-90 mins",
    products: ["Rice", "Wheat", "Lentils", "Chickpeas", "Kidney Beans", "Black Gram"],
    priceRange: "₹40-120/kg",
    verified: true,
  },
  {
    id: "5",
    name: "Oil & More",
    category: "grains",
    rating: 4.5,
    distance: 1.5,
    deliveryTime: "45-60 mins",
    products: ["Cooking Oil", "Mustard Oil", "Coconut Oil", "Ghee", "Refined Oil"],
    priceRange: "₹80-300/liter",
    verified: true,
  },
  {
    id: "6",
    name: "Local Meat Shop",
    category: "meat",
    rating: 4.4,
    distance: 1.8,
    deliveryTime: "60-75 mins",
    products: ["Chicken", "Mutton", "Fish", "Prawns", "Eggs"],
    priceRange: "₹150-600/kg",
    verified: true,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  try {
    // In a real app, you would filter suppliers based on location
    // For demo, we'll return all suppliers with slight distance variations
    const suppliers = mockSuppliers
      .map((supplier) => ({
        ...supplier,
        distance: supplier.distance + (Math.random() * 0.5 - 0.25), // Add some randomness
      }))
      .sort((a, b) => a.distance - b.distance)

    return NextResponse.json(suppliers)
  } catch (error) {
    console.error("Suppliers API error:", error)
    return NextResponse.json({ error: "Failed to fetch suppliers" }, { status: 500 })
  }
}

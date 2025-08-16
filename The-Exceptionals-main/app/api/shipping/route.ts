import { type NextRequest, NextResponse } from "next/server"

const SHIPPO_API_KEY = "TEST_UAsd8kCx3TShoCSwVK0+uqFuzlSag9yBeE81evmbHSA"

export async function POST(request: NextRequest) {
  try {
    const { fromAddress, toAddress, items } = await request.json()

    // Mock Shippo API integration for demo
    // In real implementation, you would call Shippo API
    const mockShippingRates = [
      {
        servicelevel: {
          name: "Standard Delivery",
          token: "standard",
        },
        amount: "50.00",
        currency: "INR",
        estimated_days: 1,
      },
      {
        servicelevel: {
          name: "Express Delivery",
          token: "express",
        },
        amount: "100.00",
        currency: "INR",
        estimated_days: 0.5,
      },
    ]

    return NextResponse.json({
      success: true,
      rates: mockShippingRates,
    })
  } catch (error) {
    console.error("Shipping API error:", error)
    return NextResponse.json({ error: "Failed to get shipping rates" }, { status: 500 })
  }
}

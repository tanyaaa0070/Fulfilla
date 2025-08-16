import { type NextRequest, NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY || "gsk_demo_key_for_testing"

export async function POST(request: NextRequest) {
  try {
    const { voiceInput, language } = await request.json()

    // Call Groq API for intelligent voice processing
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `You are a smart assistant for Indian street food vendors. Process voice commands in multiple Indian languages (Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu) and English. 

Extract food ingredients and quantities from the voice input. Return a JSON response with:
{
  "items": [{"name": "ingredient_name", "quantity": "amount", "unit": "kg/liter/pack"}],
  "language_detected": "language_name",
  "confidence": 0.95,
  "processed_text": "cleaned up text in English"
}

Common ingredient mappings:
- टमाटर/தக்காளி/టమాటా/টমেটো = Tomatoes
- प्याज/வெங்காயம்/ఉల్లిపాయ/पेःयाज = Onions  
- आलू/உருளைக்கிழங்கு/బంగాళాదుంప/আলু = Potatoes
- तेल/எண்ணெய்/నూనె/तेल = Cooking Oil
- चावल/அரிசி/బియ్యం/चाल = Rice
- आटा/மாவு/పిండి/আটा = Wheat Flour`,
          },
          {
            role: "user",
            content: `Process this voice input: "${voiceInput}" (detected language: ${language})`,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    })

    if (!groqResponse.ok) {
      // Fallback processing if Groq fails
      return NextResponse.json({
        items: processVoiceFallback(voiceInput),
        language_detected: language || "unknown",
        confidence: 0.7,
        processed_text: voiceInput,
        source: "fallback",
      })
    }

    const groqData = await groqResponse.json()
    const content = groqData.choices[0]?.message?.content

    try {
      const parsedResponse = JSON.parse(content)
      return NextResponse.json({
        ...parsedResponse,
        source: "groq",
      })
    } catch (parseError) {
      // If JSON parsing fails, use fallback
      return NextResponse.json({
        items: processVoiceFallback(voiceInput),
        language_detected: language || "unknown",
        confidence: 0.6,
        processed_text: content || voiceInput,
        source: "groq_fallback",
      })
    }
  } catch (error) {
    console.error("Groq API error:", error)

    // Fallback processing
    const voiceInput = "" // Declare voiceInput variable
    return NextResponse.json({
      items: processVoiceFallback(voiceInput),
      language_detected: "unknown",
      confidence: 0.5,
      processed_text: voiceInput,
      source: "error_fallback",
    })
  }
}

// Fallback processing for when Groq is unavailable
function processVoiceFallback(input: string) {
  const lowerInput = input.toLowerCase()
  const items = []

  // Multi-language ingredient detection
  const ingredientMap = {
    // Tomatoes
    "tomato|टमाटर|தக்காளி|టమాటా|टমেটো|ೊಮೇಟೊ|തക്കാളി|ਟਮਾਟਰ|ٹماٹر": { name: "Tomatoes", unit: "kg", price: 40 },
    // Onions
    "onion|प्याज|வெங்காயம்|ఉల్లిపాయ|पेःयाज|ಈರುಳ್ಳಿ|സವಾള|ਪਿਆਜ਼|پیاز": { name: "Onions", unit: "kg", price: 30 },
    // Potatoes
    "potato|आलू|உருளைக்கிழங்கு|బంగాళాదుంప|আলু|ಆలೂಗಡ್ಡೆ|ഉരുളക്കിഴങ്ങ്|ਆਲੂ|آلو": { name: "Potatoes", unit: "kg", price: 25 },
    // Cooking Oil
    "oil|तेल|எண்ணெய்|నూనె|तेल|ಎಣ್ಣೆ|എಣ್ಣ|ਤੇਲ|तील": { name: "Cooking Oil", unit: "liter", price: 120 },
    // Rice
    "rice|चावल|அரிசி|బియ్యం|चाल|ಅಕ್ಕಿ|അരി|ਚਾਵਲ|چاول": { name: "Rice", unit: "kg", price: 60 },
    // Wheat Flour
    "flour|आटा|மாவு|పిండి|আটा|ಹಿಟ್ಟು|മാവ്|ਆਟਾ|آٹا": { name: "Wheat Flour", unit: "kg", price: 45 },
  }

  for (const [pattern, item] of Object.entries(ingredientMap)) {
    const regex = new RegExp(pattern, "i")
    if (regex.test(input)) {
      items.push({
        name: item.name,
        quantity: "1",
        unit: item.unit,
        price: item.price,
      })
    }
  }

  return items
}

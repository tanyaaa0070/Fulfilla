import { type NextRequest, NextResponse } from "next/server"

// Using LibreTranslate (free and open source translation API)
export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json()

    // Try LibreTranslate (free and open source)
    try {
      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: from || "auto",
          target: to || "en",
          format: "text",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          translatedText: data.translatedText,
          source: "libretranslate",
          confidence: 0.9,
        })
      }
    } catch (error) {
      console.log("LibreTranslate failed, using fallback")
    }

    // Fallback: Simple word mapping for common ingredients
    const ingredientTranslations: { [key: string]: { [key: string]: string } } = {
      tomato: {
        hi: "टमाटर",
        ta: "தக்காளி",
        te: "టమాటా",
        bn: "টমেটো",
        mr: "टोमॅटो",
        gu: "ટમેટા",
        kn: "ಟೊಮೇಟೊ",
        ml: "തക്കാളി",
        pa: "ਟਮਾਟਰ",
        ur: "ٹماٹر",
      },
      onion: {
        hi: "प्याज",
        ta: "வெங்காயம்",
        te: "ఉల్లిపాయ",
        bn: "পেঁয়াজ",
        mr: "कांदा",
        gu: "ડુંગળી",
        kn: "ಈರುಳ್ಳಿ",
        ml: "സവാള",
        pa: "ਪਿਆਜ਼",
        ur: "پیاز",
      },
    }

    const lowerText = text.toLowerCase()
    let translatedText = text

    for (const [english, translations] of Object.entries(ingredientTranslations)) {
      if (lowerText.includes(english)) {
        const translation = translations[to]
        if (translation) {
          translatedText = translatedText.replace(new RegExp(english, "gi"), translation)
        }
      }
    }

    return NextResponse.json({
      translatedText,
      source: "fallback",
      confidence: 0.7,
    })
  } catch (error) {
    console.error("Translation API error:", error)
    return NextResponse.json({ error: "Failed to translate" }, { status: 500 })
  }
}

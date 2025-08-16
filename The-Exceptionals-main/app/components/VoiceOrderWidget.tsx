"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Mic, MicOff, Volume2, Languages, Sparkles, Eye, EyeOff } from "lucide-react"

interface VoiceProcessingResult {
  items: Array<{
    name: string
    quantity: string
    unit: string
    price?: number
  }>
  language_detected: string
  confidence: number
  processed_text: string
  original_text: string
  source: string
}

interface VoiceOrderWidgetProps {
  onItemsDetected: (items: any[]) => void
  onVoiceInput: (input: string) => void
}

export default function VoiceOrderWidget({ onItemsDetected, onVoiceInput }: VoiceOrderWidgetProps) {
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("hi-IN")
  const [voiceResult, setVoiceResult] = useState<VoiceProcessingResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [interimText, setInterimText] = useState("")
  const [finalText, setFinalText] = useState("")
  const [showOriginalScript, setShowOriginalScript] = useState(true)
  const recognitionRef = useRef<any>(null)

  const languages = [
    { code: "hi-IN", name: "हिंदी", flag: "🇮🇳", example: "मुझे 2 किलो टमाटर चाहिए" },
    { code: "en-IN", name: "English", flag: "🇬🇧", example: "I need 2 kg tomatoes" },
    { code: "ta-IN", name: "தமிழ்", flag: "🇮🇳", example: "எனக்கு 2 கிலோ தக்காளி வேண்டும்" },
    { code: "te-IN", name: "తెలుగు", flag: "🇮🇳", example: "నాకు 2 కిలో టమాటాలు కావాలి" },
    { code: "bn-IN", name: "বাংলা", flag: "🇮🇳", example: "আমার 2 কেজি টমেটো লাগবে" },
    { code: "mr-IN", name: "मराठी", flag: "🇮🇳", example: "मला 2 किलो टोमॅटो हवे" },
    { code: "gu-IN", name: "ગુજરાતી", flag: "🇮🇳", example: "મને 2 કિલો ટમેટા જોઈએ" },
    { code: "kn-IN", name: "ಕನ್ನಡ", flag: "🇮🇳", example: "ನನಗೆ 2 ಕಿಲೋ ಟೊಮೇಟೊ ಬೇಕು" },
    { code: "ml-IN", name: "മലയാളം", flag: "🇮🇳", example: "എനിക്ക് 2 കിലോ തക്കാളി വേണം" },
    { code: "pa-IN", name: "ਪੰਜਾਬੀ", flag: "🇮🇳", example: "ਮੈਨੂੰ 2 ਕਿਲੋ ਟਮਾਟਰ ਚਾਹੀਦੇ ਹਨ" },
    { code: "ur-IN", name: "اردو", flag: "🇮🇳", example: "مجھے 2 کلو ٹماٹر چاہیے" },
  ]

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = selectedLanguage
      recognitionRef.current = recognition

      recognition.onstart = () => {
        setIsListening(true)
        setInterimText("")
        setFinalText("")
        setVoiceResult(null)
      }

      recognition.onresult = (event: any) => {
        let interim = ""
        let final = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            final += transcript
          } else {
            interim += transcript
          }
        }

        setInterimText(interim)
        if (final) {
          setFinalText((prev) => prev + final)
          setInterimText("")
        }
      }

      recognition.onend = async () => {
        setIsListening(false)
        if (finalText.trim()) {
          setIsProcessing(true)
          onVoiceInput(finalText)
          await processVoiceWithGroq(finalText, selectedLanguage)
        }
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        setIsProcessing(false)
      }
    }
  }, [selectedLanguage, finalText])

  const processVoiceWithGroq = async (transcript: string, language: string) => {
    try {
      const response = await fetch("/api/groq-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voiceInput: transcript,
          language: language,
        }),
      })

      const result = await response.json()

      // Add original text to result
      const enhancedResult = {
        ...result,
        original_text: transcript,
      }

      setVoiceResult(enhancedResult)

      // Convert items to the format expected by OrderForm
      const formattedItems = result.items.map((item: any) => ({
        id: Date.now().toString() + Math.random(),
        name: item.name,
        quantity: Number.parseInt(item.quantity) || 1,
        unit: item.unit,
        pricePerUnit: item.price || 50,
        supplier: "AI Detected Supplier",
      }))

      onItemsDetected(formattedItems)
    } catch (error) {
      console.error("Error processing voice with Groq:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const startVoiceRecognition = () => {
    if (recognitionRef.current) {
      setFinalText("")
      setInterimText("")
      recognitionRef.current.start()
    }
  }

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedLanguage
      speechSynthesis.speak(utterance)
    }
  }

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Languages className="h-5 w-5" />
          <span>AI Voice Assistant</span>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Sparkles className="h-3 w-3 mr-1" />
            Groq Powered
          </Badge>
        </CardTitle>
        <CardDescription>Speak in any Indian language to add items to your order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isListening}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Real-time Speech Display */}
          {(isListening || finalText || interimText) && (
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div
                      className={`w-2 h-2 rounded-full ${isListening ? "bg-red-500 animate-pulse" : "bg-gray-400"}`}
                    ></div>
                    <span className="text-sm font-medium text-blue-800">
                      {isListening ? "Listening..." : "Speech Captured"}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {currentLanguage?.flag} {currentLanguage?.name}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOriginalScript(!showOriginalScript)}
                  className="text-xs"
                >
                  {showOriginalScript ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  {showOriginalScript ? "Hide" : "Show"} Original
                </Button>
              </div>

              {showOriginalScript && (
                <div className="space-y-2">
                  {finalText && (
                    <div className="p-2 bg-white rounded border">
                      <div className="text-xs text-gray-500 mb-1">Final Text:</div>
                      <div className="text-lg font-medium text-gray-800" dir="auto">
                        {finalText}
                      </div>
                    </div>
                  )}

                  {interimText && (
                    <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                      <div className="text-xs text-yellow-600 mb-1">Speaking... (interim):</div>
                      <div className="text-lg text-yellow-800 opacity-70" dir="auto">
                        {interimText}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Voice Control */}
          <div className="flex space-x-3">
            <Button
              variant={isListening ? "destructive" : "default"}
              onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4 animate-pulse" />
                  <span>Stop Listening</span>
                </>
              ) : isProcessing ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Processing with AI...</span>
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  <span>Start Voice Order</span>
                </>
              )}
            </Button>

            {voiceResult && (
              <Button
                variant="outline"
                onClick={() => speakText(voiceResult.processed_text)}
                className="flex items-center space-x-2"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Example Phrase for Selected Language */}
          {currentLanguage && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm font-medium text-green-800 mb-1">Try saying in {currentLanguage.name}:</div>
              <div className="text-sm text-green-700" dir="auto">
                "{currentLanguage.example}"
              </div>
            </div>
          )}

          {/* AI Processing Result */}
          {voiceResult && (
            <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800">AI Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {voiceResult.language_detected}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(voiceResult.confidence * 100)}% confidence
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {voiceResult.source}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                {/* Original Text */}
                <div className="p-3 bg-white rounded-lg border">
                  <div className="text-sm font-medium text-gray-700 mb-1">Original Speech:</div>
                  <div className="text-base text-gray-800" dir="auto">
                    "{voiceResult.original_text}"
                  </div>
                </div>

                {/* Processed Text */}
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm font-medium text-blue-700 mb-1">AI Understanding:</div>
                  <div className="text-base text-blue-800">"{voiceResult.processed_text}"</div>
                </div>

                {/* Detected Items */}
                {voiceResult.items.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Items detected: </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {voiceResult.items.map((item, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800">
                          {item.quantity} {item.unit} {item.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

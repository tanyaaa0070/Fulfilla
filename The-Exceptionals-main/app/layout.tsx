import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fulfilla - Smart Sourcing for Street Sellers",
  description: "Hyperlocal AI-powered supply chain ecosystem for Indian street food vendors",
  keywords: "street vendors, supply chain, India, food vendors, hyperlocal, AI",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

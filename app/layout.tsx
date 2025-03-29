import type React from "react"
import { Space_Grotesk } from "next/font/google"
import { Mona_Sans as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Darlan Tane | Data Analyst",
  description: "Professional portfolio of Darlan Tane, Data Analyst",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-space ${fontSans.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
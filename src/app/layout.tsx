import type React from "react"
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import "./globals.css"
import { Providers } from "@/providers"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) { 
  return (
    <html lang='en'>
      <body className={`${montserrat.variable} font-sans`}>
        <Suspense fallback={null}>
          <Providers>
            {children}
            <Analytics />
            <Toaster richColors closeButton />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}

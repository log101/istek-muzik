import "@/styles/globals.css"
import type { AppProps } from "next/app"

// Authentication
import { ClerkProvider } from "@clerk/nextjs"

// Shadcn
import { Toaster } from "@/components/ui/sonner"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  )
}

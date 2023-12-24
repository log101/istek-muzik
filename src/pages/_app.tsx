import "@/styles/globals.css"
import type { AppProps } from "next/app"

// Authentication
import { ClerkProvider } from "@clerk/nextjs"
import { trTR } from "@clerk/localizations"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider localization={trTR} {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

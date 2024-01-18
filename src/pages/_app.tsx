import "@/styles/globals.css"
import type { AppProps } from "next/app"

// Authentication
import { ClerkProvider } from "@clerk/nextjs"

// Shadcn
import { Toaster } from "@/components/ui/sonner"

const clerkTrLocalization = {
  userButton: {
    action__manageAccount: "Hesabınızı Yönetin",
    action__signOut: "Çıkış Yap",
    action__signOutAll: "Bütün Hesaplardan Çıkış Yap",
    action__addAccount: "Hesap Ekle"
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} localization={clerkTrLocalization}>
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  )
}

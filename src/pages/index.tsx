import { Inter } from "next/font/google"
import { Separator } from "@/components/ui/separator"
import { Store, User } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className={`h-screen flex flex-col ${inter.className}`}>
      <Navbar />

      <Separator />

      <div className='container flex flex-col space-y-6 py-8 h-full'>
        <p className='text-center'>Bu sayfa gösterim amaçlıdır, asıl üründe olmayacaktır.</p>

        <Link href='/profile' className='w-full h-full'>
          <div className='w-full h-full border-2 border-slate-600 rounded-xl flex flex-col gap-4 justify-center items-center hover:bg-slate-100'>
            <Store size={64} className='border-slate-600' />
            <p className='text-3xl'>Mekan</p>
          </div>
        </Link>

        <Separator />

        <Link href='/customer' className='w-full h-full'>
          <div className='w-full h-full border-2 border-slate-600 rounded-xl flex flex-col gap-4 justify-center items-center hover:bg-slate-100'>
            <User size={64} className='border-slate-600' />

            <p className='text-3xl'>Müşteri</p>
          </div>
        </Link>
      </div>
    </main>
  )
}

import { Inter } from "next/font/google"
import { UserButton } from "@clerk/nextjs"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Store, User } from "lucide-react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className={`h-screen flex flex-col ${inter.className}`}>
      <div className='container flex flex-row items-center justify-between align-center py-4'>
        <div></div>
        <Image
          src='/img/istek-muzik-logo-tek.png'
          alt='logo'
          width={48}
          height={48}
          className='rounded-full border border-slate-800'
        />
        <UserButton afterSignOutUrl='/' />
      </div>

      <Separator />

      <div className='container flex flex-col space-y-6 py-8 h-full'>
        <p className='text-center'>Bu sayfa gösterim amaçlıdır, asıl üründe olmayacaktır.</p>

        <div className='w-full h-full border-2 border-slate-600 rounded-xl flex flex-col gap-4 justify-center items-center hover:bg-slate-100'>
          <Store size={64} className='border-slate-600' />
          <p className='text-3xl'>Mekan</p>
        </div>

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

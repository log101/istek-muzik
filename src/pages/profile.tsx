import { Inter } from "next/font/google"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Music } from "lucide-react"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className={`min-h-screen flex flex-col ${inter.className}`}>
      <Navbar />

      <Separator />

      <div className='container flex flex-col space-y-6 py-4 h-full'>
        <div className='flex flex-row items-center gap-4'>
          <Image
            src='/img/mado-logo.jpg'
            alt='logo'
            width={64}
            height={64}
            className='rounded-full w-[64px] h-[64px]'
          />
          <div className='flex flex-col h-[64px] justify-center'>
            <p className='text-xl'>Kızılay Mado</p>
            <p className='text-xl text-muted-foreground'>@mado.kizilay</p>
          </div>
        </div>
        <div className='space-y-2'>
          <Button className='w-full text-lg' size='lg'>
            Profilini Düzenle
          </Button>

          <Button className='w-full text-lg' size='lg' variant={"secondary"}>
            QR Paylaş
          </Button>
        </div>
        <Separator />
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between items-center'>
            <Link href={"#"} className='text-lg flex flex-row items-center'>
              <Music className='mr-4' /> Müzik Tavsiyelerin
            </Link>
            <ChevronRight />
          </div>
        </div>
      </div>
    </main>
  )
}

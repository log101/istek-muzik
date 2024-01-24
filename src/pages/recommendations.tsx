import { Inter } from "next/font/google"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Plus } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className={`min-h-screen flex flex-col  ${inter.className}`}>
      <Navbar />

      <Separator />

      <div className='container flex flex-col space-y-6 py-4 h-full'>
        <div className='flex flex-col gap-4'>
          <Link href='/' className='flex flex-row items-center text-sm text-muted-foreground'>
            <ChevronLeft /> <p>Geri Dön</p>
          </Link>
          <div className='flex flex-col'>
            <h4 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Müzik Tavsiyelerin</h4>
            <p className='text-sm text-muted-foreground'>Burada seçtiğin şarkılar müşterilere tavsiye edilecek.</p>
          </div>

          <Link href='/recommendations-new'>
            <Button size='lg' className='text-md w-full' variant='outline'>
              <Plus className='mr-2 h-5 w-5' />
              Şarkı Ekle
            </Button>
          </Link>

          <div className='flex flex-col gap-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(element => (
              <div className='flex flex-row gap-4 justify-items-stretch' key={element}>
                <div className='w-[64px] h-[64px] bg-slate-300 rounded-lg'></div>
                <div className='flex flex-col justify-center'>
                  <p className='text-lg'>Ara Beni Lütfen</p>
                  <p className='text-lg text-muted-foreground'>Kenan Doğulu</p>
                </div>

                <p className='text-sm text-muted-foreground text-right flex-1 self-end'>@esra.key</p>
              </div>
            ))}
            B
          </div>
        </div>
      </div>
    </main>
  )
}

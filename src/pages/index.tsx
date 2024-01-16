import { Inter } from "next/font/google"
import { UserButton } from "@clerk/nextjs"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className={`min-h-screen flex flex-col  ${inter.className}`}>
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

      <div className='container flex flex-col space-y-5 py-4 h-full'>
        <div className='flex flex-row items-center gap-2'>
          <div className='w-[48px] h-[48px] bg-slate-300 rounded-full'></div>
          <div className='flex flex-col h-[48px] justify-between'>
            <p className='text-md'>Kızılay Mado</p>
            <p className='text-md text-muted-foreground'>@mado.kizilay</p>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>Hangi şarkı çalsın istersin?</h4>

          <Input placeholder='Müzik Ara...' />
          <Button className='w-full bg-green-600 hover:bg-green-500'>Müzik İste</Button>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex flex-row justify-between items-center'>
            <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>Sıradaki Parça</h4>
            <p className='text-sm text-muted-foreground underline'>bütün liste</p>
          </div>

          <div className='flex flex-row gap-4 justify-items-stretch'>
            <div className='w-[52px] h-[52px] bg-slate-300 rounded-lg'></div>
            <div>
              <p className='text-md'>Ara Beni Lütfen</p>
              <p className='text-md text-muted-foreground'>Kenan Doğulu</p>
            </div>

            <p className='text-sm text-muted-foreground text-right flex-1 self-end'>@esra.key</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tavsiyeler</CardTitle>
            <CardDescription>
              En çok çalınan, en popüler şarkılara göz at. İstek göndermek için şarkının üzerine tıklaman yeterli!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row justify-between'>
              <div className='w-[52px] h-[52px] bg-slate-300 rounded-lg'></div>
              <div className='w-[52px] h-[52px] bg-slate-300 rounded-lg'></div>
              <div className='w-[52px] h-[52px] bg-slate-300 rounded-lg'></div>
              <div className='w-[52px] h-[52px] bg-slate-300 rounded-lg'></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

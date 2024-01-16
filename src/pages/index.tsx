import { Inter } from "next/font/google"
import { UserButton } from "@clerk/nextjs"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const router = useRouter()

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

      <div className='container flex flex-col space-y-6 py-4 h-full'>
        <div className='flex flex-row items-center gap-4'>
          <Image
            src='/img/mado-logo.jpg'
            alt='logo'
            width={64}
            height={64}
            className='rounded-full w-[84px] h-[64px]'
          />

          <div className='flex flex-col h-[48px] justify-center'>
            <p className='text-lg'>Kızılay Mado</p>
            <p className='text-lg text-muted-foreground'>@mado.kizilay</p>
          </div>
        </div>

        <Separator />

        <div className='flex flex-col gap-3'>
          <h4 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Hangi şarkı çalsın istersin?</h4>
          <Input
            placeholder='Müzik Ara...'
            className='text-lg'
            onChange={e => router.push(`/new-request?q=${e.target.value}`)}
          />
          <Button
            className='w-full bg-green-600 hover:bg-green-500 text-lg'
            size='lg'
            onClick={() => router.push("/new-request")}
          >
            Müzik İste
          </Button>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between items-center'>
            <h4 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Sıradaki Parça</h4>
            <Link href='/requests'>
              <p className='text-base text-muted-foreground underline'>bütün liste</p>
            </Link>
          </div>

          <div className='flex flex-row gap-4 justify-items-stretch'>
            <div className='w-[64px] h-[64px] bg-slate-300 rounded-lg'></div>
            <div className='flex flex-col justify-center'>
              <p className='text-lg'>Ara Beni Lütfen</p>
              <p className='text-lg text-muted-foreground'>Kenan Doğulu</p>
            </div>

            <p className='text-md text-muted-foreground text-right flex-1 self-end'>@esra.key</p>
          </div>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Tavsiyeler</CardTitle>
            <CardDescription>
              En çok çalınan, en popüler şarkılara göz at. İstek göndermek için şarkının üzerine tıklaman yeterli!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row justify-between space-x-2'>
              <div className='w-full h-14 bg-slate-300 rounded-lg'></div>
              <div className='w-full h-14 bg-slate-300 rounded-lg'></div>
              <div className='w-full h-14 bg-slate-300 rounded-lg'></div>
              <div className='w-full h-14 bg-slate-300 rounded-lg'></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

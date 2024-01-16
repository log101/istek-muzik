import { Inter } from "next/font/google"
import { UserButton } from "@clerk/nextjs"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

      <div className='container flex flex-col space-y-3 py-4 h-full'>
        <div className='flex flex-row items-center gap-4'>
          <div className='w-[48px] h-[48px] bg-slate-300 rounded-full'></div>
          <div className='flex flex-col h-[48px] justify-between'>
            <p className='text-md'>Kızılay Mado</p>
            <p className='text-md text-muted-foreground'>@mado.kizilay</p>
          </div>
        </div>

        <p>Hangi şarkı çalsın istersin?</p>

        <Input placeholder='Müzik Ara...' />
        <Button className='w-full bg-green-600 hover:bg-green-500'>Müzik İste</Button>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between'>
            <p className='text-md'>Sıradaki parça</p>
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
      </div>
    </main>
  )
}

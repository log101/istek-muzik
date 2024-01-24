import { Inter } from "next/font/google"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Plus } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className={`min-h-screen flex flex-col  ${inter.className}`}>
      <Navbar />

      <Separator />

      <div className='container flex flex-col space-y-6 py-2'>
        <div className='flex flex-col'>
          <Button
            className='text-sm text-muted-foreground items-center justify-start px-0'
            variant='link'
            onClick={() => history.back()}
          >
            <ChevronLeft /> Geri Dön
          </Button>
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
            <Dialog key={element}>
              <DialogTrigger asChild>
                <div className='flex flex-row gap-4 justify-items-stretch pr-2'>
                  <Image
                    src={"/img/ara-beni-lutfen.webp"}
                    alt='logo'
                    width={64}
                    height={64}
                    className='rounded-lg border border-slate-800 h-[64px] w-[64px]'
                  />
                  <div className='flex flex-col '>
                    <p className='text-lg'>Ara Beni Lütfen</p>
                    <p className='text-lg text-muted-foreground'>Kenan Doğulu</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Tavsiyelerden Çıkar</DialogTitle>
                  <DialogDescription>Şarkıyı tavsiyelerden çıkarmak istediğine emin misin?</DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='flex flex-row gap-4 justify-items-stretch'>
                    <Image
                      src={"/img/ara-beni-lutfen.webp"}
                      alt='logo'
                      width={64}
                      height={64}
                      className='rounded-lg border border-slate-800 h-[64px] w-[64px]'
                    />
                    <div className='flex flex-col '>
                      <p className='text-lg'>Ara Beni Lütfen</p>
                      <p className='text-lg text-muted-foreground'>Kenan Doğulu</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <div className='flex flex-col gap-2'>
                    <DialogClose asChild>
                      <Button type='button'>Onayla</Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button type='button' variant={"secondary"}>
                        Vazgeç
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </main>
  )
}

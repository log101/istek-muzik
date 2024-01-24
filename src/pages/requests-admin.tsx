import { Inter } from "next/font/google"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className={`min-h-screen flex flex-col ${inter.className}`}>
      <Navbar />

      <Separator />

      <div className='container flex flex-col space-y-6 py-4 h-full'>
        <div className='flex flex-col gap-4'>
          <div>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Müzik İstekleri</h1>
            <p className='leading-7 [&:not(:first-child)]:mt-6'>
              Canlı müzik isteklerini burada görüntüleyebilirsin, çalmak istediklerinin üzerine bas ve onayla butonuna
              tıkla.
            </p>
          </div>

          <Tabs defaultValue='account' className='w-full'>
            <TabsList className='flex h-full'>
              <TabsTrigger value='account' className='grow text-md'>
                İstekler
              </TabsTrigger>
              <TabsTrigger value='password' className='grow text-md'>
                Onaylananlar
              </TabsTrigger>
              <TabsTrigger value='denied' className='grow text-md'>
                Reddedilenler
              </TabsTrigger>
            </TabsList>
          </Tabs>

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
                    <p className='text-sm text-muted-foreground text-right flex-1 self-end'>@esra.key</p>
                  </div>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Müzik İsteğini Onayla</DialogTitle>
                    <DialogDescription>Onayla butonuna basarak isteği onaylayabilirsin.</DialogDescription>
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
                        <Button type='button' className='bg-green-600 hover:bg-green-500'>
                          Onayla
                        </Button>
                      </DialogClose>

                      <DialogClose asChild>
                        <Button type='button' className='bg-red-600 hover:bg-red-500'>
                          Reddet
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

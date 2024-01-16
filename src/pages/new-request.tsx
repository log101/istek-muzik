import { Inter } from "next/font/google"
import { UserButton } from "@clerk/nextjs"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Input } from "@/components/ui/input"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function NewRequestPage() {
  const [query, setQuery] = useState("")

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
        <div className='flex flex-col gap-3'>
          <Link href='/' className='flex flex-row items-center text-sm text-muted-foreground'>
            <ChevronLeft /> <p>Geri Dön</p>
          </Link>

          <h4 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Hangi şarkı çalsın istersin?</h4>
          <Input
            placeholder='Müzik Ara...'
            className='text-lg'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(element => (
              <Dialog key={element}>
                <DialogTrigger asChild>
                  <div className='flex flex-row gap-4 justify-items-stretch'>
                    <div className='w-[64px] h-[64px] bg-slate-300 rounded-lg'></div>
                    <div className='flex flex-col justify-center'>
                      <p className='text-lg'>Ara Beni Lütfen</p>
                      <p className='text-lg text-muted-foreground'>Kenan Doğulu</p>
                    </div>

                    <p className='text-sm text-muted-foreground text-right flex-1 self-end'>@esra.key</p>
                  </div>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Müzik İsteği Gönder</DialogTitle>
                    <DialogDescription>
                      Aşağıya instagram ismini yaz ve isteğini gönder. Unutma, günde yalnızca üç istek gönderebilirsin.
                    </DialogDescription>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='name' className='text-right'>
                        Instagram Adın
                      </Label>
                      <Input id='name' value='' className='col-span-3' placeholder='@ ile başlayan Instagram adın' />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type='submit'>İsteği Gönder</Button>
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

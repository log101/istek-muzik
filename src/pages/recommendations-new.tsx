import { Inter } from "next/font/google"
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
import useSWR, { Fetcher } from "swr"
import { useRouter } from "next/router"
import { DialogClose } from "@radix-ui/react-dialog"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

const fetcher: Fetcher<
  {
    tracks: { items: { id: string; name: string; artists: { name: string }[]; album: { images: { url: string }[] } }[] }
  },
  string
> = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    throw error
  }

  return res.json()
}

export default function NewRequestPage() {
  const router = useRouter()

  const [query, setQuery] = useState(router.query.q ?? "")
  const [token, setToken] = useState("")

  const getKey = async () => {
    await fetch("/api/search/music", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async res => {
        if (res.ok) {
          const data = await res.json()
          setToken(data.access_token)
        } else {
          throw new Error()
        }
      })
      .catch(() => console.error("Etkinlik oluşturulamadı, tekrar dener misin?"))
  }

  const { data } = useSWR(
    query.length > 2 && token.length ? `/api/search/music?q=${query}&token=${token}` : null,
    fetcher
  )

  return (
    <main className={`min-h-screen flex flex-col ${inter.className}`}>
      <Navbar />

      <Separator />

      <div className='container flex flex-col space-y-4 py-4 h-full'>
        <div className='flex flex-col gap-3'>
          <Link href='/' className='flex flex-row items-center text-sm text-muted-foreground'>
            <ChevronLeft /> <p>Geri Dön</p>
          </Link>

          <div className='flex flex-col gap-2'>
            <h4 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Hangi şarkıyı tavsiye edersin?</h4>
            <p className='text-sm text-muted-foreground leading-5'>
              Tavsiye etmek istediğin şarkının adını yaz, istekte bulunmak için üzerine tıklaman yeterli.
            </p>
          </div>

          <div className='mb-1'>
            <Input
              autoFocus
              placeholder='Müzik Ara...'
              className='text-lg'
              value={query}
              onChange={async e => {
                if (token.length) {
                  setQuery(e.target.value)
                } else {
                  getKey()
                  setQuery(e.target.value)
                }
              }}
            />

            {query.length < 3 && query.length > 0 && (
              <p className='text-sm text-muted-foreground mt-2'>En az üç karakter girmelisin.</p>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-4'>
            {data?.tracks.items.map(track => (
              <Dialog key={track.id}>
                <DialogTrigger asChild>
                  <div className='flex flex-row gap-4 justify-items-stretch'>
                    <Image
                      src={track.album.images?.[0].url}
                      alt='logo'
                      width={64}
                      height={64}
                      className='rounded-lg border border-slate-800 h-[64px] w-[64px]'
                    />
                    <div className='flex flex-col '>
                      <p className='text-lg'>{track.name}</p>
                      <p className='text-lg text-muted-foreground'>{track.artists?.[0].name}</p>
                    </div>
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
                    <div className='flex flex-row gap-4 justify-items-stretch'>
                      <Image
                        src={track.album.images?.[0].url}
                        alt='logo'
                        width={64}
                        height={64}
                        className='rounded-lg border border-slate-800 h-[64px] w-[64px]'
                      />
                      <div className='flex flex-col '>
                        <p className='text-lg'>{track.name}</p>
                        <p className='text-lg text-muted-foreground'>{track.artists?.[0].name}</p>
                      </div>
                    </div>
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

            {!query && (
              <>
                <Separator />
                <p className='text-muted-foreground'>Kararsız kaldıysan mekanın sana özel tavsiyelerine göz at!</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className='flex flex-row gap-4 justify-items-stretch'>
                      <Image
                        src='/img/ara-beni-lutfen.webp'
                        alt='logo'
                        width={64}
                        height={64}
                        className='rounded-lg border border-slate-800 h-[64px] w-[64px]'
                      />
                      <div className='flex flex-col'>
                        <p className='text-lg'>Ara Beni Lütfen</p>
                        <p className='text-lg text-muted-foreground'>Kenan Doğulu</p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Şarkıyı Tavsiyelerine Ekle</DialogTitle>
                      <DialogDescription>
                        Onayladığında şarkı müşterilere tavsiye ettiğin şarkılara eklenecek.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='flex flex-row gap-4 justify-items-stretch'>
                        <Image
                          src='/img/ara-beni-lutfen.webp'
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
                      <DialogClose asChild>
                        <Button size='lg' type='submit' className='text-lg'>
                          Tavsiyelere Ekle
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

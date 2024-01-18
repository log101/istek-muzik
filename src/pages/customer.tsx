import { Inter } from "next/font/google"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { DialogClose } from "@radix-ui/react-dialog"
import Navbar from "@/components/navbar"

const formSchema = z.object({
  instagramHandle: z.string().min(2, {
    message: "Lütfen instagram isminizi doğru girdiğinize emin olunuz."
  })
})

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instagramHandle: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const recommendations = ["alizade.webp", "halodayi.webp", "sila.webp", "mfo.webp"]

  return (
    <main className={`min-h-screen flex flex-col  ${inter.className}`}>
      <Navbar />

      <Separator />

      <div className='container flex flex-col space-y-6 py-4 h-full'>
        <div className='flex flex-row items-center gap-4'>
          <Image
            src='/img/mado-logo.jpg'
            alt='logo'
            width={48}
            height={48}
            className='rounded-full w-[48px] h-[48px]'
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
                <DialogTitle>Müzik İsteği Gönder</DialogTitle>
                <DialogDescription>
                  Aşağıya instagram ismini yaz ve isteğini gönder. Unutma, günde yalnızca üç istek gönderebilirsin.
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name='instagramHandle'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram Adın</FormLabel>
                          <FormControl>
                            <Input className='col-span-3' placeholder='@ ile başlayan Instagram adın' {...field} />
                          </FormControl>
                          <FormDescription>Instagram adın gönderdiğin isteğin yanında görünecek.</FormDescription>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type='submit'>İsteği Gönder</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {[0, 1, 2, 3].map(val => {
                return (
                  <Dialog key={val}>
                    <DialogTrigger asChild>
                      <Image
                        src={`/img/${recommendations[val]}`}
                        alt='logo'
                        width={512}
                        height={512}
                        className='rounded-lg border border-slate-800 w-max-[256px]'
                      />
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Müzik İsteği Gönder</DialogTitle>
                        <DialogDescription>
                          Aşağıya instagram ismini yaz ve isteğini gönder. Unutma, günde yalnızca üç istek
                          gönderebilirsin.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <div className='flex flex-row gap-4 justify-items-stretch'>
                          <Image
                            src={`/img/${recommendations[val]}`}
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
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                              control={form.control}
                              name='instagramHandle'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Instagram Adın</FormLabel>
                                  <FormControl>
                                    <Input
                                      className='col-span-3'
                                      placeholder='@ ile başlayan Instagram adın'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Instagram adın gönderdiğin isteğin yanında görünecek.
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type='submit'>İsteği Gönder</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

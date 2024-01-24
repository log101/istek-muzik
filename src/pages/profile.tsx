import { Inter } from "next/font/google"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Music } from "lucide-react"
import Navbar from "@/components/navbar"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const inter = Inter({ subsets: ["latin"] })

const formSchema = z.object({
  instagramHandle: z.string().min(2, {
    message: "Lütfen instagram isminizi doğru girdiğinize emin olunuz."
  }),
  profileName: z.string().min(3, {
    message: "Profil isminiz en az üç harfli olmalı"
  })
})

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instagramHandle: "",
      profileName: ""
    }
  })

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
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='w-full text-lg' size='lg'>
                Profilini Düzenle
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Profil Bilgilerini Düzenle</DialogTitle>
                <DialogDescription>Profil detaylarını buradan düzenleyebilirsin.</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(data => console.log(data))} className='flex flex-col gap-2'>
                    <FormField
                      control={form.control}
                      name='profileName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profil İsmi</FormLabel>
                          <FormControl>
                            <Input className='col-span-3' placeholder='Mekanın ismi' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='instagramHandle'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram Adın</FormLabel>
                          <FormControl>
                            <Input className='col-span-3' placeholder='@ ile başlayan Instagram adın' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type='submit'>Kaydet</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button className='w-full text-lg' size='lg' variant={"secondary"}>
            QR Paylaş
          </Button>
        </div>
        <Separator />
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between items-center'>
            <Link href='/recommendations' className='text-lg flex flex-row items-center'>
              <Music className='mr-4' /> Müzik Tavsiyelerin
            </Link>
            <ChevronRight />
          </div>
        </div>
      </div>
    </main>
  )
}

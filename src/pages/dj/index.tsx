import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { UserButton } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "DJ / İstek Müzik"
}

export default function DjHomePage() {
  return (
    <>
      <div className='h-screen flex flex-col'>
        <div className='container flex flex-row items-center justify-between align-center py-4'>
          <h2 className='text-lg font-semibold'>İstek Müzik</h2>
          <UserButton afterSignOutUrl='/' />
        </div>

        <Separator />

        <div className='container flex flex-col justify-between space-y-3 py-4 h-full'>
          <div className='flex flex-col space-y-2'>
            <h2 className='text-xl'>Oluşturduğun Etkinlikler</h2>
            <div className='flex flex-row space-x-3 items-center'>
              <div className='w-20 h-20 bg-slate-100 border rounded shadow-sm'></div>
              <div className='flex flex-col space-y-2'>
                <p className='text-lg'>Örnek Etkinlik</p>
                <p className='text-lg font-light'>Etkinlik Henüz Başlamadı</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-green-600 hover:bg-green-500'>
                  <p className='text-lg'>Etkinlik Oluştur</p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <p className='text-lg'>Yeni Etkinlik Oluştur</p>
                  </DialogTitle>
                  <DialogDescription>
                    Etkinlik ile alakalı detayları girdikten sonra kaydete bas. Kayıttan sonra etkinlik sayfasına
                    yönlendirileceksin.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-right'>
                      Mekan Adı:
                    </Label>
                    <Input id='name' className='col-span-3' />
                  </div>
                </div>
                <DialogFooter>
                  <div className='flex flex-col space-y-2'>
                    <Button type='submit' className='bg-green-600 hover:bg-green-500'>
                      <p className='text-lg'>Kaydet</p>
                    </Button>
                    <DialogClose asChild>
                      <Button variant='secondary'>
                        <p className='text-lg'>Vazgeç</p>
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant='secondary' className='bg-blue-400 hover:bg-blue-300'>
              <p className='text-lg'>Tavsiyelerini Düzenle</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

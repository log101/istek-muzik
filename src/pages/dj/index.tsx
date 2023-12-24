import { Button } from "@/components/ui/button"
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
            <Button>
              <p className='text-lg'>Etkinlik Oluştur</p>
            </Button>
            <Button variant='secondary' className='bg-blue-500 hover:bg-blue-400'>
              <p className='text-lg'>Tavsiyelerini Düzenle</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

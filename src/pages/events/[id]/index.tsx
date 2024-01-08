import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserButton, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/router"
import useSWR, { Fetcher } from "swr"
import { Event } from "@prisma/client"
import Link from "next/link"
import Script from "next/script"

const fetcher: Fetcher<Event, string> = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    throw error
  }

  return res.json()
}

// TODO: Extract to a different component
const QrCodeImage = ({ url = "#" }: { url: string }) => {
  return (
    <>
      <div id='qrcode' className='flex justify-center'></div>
      <Script
        src='/js/qrcode.min.js'
        onReady={() =>
          // @ts-expect-error imported script
          new QRCode(document.getElementById("qrcode"), {
            text: url,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            // @ts-expect-error imported script
            correctLevel: QRCode.CorrectLevel.H
          })
        }
      />
    </>
  )
}

const EventPage = () => {
  const router = useRouter()
  const { userId } = useAuth()

  // TODO: Add error handling
  const { data } = useSWR(`/api/events/${router.query.id}`, fetcher)

  return (
    <>
      <div className='h-screen flex flex-col'>
        <div className='container flex flex-row items-center justify-between align-center py-4'>
          <h2 className='text-lg font-semibold'>İstek Müzik</h2>
          <UserButton afterSignOutUrl='/' />
        </div>

        <Separator />

        {data && (
          <>
            <div className='container flex flex-col space-y-8 py-4 h-full justify-center'>
              <QrCodeImage url={`localhost:3000/dj/${userId}`} />
              <div className='flex flex-col space-y-2'>
                <div className='text-lg'>
                  <span className='font-semibold'>Etkinliğin Mekanı:</span> {data.locationTitle}
                </div>
              </div>
              <div className='flex flex-col space-y-3'>
                <Button className='bg-green-600 hover:bg-green-500'>
                  <p className='text-lg'>Etkinliği Başlat</p>
                </Button>
                <Button variant='secondary' className='bg-blue-400 hover:bg-blue-300'>
                  <Link href={`/events/${router.query.id}/edit`}>
                    <p className='text-lg'>Etkinliği Düzenle</p>
                  </Link>
                </Button>
                <Button>
                  <p className='text-lg'>Paylaş</p>
                </Button>
                <Button variant='secondary'>
                  <Link href={`/dj`}>
                    <p className='text-lg'>Geri Dön</p>
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default EventPage

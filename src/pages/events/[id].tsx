import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserButton } from "@clerk/nextjs"
import { useRouter } from "next/router"
import useSWR, { Fetcher } from "swr"
import { Event } from "@prisma/client"
import Link from "next/link"

const fetcher: Fetcher<Event, string> = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    throw error
  }

  return res.json()
}

const EventPage = () => {
  const router = useRouter()

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
              {/* Show dj qr code */}
              <div id='qrcode' className='flex justify-center'></div>
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
                  <p className='text-lg'>Etkinliği Düzenle</p>
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

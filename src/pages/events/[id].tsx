import { Separator } from "@/components/ui/separator"
import { UserButton } from "@clerk/nextjs"
import { useRouter } from "next/router"
import Script from "next/script"

const EventPage = () => {
  const router = useRouter()

  return (
    <>
      <div className='h-screen flex flex-col'>
        <div className='container flex flex-row items-center justify-between align-center py-4'>
          <h2 className='text-lg font-semibold'>İstek Müzik</h2>
          <UserButton afterSignOutUrl='/' />
        </div>

        <Separator />

        <div className='container flex flex-col space-y-3 py-4 h-full'>
          <div id='qrcode'></div>
          <div className='flex flex-col space-y-2'>Deneme {router.query.id}</div>
        </div>
      </div>
      <Script
        src='https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs@gh-pages/qrcode.min.js'
        onLoad={() =>
          // @ts-expect-error next/script
          new QRCode("qrcode", {
            text: "http://jindo.dev.naver.com/collie",
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            // @ts-expect-error next/script
            correctLevel: QRCode.CorrectLevel.H
          })
        }
      />
    </>
  )
}

export default EventPage

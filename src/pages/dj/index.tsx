import { Separator } from "@/components/ui/separator"
import { UserButton } from "@clerk/nextjs"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components."
}

export default function DjHomePage() {
  return (
    <>
      <div className='h-full flex-col md:flex'>
        <div className='container flex flex-row items-center justify-between align-center py-4 md:h-16'>
          <h2 className='text-lg font-semibold'>İstek Müzik</h2>
          <UserButton afterSignOutUrl='/' />
        </div>
        <Separator />
      </div>
    </>
  )
}

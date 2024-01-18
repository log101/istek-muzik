import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className='container flex flex-row items-center justify-between align-center py-4'>
      <div></div>
      <Link href='/'>
        <Image
          src='/img/istek-muzik-logo-tek.png'
          alt='logo'
          width={48}
          height={48}
          className='rounded-full border border-slate-800'
        />
      </Link>

      <UserButton afterSignOutUrl='/' userProfileMode='navigation' userProfileUrl='/profile' />
    </div>
  )
}

export default Navbar

import { UserInfoNavbar } from '@/components/common/UserInfoNavbar/UserInfoNavbar'
import Image from 'next/image'
import Link from 'next/link'

import Banner from './Banner'

const UnauthenticatedHeader = () => {
  return (
    <header className='sticky top-0 z-50'>
      <Banner />
      <div className='bg-header bg-cover'>
        <nav className='container flex h-[75px] items-center justify-between'>
          <Link href='/'>
            <Image alt='Logo Trung Tâm Dược Phẩm' src='/logo.svg' width={133} height={44} />
          </Link>
          <UserInfoNavbar />
        </nav>
      </div>
    </header>
  )
}

export default UnauthenticatedHeader

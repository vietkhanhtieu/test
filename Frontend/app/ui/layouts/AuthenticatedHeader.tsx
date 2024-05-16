import { SearchBar } from '@/components/common/SearchBar/SearchBar'
import SubNavbar from '@/components/common/SubNavbar/SubNavbar'
import { UserInfoNavbar } from '@/components/common/UserInfoNavbar/UserInfoNavbar'
import Image from 'next/image'
import Link from 'next/link'

import Banner from './Banner'
import SecondaryNavBar from './SecondaryNavBar'

const AuthenticatedHeader = () => {
  return (
    <header>
      <Banner />
      <div className='sticky top-0 z-50'>
        <div className='bg-header bg-cover'>
          <nav className='container py-5 text-white'>
            <SecondaryNavBar />

            <div className='flex flex-wrap lg:flex-nowrap items-center justify-between gap-5 lg:gap-10'>
              <Link href='/' className='contents order-1'>
                <Image
                  alt='Logo Trung Tâm Dược Phẩm'
                  src='/logo.svg'
                  width={133}
                  height={44}
                  className='h-11'
                />
              </Link>
              <div className='order-2 lg:order-3'>
                <UserInfoNavbar />
              </div>
              <div className='order-3 lg:order-2 w-full flex-grow'>
                <SearchBar />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <SubNavbar />
    </header>
  )
}

export default AuthenticatedHeader

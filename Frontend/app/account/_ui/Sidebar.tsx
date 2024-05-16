'use client'

import { ZALO_URL } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menuGroupA, menuGroupB } from './definitions'
import type { AccountMenu } from './definitions'

const Sidebar = () => {
  const currentPage: string = usePathname()

  const checkActiveTab = (menuUrl: string) => {
    if (menuUrl == '/account/orders') {
      return currentPage.includes(menuUrl)
    } else {
      return currentPage == menuUrl
    }
  }

  const renderMenuGroup = (menuGroup: AccountMenu[]) => {
    return (
      <>
        {menuGroup.map((menu: AccountMenu, index: number) => (
          <Link
            key={index}
            href={menu.url}
            className={`flex flex-[1_1_50%] items-center justify-center md:justify-start cursor-pointer hover:outline-none hover:bg-accent focus:text-accent-foreground mb-1.5 lg:mb-0 ${currentPage === menu.url ? 'bg-gallery md:bg-transparent' : 'bg-white'}`}
            target={menu.url === ZALO_URL ? '_blank' : ''}
          >
            <div className='w-8 h-8 lg:w-[59px] lg:h-[59px] flex items-center justify-center'>
              <Image
                alt={menu.label}
                src={menu.icon}
                width={0}
                height={0}
                style={{ width: menu.iconWidth, height: menu.iconHeight }}
              />
            </div>
            <div
              className={`hidden md:block text-xs lg:text-base font-medium ${checkActiveTab(menu.url) ? 'text-primary' : ''} `}
            >
              {menu.label}
            </div>
          </Link>
        ))}
      </>
    )
  }

  return (
    <div className='flex flex-col'>
      <div className='rounded-lg py-1 md:py-5 md:px-0 bg-white mb-1 md:mb-5 font-roboto'>
        {renderMenuGroup(menuGroupA)}
      </div>
      <div className='rounded-lg p-1 md:py-5 md:px-0 bg-white font-roboto'>
        {renderMenuGroup(menuGroupB)}
      </div>
    </div>
  )
}

export default Sidebar

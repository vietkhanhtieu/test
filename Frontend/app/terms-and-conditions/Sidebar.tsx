'use client'

import Spinner from '@/components/ui/spinner'
import { RootState } from '@/lib/redux/store'
import { last } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const { items, fetching } = useSelector((state: RootState) => state.termsAndConditionsMenu)
  const currentPath: string = usePathname()
  const slug = last(currentPath.split('/'))

  return (
    <div className='flex flex-col w-[120px] md:w-[300px]'>
      <div className='rounded-lg bg-white'>
        <div className='flex items-center bg-primary rounded-t-lg p-1 lg:ps-[18px] lg:pt-[12px] lg:pb-[10px]'>
          <Image alt='grid' src='/icons/grid.svg' width={24} height={24} />
          <p className='ms-1 md:ms-[10px] text-14 md:text-[18px] text-white font-bold leading-[21px]'>
            Điều khoản & Chính sách
          </p>
        </div>
        <div className='border border-alto border-t-0 rounded-b-lg'>
          {fetching && (
            <div className='flex items-center justify-center py-4'>
              <Spinner />
            </div>
          )}
          {!fetching &&
            !!items.length &&
            items.map((item, index) => {
              return (
                <Link key={index} href={item.post_name}>
                  <div
                    key={index}
                    className={`p-1.5 md:ps-4 md:py-[14px] font-medium hover:bg-accent cursor-pointer hover:text-primary hover:underline ${index === items.length - 1 && 'rounded-b-lg'} ${slug === item.post_name && 'text-primary underline'}`}
                  >
                    {item.post_title}
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

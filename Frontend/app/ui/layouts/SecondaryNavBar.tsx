'use client'

import { setOpenChatWindow } from '@/lib/redux/slices/floating_chat_widget'
import { RootState } from '@/lib/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import NotificationBell from '../notifications/NotificationBell'
import NotificationModal from '../notifications/NotificationModal'

const scrollToSection = (element_id: string) => {
  const element = document.getElementById(element_id)
  element?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
}

export default function SecondaryNavBar() {
  const { isSignedIn } = useSelector((state: RootState) => state.currentUser)

  const dispatch = useDispatch()

  return (
    <div className='mb-6 hidden justify-between text-sm lg:flex'>
      <div className='flex gap-5'>
        <Link href='/vendor-register'>Kênh người bán</Link>
        <a className='cursor-pointer' onClick={() => scrollToSection('footer')}>
          Tải ứng dụng
        </a>
        <Link className='flex gap-4' href='#'>
          Kết nối
          <Image src='/icons/mini-facebook-logo.svg' alt='Facebook Logo' width={13} height={13} />
          <Image src='/icons/mini-zalo-logo.svg' alt='Zalo Logo' width={13} height={13} />
        </Link>
      </div>
      <div className='flex items-center gap-6'>
        {isSignedIn ? <NotificationModal /> : <NotificationBell />}

        <Link href='#'>
          <Image
            src='/icons/new-page.svg'
            alt='New Page Icon'
            width={14}
            height={14}
            className='mr-1.5 inline-block h-3.5'
          />
          Giới thiệu
        </Link>

        <Link href='/kien-thuc-nganh-duoc'>
          <Image
            src='/icons/knowledge.svg'
            alt='Knowledge Icon'
            width={14}
            height={14}
            className='mr-1.5 inline-block'
          />
          Kiến thức ngành dược
        </Link>

        <Link href='#' onClick={() => dispatch(setOpenChatWindow(true))}>
          <Image
            src='/icons/phone.svg'
            alt='Phone Icon'
            width={14}
            height={14}
            className='mr-1.5 inline-block'
          />
          Liên hệ
        </Link>
      </div>
    </div>
  )
}

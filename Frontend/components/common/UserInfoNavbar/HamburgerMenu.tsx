'use client'

import NotificationBell from '@/app/ui/notifications/NotificationBell'
import NotificationModal from '@/app/ui/notifications/NotificationModal'
import LogoutModal from '@/components/LogoutModal/LogoutModal'
import Spinner from '@/components/ui/spinner'
import { USER_TOKEN_NAME } from '@/lib/constants'
import { logoutUser } from '@/lib/redux/slices/current_user'
import { setCurrentStep } from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import { CartOrange, CartWhite } from '@/public/icons'
import * as HoverCard from '@radix-ui/react-hover-card'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { Amount } from './Amount'
import CartWrapper from './CartWrapper'
import RemoveCartModal from './RemoveCartModel'

const subNavItemMapping = [
  {
    title: 'Đăng nhập',
    href: '/login'
  },
  {
    title: 'Đăng ký',
    href: '/signup'
  },
  {
    title: 'Kênh người bán',
    href: '/vendor-register'
  },
  { title: 'Tải ứng dụng' },
  { title: 'Kết nối' },
  { title: 'Giới thiệu', icon: './icons/new-page.svg' },
  {
    title: 'Kiến thức ngành dược',
    icon: './icons/knowledge.svg',
    href: '/kien-thuc-nganh-duoc'
  },
  { title: 'Liên hệ', icon: './icons/phone.svg' },
  { title: 'Đăng xuất' }
]

export default function HamburgerMenu() {
  const isSignedIn = useSelector((state: RootState) => state.currentUser.isSignedIn)
  const cart = useSelector((state: RootState) => state.userCart)
  const [active, setActive] = useState(false)
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const router = useRouter()
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const handleClick = () => {
    setActive(!active)
    if (!active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const handleClose = () => {
    setActive(false)

    document.body.style.overflow = 'auto'
  }

  const dispatch = useDispatch()

  const handleLogout = async () => {
    deleteCookie(USER_TOKEN_NAME)
    dispatch(logoutUser())
    setOpenLogoutModal(false)
    setActive(false)
    router.push('/')
  }

  const renderCartIcon = () => {
    const amountCartItem = isSignedIn
      ? cart?.total_quantity > 99
        ? '99+'
        : cart?.total_quantity
      : '0'

    const CartLink = () => {
      return (
        <Link
          className='relative'
          href={!isSignedIn ? '/' : '/cart'}
          onClick={() => dispatch(setCurrentStep({ current_step: 1 }))}
        >
          <div className='relative cart-icon-container hover:bg-white w-10 h-10 flex items-center justify-center rounded-3xl'>
            <div
              className={`cart-button-text-container ${cart?.total_quantity > 99 ? 'w-[22px] h-[26px] top-1 right-1' : 'w-4 h-5 top-[5px] right-[5px]'} `}
            >
              <span className='cart-button-text'>{amountCartItem}</span>
            </div>
            <div
              className={`cart-icon-default ${cart?.total_quantity > 99 ? 'bottom-[5px] left-[5px]' : 'bottom-[7px] left-[7px]'}`}
            >
              <Image className='cart-icon' src={CartWhite} alt='Cart Icon' width={19} height={19} />
            </div>
            <div
              className={`cart-icon-default ${cart?.total_quantity > 99 ? 'bottom-[5px] left-[5px]' : 'bottom-[7px] left-[7px]'}`}
            >
              <Image
                className='cart-icon-hover'
                src={CartOrange}
                alt='Cart Icon'
                width={19}
                height={19}
              />
            </div>
          </div>
        </Link>
      )
    }

    return (
      <>
        {isSignedIn ? (
          <>
            <div className='cart-hover'>
              <HoverCard.Root openDelay={0}>
                <HoverCard.Trigger asChild>{CartLink()}</HoverCard.Trigger>
                <HoverCard.Portal container={document.body.getElementsByTagName('header')[0]}>
                  <HoverCard.Content
                    className='cart-content data-[side=bottom]:animate-slideUpAndFade w-[350px] !rounded-xl bg-white data-[state=open]:transition-all pt-[30px]'
                    sideOffset={3}
                  >
                    {cart?.loadingFetch ? (
                      <div className='w-full flex justify-center pb-[30px]'>
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        <CartWrapper
                          setOpenDeleteModal={setOpenDeleteModal}
                          setItemsToDelete={setItemsToDelete}
                        />
                        <Amount />
                        <HoverCard.Arrow className='fill-white !mr-5' />
                      </>
                    )}
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </div>
            <RemoveCartModal
              isOpenModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
              itemsToRemove={itemsToDelete}
            />
          </>
        ) : (
          <CartLink />
        )}
      </>
    )
  }

  return (
    <nav className='sticky top-0 z-10 '>
      <div className='flex gap-5 items-center'>
        {isSignedIn ? <NotificationModal /> : <NotificationBell />}
        {renderCartIcon()}
        <div className='rounded border border-white p-2.5' onClick={handleClick}>
          <Image alt='Hamburger icon' src='/icons/hamburger.svg' width={20} height={20} />
        </div>
      </div>
      {active && (
        <div
          className='fixed left-0 top-0 h-full w-screen'
          style={{ backgroundColor: 'rgba(51,51,51,0.48)' }}
        />
      )}
      <div
        className={`${active ? 'left-0' : '-left-full'} fixed top-0 z-50 h-full w-2/3 overflow-hidden
        bg-header bg-no-repeat transition-all duration-300`}
        style={{ backgroundSize: 'auto 101%' }}
      >
        <div className='p-4 pb-0 text-white'>
          <div className='absolute right-0 top-0 p-4' onClick={handleClose}>
            <Image alt='close icon' src='/icons/close.svg' width={24} height={24} />
          </div>
          <div className='mt-[32px] grid gap-6'>
            {subNavItemMapping.map((sub, index) => {
              if (isSignedIn && ['Đăng nhập', 'Đăng ký'].includes(sub.title)) {
                return null
              }
              if (!isSignedIn && ['Đăng xuất'].includes(sub.title)) {
                return null
              }
              return (
                <Link
                  key={index}
                  href={sub.href || '#'}
                  onClick={sub.title === 'Đăng xuất' ? () => setOpenLogoutModal(true) : handleClose}
                >
                  {!sub.icon ? (
                    sub.title === 'Kết nối' ? (
                      <Link className='flex gap-4' href='#'>
                        Kết nối
                        <Image
                          src='/icons/mini-facebook-logo.svg'
                          alt='Facebook Logo'
                          width={16}
                          height={16}
                        />
                        <Image
                          src='/icons/mini-zalo-logo.svg'
                          alt='Zalo Logo'
                          width={16}
                          height={16}
                        />
                      </Link>
                    ) : (
                      <p className='font-medium'>{sub.title}</p>
                    )
                  ) : (
                    <Link href={sub.href || '#'} className='flex gap-2'>
                      <Image
                        alt='sub icon'
                        src={sub.icon}
                        width={16}
                        height={16}
                        onClick={handleClose}
                      />
                      <p className='font-medium'>{sub.title}</p>
                    </Link>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <LogoutModal isOpen={openLogoutModal} toggleLogoutModal={() => setOpenLogoutModal(false)} />
    </nav>
  )
}

'use client'

import LogoutModal from '@/components/LogoutModal/LogoutModal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import Spinner from '@/components/ui/spinner'
import { USER_TOKEN_NAME } from '@/lib/constants'
import { ZALO_URL } from '@/lib/constants'
import { logoutUser } from '@/lib/redux/slices/current_user'
import {
  setCurrentStep,
  setInvalidLicenses,
  setSelectedProducts,
  setShouldCheckStock
} from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import { CartOrange, CartWhite } from '@/public/icons'
import * as HoverCard from '@radix-ui/react-hover-card'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { Amount } from './Amount'
import CartWrapper from './CartWrapper'
import HamburgerMenu from './HamburgerMenu'
import RemoveCartModal from './RemoveCartModel'
import './styles.css'

export const UserInfoNavbar = () => {
  const { user, isSignedIn } = useSelector((state: RootState) => state.currentUser)
  const { total_quantity, loadingFetch } = useSelector((state: RootState) => state.userCart)
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const dispatch = useDispatch()
  const pathname: string | null = usePathname()
  const router = useRouter()
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const toggleLogoutModal = (value: boolean) => {
    setOpenLogoutModal(value)
  }

  useEffect(() => {
    // Safety Net: if the cookie is no longer present, clear other data on local
    // const userToken = getCookie(USER_TOKEN_NAME)

    // if (!userToken) {
    //   dispatch(logoutUser())
    // }
  }, [])

  const menu = [
    {
      label: 'Thông tin tài khoản',
      action: 'go_to_account',
      icon: '/icons/menu-account-ico.svg',
      iconWidth: '16px',
      iconHeight: '14px'
    },
    {
      label: 'Thông tin doanh nghiệp',
      action: 'go_to_bussiness',
      icon: '/icons/menu-bussiness-ico.svg',
      iconWidth: '26px',
      iconHeight: '13px'
    },
    {
      label: 'Sổ địa chỉ',
      action: 'go_to_address',
      icon: '/icons/menu-address-book-ico.svg',
      iconWidth: '18px',
      iconHeight: '19px'
    },
    {
      label: 'Thông tin xuất hóa đơn',
      action: 'go_to_invoices',
      icon: '/icons/menu-invoices-info-ico.svg',
      iconWidth: '14px',
      iconHeight: '17px'
    },
    {
      label: 'Quản lý đơn hàng',
      action: 'go_to_orders',
      icon: '/icons/menu-orders-ico.svg',
      iconWidth: '14px',
      iconHeight: '17px'
    },
    {
      label: 'Danh sách yêu thích',
      action: 'go_to_favorites',
      icon: '/icons/menu-favorites-ico.svg',
      iconWidth: '17px',
      iconHeight: '14px'
    },
    {
      label: 'Hệ thống voucher',
      action: 'go_to_vouchers',
      icon: '/icons/menu-vouchers-ico.svg',
      iconWidth: '19px',
      iconHeight: '11px'
    },
    {
      label: 'Điều khoản & Chính sách',
      action: 'go_to_terms_and_conditions',
      icon: '/icons/menu-term-and-condition.svg',
      iconWidth: '16px',
      iconHeight: '16px'
    },
    {
      label: 'Trung tâm hỗ trợ',
      action: 'go_to_support',
      icon: '/icons/menu-support-247-ico.svg',
      iconWidth: '19px',
      iconHeight: '14px'
    },
    {
      label: 'Liên hệ hợp tác',
      action: 'go_to_contact',
      icon: '/icons/menu-contact-ico.svg',
      iconWidth: '16px',
      iconHeight: '16px'
    },
    {
      label: 'Đăng xuất',
      action: 'logout',
      icon: '/icons/menu-logout-ico.svg',
      iconWidth: '16px',
      iconHeight: '16px'
    }
  ]

  const handleAction = (action: string) => {
    switch (action) {
      case 'logout':
        toggleLogoutModal(true)
        return
      case 'go_to_account':
        router.push('/account')
        return
      case 'go_to_bussiness':
        router.push('/account/business-information')
        return
      case 'go_to_address':
        router.push('/account/addresses')
        return
      case 'go_to_invoices':
        router.push('/account/tax-information')
        return
      case 'go_to_vouchers':
        router.push('/account/vouchers')
        return
      case 'go_to_orders':
        router.push('/account/orders')
        return
      case 'go_to_contact':
        router.push('/lien-he')
        return
      case 'go_to_favorites':
        router.push('/account/favorites')
        return
      case 'go_to_support':
        window.open(ZALO_URL)
        return
      case 'go_to_terms_and_conditions':
        router.push('/terms-and-conditions')
        return
      default:
        return true
    }
  }

  const handleGoToCartPage = () => {
    // we should refresh all redux data of user-cart on this action
    dispatch(setShouldCheckStock({ shouldCheckStock: false, exceedStockItems: [] }))
    dispatch(setSelectedProducts({ selectedProducts: [] }))
    dispatch(setInvalidLicenses({ invalidLicenses: false }))

    dispatch(setCurrentStep({ current_step: 1 }))
  }

  const CartLink = ({ isHovered }: { isHovered?: boolean }) => {
    const amountCartItem = isSignedIn ? (total_quantity > 99 ? '99+' : total_quantity) : '0'

    return (
      <Link
        className='relative hidden md:block'
        href={!isSignedIn ? '/' : '/cart'}
        onClick={handleGoToCartPage}
      >
        <div
          className={`relative cart-icon-container w-10 h-10 flex items-center justify-center rounded-3xl
        ${isHovered ? 'bg-white [&>.cart-button-text-container]:bg-primary [&>.cart-button-text-container]:text-white [&>.cart-icon-default>.cart-icon-hover]:opacity-100 [&>.cart-icon-default>.cart-icon]:opacity-0' : '[&>.cart-icon-default>.cart-icon]:opacity-100 [&>.cart-icon-default>.cart-icon-hover]:opacity-0'}
`}
        >
          <div
            className={`cart-button-text-container ${total_quantity > 99 ? 'w-[22px] h-[26px] top-1 right-1' : 'w-4 h-5 top-[5px] right-[5px]'} `}
          >
            <span className='cart-button-text'>{amountCartItem}</span>
          </div>
          <div
            className={`cart-icon-default ${total_quantity > 99 ? 'bottom-[5px] left-[5px]' : 'bottom-[7px] left-[7px]'}`}
          >
            <Image className='cart-icon' src={CartWhite} alt='Cart Icon' width={19} height={19} />
          </div>
          <div
            className={`cart-icon-default ${total_quantity > 99 ? 'bottom-[5px] left-[5px]' : 'bottom-[7px] left-[7px]'}`}
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
  const [cartHoverStatus, setCartHoverStatus] = useState<boolean>(false)
  const renderCartIcon = () => {
    return (
      <>
        {isSignedIn ? (
          <div className='cart-hover'>
            <HoverCard.Root openDelay={0} onOpenChange={setCartHoverStatus}>
              <HoverCard.Trigger asChild>
                {CartLink({ isHovered: cartHoverStatus })}
              </HoverCard.Trigger>
              <HoverCard.Portal container={document.body.getElementsByTagName('header')[0]}>
                <HoverCard.Content
                  className='cart-content data-[side=bottom]:animate-slideUpAndFade w-[385px] !rounded-xl bg-white data-[state=open]:transition-all pt-[30px] shadow-lg absolute -right-10 mt-1'
                  sideOffset={3}
                >
                  <div className='cart-chevron-up' />
                  {loadingFetch ? (
                    <div className='w-full flex justify-center pb-[30px]'>
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      <CartWrapper
                        setItemsToDelete={setItemsToDelete}
                        setOpenDeleteModal={setOpenDeleteModal}
                      />
                      <Amount />
                    </>
                  )}
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
            <RemoveCartModal
              isOpenModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
              itemsToRemove={itemsToDelete}
            />
          </div>
        ) : (
          <CartLink />
        )}
      </>
    )
  }

  if (!isSignedIn) {
    return (
      <>
        <div className='hidden items-center justify-end gap-5 font-semibold leading-5 text-white lg:flex lg:min-w-80'>
          {pathname &&
            ['/login', '/signup', '/reset-password', '/change-password'].includes(pathname) && (
              <span className='hidden text-sm font-medium text-white md:block'>
                Bạn cần giúp đỡ?
              </span>
            )}
          <Link href='/signup' className='rounded-lg border-2 border-white px-5 py-2'>
            Đăng ký
          </Link>
          <Link href='/login' className='rounded-lg bg-white px-5 py-2.5 text-primary'>
            Đăng nhập
          </Link>
          {pathname &&
            !['/login', '/signup', '/reset-password'].includes(pathname) &&
            renderCartIcon()}
        </div>
        <div className='lg:hidden'>
          <HamburgerMenu />
        </div>
      </>
    )
  }

  return (
    <>
      <div className='hidden items-center justify-end gap-4 leading-4 text-white lg:flex lg:min-w-60 text-14'>
        <div
          className='max-w-24 flex-shrink overflow-x-clip text-ellipsis whitespace-nowrap'
          id='tooltip-user-navbar'
          data-tooltip-content={user.firstName || user.firstName}
        >
          {user.lastName + ' ' + user.firstName}
        </div>
        <ReactTooltip
          anchorSelect='#tooltip-user-navbar'
          place='bottom'
          content={user.firstName || user.firstName}
          style={{
            backgroundColor: '#4D4D4F',
            fontSize: '14px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '18px',
            paddingBottom: '18px',
            lineHeight: '18px',
            borderRadius: '10px',
            color: '#F3F3FC',
            fontWeight: 400
          }}
        />
        <NavigationMenuPrimitive.Root className='relative'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuPrimitive.Trigger className='group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors pt-0'>
                <Avatar>
                  <AvatarImage
                    src={user.custom_avatar ? user.custom_avatar : 'icons/user-nav.svg'}
                    className={user.custom_avatar && 'h-full object-cover'}
                  />
                  <AvatarFallback>{user.email?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </NavigationMenuPrimitive.Trigger>
              <NavigationMenuContent className='relative z-49 outline-none md:w-full text-abbey'>
                <div className='menu-chevron-up' />
                <div className='pt-3'>
                  <div className='border-b px-4 pt-4 pb-3 text-14 font-medium user-text-info-line-height rounded-t-xl bg-popover'>
                    Tài khoản
                  </div>
                  <NavigationMenuLink className='bg-popover'>
                    {menu &&
                      menu.map((option, index) => {
                        return (
                          <div
                            key={index}
                            className='flex flex-[1_1_50%] cursor-pointer items-center bg-white px-2 font-normal hover:bg-accent hover:outline-none focus:bg-accent focus:text-accent-foreground last:pb-2'
                            onClick={() => handleAction(option['action'])}
                          >
                            <div className='flex h-[41px] w-[43px] items-center justify-center'>
                              <Image
                                alt={option.label}
                                src={option.icon}
                                width={0}
                                height={0}
                                style={{ width: option['iconWidth'], height: option['iconHeight'] }}
                              />
                            </div>
                            <div className='text-14 user-info-text-line-height'>{option.label}</div>
                          </div>
                        )
                      })}
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className='absolute -right-3 top-[39px] z-[50] flex w-[247px]'>
            <NavigationMenuPrimitive.Viewport className='origin-top-center bg-transparent relative mt-0 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90' />
          </div>
        </NavigationMenuPrimitive.Root>

        {renderCartIcon()}
      </div>
      <div className='lg:hidden'>
        <HamburgerMenu />
      </div>
      <LogoutModal isOpen={openLogoutModal} toggleLogoutModal={toggleLogoutModal} />
    </>
  )
}

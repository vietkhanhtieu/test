import { ZALO_URL } from '@/lib/constants'

export interface AccountMenu {
  label: string
  url: string
  icon: string
  iconWidth: string
  iconHeight: string
}

export interface AccountBreadcrumb {
  title: string
  url: string
}

const defaultLinks: AccountBreadcrumb[] = [
  { title: 'Trang chủ', url: '/' },
  { title: 'Tài khoản', url: '/account' }
]

const menuGroupA: AccountMenu[] = [
  {
    label: 'Thông tin tài khoản',
    url: '/account',
    icon: '/icons/menu-account-ico.svg',
    iconWidth: '25px',
    iconHeight: '22px'
  },
  {
    label: 'Thông tin doanh nghiệp',
    url: '/account/business-information',
    icon: '/icons/menu-bussiness-ico.svg',
    iconWidth: '38px',
    iconHeight: '20px'
  },
  {
    label: 'Sổ địa chỉ',
    url: '/account/addresses',
    icon: '/icons/menu-address-book-ico.svg',
    iconWidth: '25px',
    iconHeight: '24px'
  },
  {
    label: 'Thông tin xuất hóa đơn',
    url: '/account/tax-information',
    icon: '/icons/menu-invoices-info-ico.svg',
    iconWidth: '20px',
    iconHeight: '25px'
  }
]

const menuGroupB: AccountMenu[] = [
  {
    label: 'Quản lý đơn hàng',
    url: '/account/orders',
    icon: '/icons/menu-orders-ico.svg',
    iconWidth: '19px',
    iconHeight: '24px'
  },
  {
    label: 'Danh sách yêu thích',
    url: '/account/favorites',
    icon: '/icons/menu-favorites-ico.svg',
    iconWidth: '24px',
    iconHeight: '19px'
  },
  {
    label: 'Hệ thống voucher',
    url: '/account/vouchers',
    icon: '/icons/menu-vouchers-ico.svg',
    iconWidth: '27px',
    iconHeight: '16px'
  },
  {
    label: 'Điều khoản & Chính sách',
    url: '/terms-and-conditions',
    icon: '/icons/menu-term-and-condition.svg',
    iconWidth: '19px',
    iconHeight: '24px'
  },
  {
    label: 'Trung tâm hỗ trợ',
    url: ZALO_URL,
    icon: '/icons/menu-support-247-ico.svg',
    iconWidth: '26px',
    iconHeight: '19px'
  },
  {
    label: 'Liên hệ hợp tác',
    url: '/lien-he',
    icon: '/icons/menu-contact-ico.svg',
    iconWidth: '20px',
    iconHeight: '20px'
  }
]

export { defaultLinks, menuGroupA, menuGroupB }

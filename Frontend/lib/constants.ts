export const BACKEND_ENDPOINT = 'https://alpha.trungtamduocpham.com' as const
export const USER_TOKEN_NAME = 'trungtamduocpham-user-token' as const
export const ZALO_URL = 'https://zalo.me/218261578216458184'
export const HOMEPAGE_QUICK_SEARCH_OPTIONS = [
  { label: 'Tên thương mại', icon: 'icons/attachment.svg', href: '/ten-thuong-mai' },
  { label: 'Hoạt chất', icon: 'icons/flask.svg', href: '/hoat-chat' },
  { label: 'Nhóm điều trị', icon: 'icons/molecule.svg', href: '/nhom-dieu-tri' },
  { label: 'Nhà sản xuất', icon: 'icons/setting.svg', href: '/nha-san-xuat' }
]
export const WHITELIST_PATHS = ['/login', '/signup', '/reset-password', '/change-password']

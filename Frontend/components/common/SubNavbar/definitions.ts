import ActiveElementIcon from '@/components/icons/categoryItem/activeElement.svg'
import ActiveElementHoverIcon from '@/components/icons/categoryItem/activeElementHover.svg'
import GoodPriceIcon from '@/components/icons/categoryItem/goodPrice.gif'
import HeartIcon from '@/components/icons/categoryItem/heart.svg'
import HeartHoverIcon from '@/components/icons/categoryItem/heartHover.svg'
import NewItemIcon from '@/components/icons/categoryItem/new.gif'
import SaleIcon from '@/components/icons/categoryItem/sale.gif'

import styles from './SubNavbar.module.css'

export const subNavItemMapping = [
  {
    title: 'Hoạt chất',
    icon: ActiveElementIcon,
    hoverIcon: ActiveElementHoverIcon,
    className: styles.muted,
    iconClassName: 'w-5',
    url: '/hoat-chat'
  },
  {
    title: 'Yêu thích',
    icon: HeartIcon,
    hoverIcon: HeartHoverIcon,
    className: styles.muted,
    iconClassName: 'w-5',
    url: '/account/favorites'
  },
  {
    title: 'Hàng giá tốt',
    icon: GoodPriceIcon,
    className: styles.primary,
    iconClassName: 'w-[30px] h-[30px] mb-4',
    url: '/hang-gia-tot'
  },
  {
    title: 'Sản phẩm mới',
    icon: NewItemIcon,
    className: styles.primary,
    iconClassName: 'w-[30px] h-[30px] mb-3',
    url: '/san-pham-moi'
  },
  {
    title: 'Siêu khuyến mãi',
    icon: SaleIcon,
    className: styles.primary,
    iconClassName: 'w-[30px] h-[30px] mb-2',
    url: '/sieu-khuyen-mai'
  }
]

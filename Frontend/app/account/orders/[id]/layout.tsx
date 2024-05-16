'use client'

import { setLinks } from '@/lib/redux/slices/breadcrumb'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  readonly children: ReactNode
}

const PageLayout = ({ children }: Props) => {
  const currentPage: string = usePathname()
  const dispatch = useDispatch()
  dispatch(
    setLinks([
      { title: 'Trang chủ', url: '/' },
      { title: 'Tài khoản', url: '/account' },
      { title: 'Quản lý đơn hàng', url: '/account/orders' },
      { title: currentPage.split('/').pop(), url: currentPage }
    ])
  )

  return children
}

export default PageLayout

'use client'

import { Breadcrumb } from '@/app/ui'
import { RootState } from '@/lib/redux/store'
import { ITermsAndConditions } from '@/lib/types/terms_and_conditions'
import { last } from 'lodash'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

interface PageBreadcrumb {
  title: string
  url: string
}

const defaultLinks: PageBreadcrumb[] = [
  { title: 'Trang chủ', url: '/' },
  { title: 'Tài khoản của tôi / Điều khoản & Chính sách', url: '/term-and-conditions' }
]

const PageBreadcrumb = () => {
  const currentPage: string = usePathname()
  const slug = last(currentPage.split('/'))
  const { items } = useSelector((state: RootState) => state.termsAndConditionsMenu)
  const menuGroup = items.map((i: ITermsAndConditions) => {
    return { label: i.post_title, url: i.post_name }
  })
  const activeMenu = menuGroup.find((menu) => menu.url === slug)

  const links: PageBreadcrumb[] = activeMenu
    ? [...defaultLinks, { title: activeMenu.label, url: activeMenu.url }]
    : defaultLinks

  return <Breadcrumb links={links} />
}

export default PageBreadcrumb

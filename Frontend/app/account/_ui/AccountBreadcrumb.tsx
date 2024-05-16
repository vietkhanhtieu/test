'use client'

import { Breadcrumb } from '@/app/ui'
import { RootState } from '@/lib/redux/store'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

import { defaultLinks, menuGroupA, menuGroupB } from './definitions'
import type { AccountBreadcrumb, AccountMenu } from './definitions'

const AccountBreadcrumb = () => {
  const currentPage: string = usePathname()
  const menuGroup: AccountMenu[] = menuGroupA.concat(menuGroupB)
  const activeMenu: AccountMenu | undefined = menuGroup.find((menu) => menu.url === currentPage)

  const breadcrumbLinks = useSelector((state: RootState) => state.breadcrumb.links)

  const links: AccountBreadcrumb[] = activeMenu
    ? [...defaultLinks, { title: activeMenu.label, url: activeMenu.url }]
    : breadcrumbLinks.length
      ? breadcrumbLinks
      : defaultLinks

  return <Breadcrumb links={links} />
}

export default AccountBreadcrumb

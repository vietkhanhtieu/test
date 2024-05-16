import { Metadata } from 'next'

import Account from './_ui/Account'

export const metadata: Metadata = {
  title: 'Gonsa - Thông tin tài khoản',
  description: 'Gonsa - Thông tin tài khoản'
}

const Page = () => {
  return <Account />
}

export default Page

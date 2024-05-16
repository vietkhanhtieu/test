import { Metadata } from 'next'

import Orders from './Orders'

export const metadata: Metadata = {
  title: 'Gonsa - Quản lý đơn hàng',
  description: 'Gonsa - Quản lý đơn hàng'
}

const Page = () => {
  return (
    <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-auto bg-transparent'>
      <Orders />
    </div>
  )
}

export default Page

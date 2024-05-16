import { _fetch } from '@/app/actions'
import { Metadata } from 'next'

import HeaderTab from '../_ui/HeaderTab'
import Details from './Details'

export const metadata: Metadata = {
  title: 'Gonsa - Quản lý chi tiết đơn hàng',
  description: 'Gonsa - Quản lý chi tiết đơn hàng'
}

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id

  const response = await _fetch('/wp-json/order-management/get', 'POST', {
    order_id: id
  })

  const data = response.data
  const moreData = response.moreData

  return (
    <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-auto'>
      <Details id={id} order={data} />
    </div>
  )
}

export default Page

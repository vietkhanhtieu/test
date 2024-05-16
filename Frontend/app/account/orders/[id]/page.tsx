import { _fetch } from '@/app/actions'
import { Metadata } from 'next'

import DetailsLeftCol from './_ui/DetailsLeftCol'
import DetailsRightCol from './_ui/DetailsRightCol'
import Header from './_ui/Header'
import Products from './_ui/Products'
import Status from './_ui/Status'
import TotalAmount from './_ui/TotalAmount'

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
    <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-auto bg-white'>
      <Header orderId={id} status={data.status} />
      <Status data={data} moreData={moreData} />

      <div className='flex flex-col md:flex-row border-t border-b border-alto'>
        <DetailsLeftCol data={data} />
        <DetailsRightCol data={data} moreData={moreData} />
      </div>

      <Products data={data} />
      <TotalAmount data={moreData} />
    </div>
  )
}

export default Page

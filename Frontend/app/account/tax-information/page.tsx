import { Metadata } from 'next'

import TaxInformation from './TaxInformation'

export const metadata: Metadata = {
  title: 'Gonsa - Thông tin xuất hoá đơn',
  description: 'Gonsa - Thông tin xuất hoá đơn'
}

const Page = () => {
  return (
    <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-max bg-white'>
      <div className='px-2 lg:px-[30px] py-6 flex items-end justify-between border-b text-abbey'>
        <div className='text-20 leading-6 font-medium l'>Thông tin xuất hóa đơn</div>
      </div>
      <TaxInformation />
    </div>
  )
}

export default Page

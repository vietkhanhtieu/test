import { Metadata } from 'next'

import AddressInfo from './AddressInfo'

export const metadata: Metadata = {
  title: 'Gonsa - Thông tin sổ địa chỉ',
  description: 'Gonsa - Thông tin sổ địa chỉ'
}

const Page = () => {
  return (
    <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-auto bg-white'>
      <AddressInfo />
    </div>
  )
}

export default Page

import { Metadata } from 'next'

import { Favorite } from './Favorite'

export const metadata: Metadata = {
  title: 'Gonsa - Danh sách yêu thích',
  description: 'Gonsa - Danh sách yêu thích'
}

const Page = () => {
  return (
    <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-auto bg-white'>
      <Favorite />
    </div>
  )
}

export default Page

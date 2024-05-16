import { BellIcon } from '@/public/notifications'
import Image from 'next/image'

const Empty = () => {
  return (
    <div className='flex flex-col gap-5 py-8'>
      <div className='max-w-[147px] m-auto'>
        <Image src={BellIcon} alt='Bell' width={60} className='mx-auto mb-1.5' />
        <p className='text-12'>Bạn chưa có thông báo nào</p>
      </div>
    </div>
  )
}

export default Empty

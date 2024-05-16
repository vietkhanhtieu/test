import { BellIcon } from '@/public/icons'
import Image from 'next/image'

const NotificationBell = () => {
  return (
    <div className='flex gap-1.5 items-center'>
      <Image src={BellIcon} alt='Bell' width={14} height={14} />
      <span className='hidden lg:inline'>Thông báo</span>
    </div>
  )
}

export default NotificationBell

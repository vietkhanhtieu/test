import { ArrowBack } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'

import { statusMapping } from '../../definitions'

interface Props {
  orderId: string
  status: string
}

const Header = (props: Props) => {
  const { orderId, status } = props

  return (
    <div className='flex justify-between p-2.5 sm:py-[25px] sm:px-[30px] border-b border-alto leading-[19px] font-medium'>
      <Link
        href='/account/orders'
        className='flex items-center gap-2.5 min-w-20 text-nevada cursor-pointer'
      >
        <Image src={ArrowBack} alt='back icon' width={12} height={10} />
        Trở lại
      </Link>

      <div>
        ĐƠN HÀNG: <span className='mr-2.5 font-normal'>{orderId}</span>
        <span className='mr-2.5 text-primary'>|</span>
        <span className='text-primary uppercase'>{statusMapping[status]}</span>
      </div>
    </div>
  )
}

export default Header

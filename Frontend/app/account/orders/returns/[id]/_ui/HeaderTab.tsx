import { RootState } from '@/lib/redux/store'
import { ArrowBack } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

interface Props {
  showStatus?: boolean
  orderId: string
}

const Header = (props: Props) => {
  const { orderId, showStatus } = props
  const { status } = useSelector((state: RootState) => state.refundOrders)

  return (
    <div className='flex justify-between p-2.5 sm:py-[26px] sm:px-10 border-b border-alto leading-[19px] font-medium'>
      <Link
        href='/account/orders'
        className='flex items-center gap-2.5 min-w-20 text-nevada cursor-pointer'
      >
        <Image src={ArrowBack} alt='back icon' width={12} height={10} />
        Trở lại
      </Link>

      <div>
        Mã đơn hàng: <span className={`${showStatus && 'mr-5'} font-normal`}>{orderId}</span>
        {showStatus && (
          <>
            <span className='mr-5 text-primary'>|</span>
            <span className='text-primary uppercase'>
              {status == 1 ? 'YÊU CẦU ĐỔI HÀNG' : status == 2 ? 'YÊU CẦU TRẢ HÀNG' : ''}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default Header

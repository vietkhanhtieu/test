import { cn, copy } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  couponCode: string
  buttonText: string | undefined
}

const CouponCta = (props: Props) => {
  const { couponCode, buttonText } = props
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleClick = () => {
    if (buttonText === 'Sao chép') {
      copy(couponCode)
      setIsCopied(true)
    }
  }

  return (
    <div className={cn('ml-auto', isCopied && 'dy-tooltip dy-tooltip-top')} data-tip='Đã sao chép'>
      <button
        className='dy-btn dy-btn-primary copy-btn min-w-20 h-auto min-h-0 py-[1px] px-2.5 rounded-md text-12 font-medium leading-[14px]'
        onClick={handleClick}
      >
        {buttonText || 'Dùng ngay'}
      </button>
    </div>
  )
}

export default CouponCta

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface QuickSearchOptionProps {
  label: string
  icon: string
  iconWidth: number
  iconHeight: number
  additionalClasses: string
  href: string
  handleOnClick: () => void
}

export const QuickSearchOption: React.FC<QuickSearchOptionProps> = ({
  label,
  icon,
  iconWidth,
  iconHeight,
  additionalClasses,
  href,
  handleOnClick
}) => {
  return (
    <Link href={href} onClick={handleOnClick} className='w-full'>
      <div
        className={cn(
          additionalClasses,
          'quick-search bg-white border border-gray-10 rounded-[10px]'
        )}
      >
        <div className='flex items-center justify-center h-full'>
          <div className='text-center'>
            <div className='mb-2.5'>
              <Image
                className='inline-block'
                alt='quicksearch-ico'
                src={icon}
                width={iconWidth}
                height={iconHeight}
              />
            </div>
            <h5>{label}</h5>
          </div>
        </div>
      </div>
    </Link>
  )
}

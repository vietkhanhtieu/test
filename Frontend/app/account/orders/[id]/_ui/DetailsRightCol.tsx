import { cn } from '@/lib/utils'
import { ArrowUpIcon, DeliveringIcon, DotIcon, GonsaLogo } from '@/public/orders'
import { orderBy } from 'lodash'
import moment from 'moment'
import Image from 'next/image'

import { progressMapping } from '../../definitions'

interface Props {
  data: any
  moreData: any
}

const DetailsRightCol = (props: Props) => {
  const { data, moreData } = props

  let deliveryProgress = Object.keys(data.delivery_progress).map((k) => {
    return { ...data.delivery_progress[k], key: k }
  })

  deliveryProgress = orderBy(
    deliveryProgress,
    (item: any) => {
      return moment(item.date, 'DD/MM/YYYY hh:mm:ss')
    },
    ['desc']
  )

  const lastProgress = deliveryProgress[deliveryProgress.length - 1]

  return (
    <div className='md:flex-[1_1_580px] pt-[30px] pr-5 pl-5'>
      <h6 className='mb-2.5 font-bold leading-[19px]'>Hình thức vận chuyển</h6>
      <span className='mb-0.5 text-primary text-14'>{data.form_of_transportation}</span>
      <div className='flex gap-[15px] items-center mb-7'>
        <Image src={DeliveringIcon} alt='Delivering' width={28} height={18} />
        <p>
          Dịch vụ được cung cấp bởi:&nbsp;<b className='uppercase'>GONSA</b>
        </p>
        <Image src={GonsaLogo} alt='Gonsa logo' width={40} height={30} />
      </div>

      <h6 className='mb-2.5 font-bold leading-[19px]'>Phương thức thanh toán</h6>
      <div className='mb-[25px] text-primary text-14'>{moreData.payment_method}</div>

      <h6 className='mb-2.5 font-bold leading-[19px]'>Tiến trình giao hàng</h6>

      <div className='relative flex flex-col gap-5 pl-[5px]'>
        <div className='absolute w-0.5 h-full bg-order-progress-line'></div>
        {deliveryProgress.slice(0, -1).map((progress, index) => (
          <>
            <div
              key={index}
              className={cn(
                'relative grid grid-cols-[80px_1fr] lg:grid-cols-[130px_1fr] gap-5 items-center pl-5 text-14 leading-4',
                index === deliveryProgress.length - 2 && 'mb-5 lg:mb-2.5'
              )}
            >
              <Image
                src={DotIcon}
                alt='Dot'
                width={8}
                height={8}
                className='absolute top-1/2 translate-y-[-50%] ml-[-3px]'
              />
              <span className='min-w-20 text-14 leading-4'>
                {moment(progress.date, 'DD/MM/YYYY hh:mm:ss').format('hh:mm - DD/MM/YYYY')}
              </span>
              <span
                className={`${index === 0 ? 'font-medium text-abbey' : ' text-gray-40'} text-14 leading-[16px] max-w-[350px]`}
              >
                {progressMapping[progress.key.toLowerCase()]}
              </span>
            </div>
          </>
        ))}
      </div>

      <div className='relative grid grid-cols-[80px_1fr] lg:grid-cols-[130px_1fr] gap-5 items-center pl-[25px] mb-[37px] lg:mt-2.5 text-14 leading-4'>
        <Image
          src={ArrowUpIcon}
          alt='Arrow up'
          width={12}
          height={22}
          className='absolute top-1/2 translate-y-[-50%] h-[22px] object-cover'
        />
        <span className='min-w-20 text-14 leading-4'>
          {moment(lastProgress.date, 'DD/MM/YYYY hh:mm:ss').format('hh:mm - DD/MM/YYYY')}
        </span>
        <span className='text-gray-40 text-14 leading-[16px] max-w-[350px]'>
          {progressMapping[lastProgress.key.toLowerCase()]}
        </span>
      </div>
    </div>
  )
}

export default DetailsRightCol

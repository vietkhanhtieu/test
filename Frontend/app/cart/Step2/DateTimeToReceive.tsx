import { DateTimePicker } from '@/components/common/DateTimePicker'
import { DatePickerIcon } from '@/public/icons'
import moment from 'moment'
import Image from 'next/image'

interface Props {
  setReceivingTime: (e: string) => void
}
export const DateTimeToReceive = (props: Props) => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return (
    <>
      <div className='w-full bg-white rounded-[10px] px-[30px] py-[15px] font-normal text-abbey'>
        <p className='text-20 font-medium mb-2.5'>
          {' '}
          Ngày, giờ mong muốn nhận hàng <span className='font-normal'>(Tùy chọn)</span>{' '}
        </p>
        <div className='flex items-center'>
          <Image className='mr-[7px]' alt='Delivery' src={DatePickerIcon} width={19} height={21} />
          <DateTimePicker
            dateSelected={(date: any) =>
              date ? props.setReceivingTime(moment(date).format('YYYY-MM-DD')) : ''
            }
            selectTime={true}
            defaultDate={null}
            minDate={tomorrow}
          />
        </div>
      </div>
    </>
  )
}

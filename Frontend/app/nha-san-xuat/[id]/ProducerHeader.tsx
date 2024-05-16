import Image from 'next/image'

import { IProducerDetail } from './page'

interface Props {
  producer: IProducerDetail
}

export const ProducerHeader: React.FC<Props> = ({ producer }) => {
  return (
    <div className='container mt-5'>
      <div className='w-full h-[155px] py-9 pl-[56px] pr-[35px] flex items-start bg-white rounded-t-xl gap-[44px]'>
        {producer.icon && (
          <Image
            alt=''
            height={82.5}
            width={82.5}
            src={producer.icon}
            className='rounded-full border-2 border-primary w-[82.5px] h-[82.5px] object-cover'
          />
        )}
        <div className='flex flex-col gap-[7px] '>
          <span className='text-[28px] font-bold'>{producer.name}</span>
          <span className='font-medium'>Tổng số sản phẩm: {producer.totalProduct}</span>
        </div>
      </div>
    </div>
  )
}

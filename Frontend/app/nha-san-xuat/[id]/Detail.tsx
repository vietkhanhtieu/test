import { NoteIcon } from '@/public/icons'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { IProducerDetail } from './page'

interface Props {
  producer: IProducerDetail
  hasInfo: boolean
}

export const Detail: React.FC<Props> = ({ producer, hasInfo }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isClickShowMore, setIsClickShow] = useState<boolean>(false)
  const informationDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = informationDivRef.current
    if (element) {
      setIsExpanded(!(element.offsetHeight > 300))
    }
  }, [])

  const handleToggle = (show: boolean) => {
    setIsExpanded(!isExpanded)
    setIsClickShow(show)
  }

  return (
    <div className='container'>
      {hasInfo ? (
        <div className='w-full bg-white pt-[49px] pb-[52px] pl-[47px] pr-[54px] flex flex-col gap-5 rounded-b-xl relative'>
          <span className='text-20 font-medium text-primary'>{producer.title}</span>
          <div
            ref={informationDivRef}
            className={`w-full ${isExpanded ? '' : 'overflow-hidden h-[256px]'} relative`}
          >
            <div dangerouslySetInnerHTML={{ __html: producer.description }}></div>
            {!isExpanded && (
              <div
                className={`absolute bottom-0 left-0 w-full h-6 bg-gradient-to-br from-transparent to-white`}
              ></div>
            )}
          </div>
          {!isExpanded && (
            <div
              onClick={() => handleToggle(true)}
              className='text-dodger-blue h-[33px] left-0 right-0 mx-auto z-10 font-normal flex items-bottom justify-center items-end cursor-pointer mt-[17px]'
            >
              Xem thêm
            </div>
          )}
          {isExpanded && isClickShowMore && (
            <div
              onClick={() => handleToggle(false)}
              className='text-dodger-blue h-[33px] left-0 right-0 mx-auto z-10 font-normal flex items-bottom justify-center items-end cursor-pointer mt-[17px]'
            >
              Thu gọn
            </div>
          )}
        </div>
      ) : (
        <div className='w-full h-[322px] px-[483px] pt-20 pb-[130px] border rounded-b-xl bg-white'>
          <div className='flex flex-col items-center gap-5'>
            <Image alt='' height={65} width={65} src={NoteIcon} />
            <span>Thông tin đang được cập nhật</span>
          </div>
        </div>
      )}
    </div>
  )
}

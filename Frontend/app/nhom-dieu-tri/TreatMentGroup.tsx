import { setTreatmentItem } from '@/lib/redux/slices/treatment_item'
import { NormalizeVietnameseText } from '@/lib/utils'
import { EtcIcon } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { ITreatmentItem } from './page'

interface Props {
  groupName: string
  items: ITreatmentItem[]
}

export const TreatmentGroup: React.FC<Props> = ({ groupName, items }) => {
  const dispatch = useDispatch()

  const handleClickItem = (item: ITreatmentItem) => {
    dispatch(setTreatmentItem({ name: item.name, icon: item.icon }))
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='w-full h-10 flex items-center gap-[27.5px] mb-[21px]'>
        <span className='text-[28px] font-bold'>{groupName}</span>
        <div className='h-[1px] bg-gainsboro-solid flex-1 w-4' />
      </div>
      <div className='flex flex-wrap items-center gap-5'>
        {items &&
          items.map((item, index) => {
            return (
              <Link key={index} href={`/nhom-dieu-tri/${NormalizeVietnameseText(item.name)}`}>
                <div
                  className='treatment-item w-[180px] h-[185px] px-2.5 py-[47px] flex flex-col justify-center items-center bg-white rounded-[20px] hover:border border-primary cursor-pointer'
                  onClick={() => handleClickItem(item)}
                >
                  <div className='w-[160px] flex flex-col gap-[17px] items-center'>
                    <Image src={item.icon ? item.icon : EtcIcon} height={34} width={34} alt='alt' />
                    <div className='flex flex-col items-center w-full'>
                      <span
                        className='font-bold text-center w-full truncate'
                        id={`tooltip-treatment-name-${item.groupSlug}-${index}`}
                      >
                        {item.name}
                      </span>
                      <span className='text-12'>+{item.products.length} sản phẩm</span>
                    </div>
                  </div>
                  <ReactTooltip
                    anchorSelect={`#tooltip-treatment-name-${item.groupSlug}-${index}`}
                    place='bottom'
                    content={item.name}
                    offset={1}
                    style={{
                      width: '180px',
                      fontSize: '14px',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      color: 'white',
                      textAlign: 'center',
                      minHeight: '64px',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    }}
                  />
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

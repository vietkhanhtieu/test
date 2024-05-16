import { setTreatmentItem } from '@/lib/redux/slices/treatment_item'
import { NormalizeVietnameseText } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

export interface ICategory {
  termId: number
  title: string
  slug: string
  children: any[]
}

interface Props {
  items: ICategory
}

export const ListCategory: React.FC<Props> = ({ items }) => {
  const dispatch = useDispatch()

  const handleClickItem = (item: any) => {
    dispatch(setTreatmentItem({ name: NormalizeVietnameseText(item.title), icon: item.icon }))
  }

  return (
    <div className='w-full flex flex-wrap md:justify-center lg:justify-start justify-between items-between gap-5'>
      {items &&
        items.children.map((item, index) => {
          return (
            <Link
              href={`/nhom-dieu-tri/${NormalizeVietnameseText(item.title)}`}
              className='sm:w-[270px] w-full'
              key={index}
            >
              <div
                className='sm:w-[270px] w-full h-20 flex justify-center items-center rounded-[10px] border cursor-pointer'
                onClick={() => handleClickItem(item)}
              >
                <div className='h-20 w-20 px-[23px] py-[15px] flex items-center justify-center'>
                  {item.icon && <Image height={33.5} width={33.5} alt='' src={item.icon} />}
                </div>
                <div className='w-[190px] h-[61px] pr-[14px] py-[9.5px] flex items-center'>
                  <span className='text-14 font-medium leading-5'>
                    {NormalizeVietnameseText(item.title)}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
    </div>
  )
}

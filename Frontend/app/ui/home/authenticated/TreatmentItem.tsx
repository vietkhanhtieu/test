import { RootState } from '@/lib/redux/store'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import { ICategory, ListCategory } from './ListCategory'

interface Props {
  title: string
  imageUrl: string
  description: string
  slug: string
}

export const TreatmentItem: React.FC<Props> = ({ title, imageUrl, description, slug }) => {
  const categories = useSelector((state: RootState) => state.productCategories.categories)
  const list: ICategory[] = categories.filter((category: ICategory) => category.slug === slug)

  return (
    <div className='home__section'>
      <div className='w-full bg-white py-5 px-[21px] flex flex-col gap-10 rounded-[10px]'>
        <div className='w-full flex-1 flex md:flex-row flex-col gap-2.5'>
          <div className='flex flex-col gap-[5px] items-start'>
            <span className='text-24 font-bold'>{title}</span>
            <span className='text-14 leading-4'>{description}</span>
          </div>
          <Image
            height={68}
            width={560}
            alt=''
            src={imageUrl}
            className='md:max-w-[560px] w-full rounded-[10px] object-cover'
          />
        </div>
        <ListCategory items={list[0]} />
      </div>
    </div>
  )
}

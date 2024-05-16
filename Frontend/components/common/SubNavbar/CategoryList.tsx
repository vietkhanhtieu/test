import Loading from '@/app/ui/daisy/Loading'
import { RootState } from '@/lib/redux/store'
import { NormalizeVietnameseText, cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './SubNavbar.module.css'

const CategoryList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const productCategories = useSelector((state: RootState) => state.productCategories.categories)

  return (
    <>
      {productCategories.length ? (
        <>
          <div className={cn(styles.categoryList, 'h-[100vh], z-20')}>
            {productCategories &&
              productCategories.map(({ title, icon }, idx) => (
                <Fragment key={title}>
                  <div
                    className={`${styles.categoryItem} ${idx === activeIndex ? styles.active : null} rounded-bl-md rounded-tl-md`}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <Image
                      alt={title}
                      src={icon}
                      className={`${styles.categoryItemIcon} text-16 w-[27px] h-[27px]`}
                      width={27}
                      height={27}
                    />
                    <div className={`${styles.categoryItemText} text-[1rem] `}>
                      {NormalizeVietnameseText(title)}
                    </div>
                  </div>
                  <div
                    className='w-[calc(100% - 20px)] mx-3 my-0 border-b font-semibold'
                    style={{ borderColor: 'hsl(var(--muted))' }}
                  ></div>
                </Fragment>
              ))}
          </div>
          <div className={`${styles.subcategoryList} h-[400px] overflow-y-auto rounded-sm`}>
            <div className='mx-2 my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from(productCategories[activeIndex || 0]['children']).map((child: any) => (
                <div key={child.title} className='flex w-full'>
                  <Link
                    href={`/ket-qua-tim-kiem/${child.slug}`}
                    className='grid h-20 w-full grid-cols-4 gap-1 rounded-md bg-white px-4 py-2 text-black hover:border hover:border-primary'
                  >
                    <div className='col-span-1 flex h-auto items-center justify-center'>
                      {/* eslint-disable @next/next/no-img-element */}
                      <img
                        src={child.icon}
                        alt=''
                        className={cn(styles.subCategoryItemIcon, 'm-1', 'w-[34px] h-[34px]')}
                      />
                    </div>
                    <div className='col-span-3 flex h-auto items-center justify-start'>
                      <span className={`ml-2 ${styles.subCategoryItemText} text-left text-sm`}>
                        {NormalizeVietnameseText(child.title)}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center'>
          <Loading />
        </div>
      )}
    </>
  )
}

export default CategoryList

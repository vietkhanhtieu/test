import { formatVND } from '@/lib/utils'
import { groupBy } from 'lodash'
import Image from 'next/image'

interface Props {
  data: any
}

const Products = (props: Props) => {
  const { data } = props
  const groups = groupBy(data.product, 'supplier.name')

  return (
    <div className='w-full'>
      {Object.keys(groups).map((group: any, index: number) => {
        return (
          <>
            <div
              key={index}
              className='w-full px-[21px] py-[15px] flex items-center border-b border-gainsboro/[.89] cursor-pointer'
            >
              <Image src='/icons/house.svg' width={14} height={13} alt='supplier' />
              <div className='font-medium text-14 ms-1.5 me-8'>{group as string}</div>
              <Image src='/icons/chevron-right-gray.svg' width={6} height={11} alt='supplier' />
            </div>
            {groups[group].map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className='w-full px-[31px] py-4 lg:gap-[520px] md:gap-[100px] gap-2.5 flex items-start justify-between border-b border-gainsboro/[.89]'
                >
                  <div className='flex flex-col items-start'>
                    <span className='overflow-hidden text-ellipsis font-bold'>
                      {item.product_name}
                    </span>
                    <span className='text-12'>{item.dvt_co_so}</span>
                  </div>
                  <div className='flex flex-col items-end gap-[3px]'>
                    <span className='text-14 font-bold text-primary'>
                      {item.sale_price != 0 ? formatVND(item.sale_price) : formatVND(item.price)}
                    </span>
                    {item.sale_price != 0 && (
                      <p className='text-10 line-through'>{formatVND(item.price)}</p>
                    )}
                    <span className='text-10'>x {item.quantity || 0}</span>
                  </div>
                </div>
              )
            })}
          </>
        )
      })}
    </div>
  )
}

export default Products

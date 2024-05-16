import { formatVND } from '@/lib/utils'
import moment from 'moment'

export interface ProductDetailsProps {
  name: string
  unitType: string // Đơn vị tính
  expireDate: string
  salePrice: number
  regularPrice: number
  quantity: number
}
export const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  unitType,
  expireDate,
  salePrice,
  regularPrice,
  quantity
}) => {
  return (
    <div className='mb-[5px] pb-2.5 border-b border-mourn-mountain-snow'>
      <div className='flex justify-between'>
        <div>
          <p className='font-semibold text-16 leading-[19px] mb-3'>{name}</p>
          <p className='font-normal text-12 leading-[14px]'>
            <span className='mr-[7px]'>{unitType}</span>
            {expireDate && (
              <>
                <span className='mr-[7px]'>|</span>
                <span>{`HSD: ${moment(expireDate, 'DDMMYYYY').format('DD/MM/YYYY')}`}</span>
              </>
            )}
          </p>
        </div>
        <div className='flex flex-col'>
          {salePrice && salePrice > 0 ? (
            <>
              <span className='mb-0.5 font-bold text-14 leading-4 text-right'>
                {formatVND(salePrice)}
              </span>
              <span className='text-12 leading-[14px] text-right line-through'>
                {formatVND(regularPrice)}
              </span>
            </>
          ) : (
            <span className='mb-0.5 font-bold text-14 leading-4 text-right'>
              {formatVND(regularPrice)}
            </span>
          )}

          <span className='text-12 leading-[14px] text-right'>x {quantity}</span>
        </div>
      </div>
    </div>
  )
}

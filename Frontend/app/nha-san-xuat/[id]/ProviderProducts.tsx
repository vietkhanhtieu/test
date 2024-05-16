import TableProduct, { IProductListProps } from '@/app/ui/TableProduct'
import { NoProductIcon } from '@/public/icons/index'
import Image from 'next/image'

interface Props {
  producerProducts: IProductListProps[]
}

export const ProviderProducts: React.FC<Props> = ({ producerProducts }) => {
  return (
    <>
      {producerProducts.length > 0 ? (
        <div className='mt-[26px] container px-5'>
          <TableProduct
            canActionSearch={false}
            canActionProduct={false}
            productLists={producerProducts}
          />
        </div>
      ) : (
        <>
          <div className='flex justify-center mt-[81px]'>
            <div className='w-[219px] gap-5 flex flex-col justify-center items-center'>
              <Image
                className='!w-[52px] !h-[50px]'
                alt=''
                src={NoProductIcon}
                width={52}
                height={50}
              />
              <p className='mt-[25px] text-center text-16'>Sản phẩm đang được cập nhật</p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

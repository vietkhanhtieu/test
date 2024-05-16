import GoodPriceIcon from '@/components/icons/categoryItem/goodPrice.gif'
import newProductIcon from '@/components/icons/categoryItem/new_pproduct.gif'
import SaleIcon from '@/components/icons/categoryItem/sale.gif'
import Image from 'next/image'
import Link from 'next/link'

const SuperDiscount = () => {
  return (
    <div className='home__section my-[70px]'>
      <div className='container rounded-[20px] p-[36px_69px_50px_43px] bg-super-discount bg-[length:100%_100%]'>
        <p className='leading-[38px] mb-2 text-[32px] font-bold text-white'>
          Ưu đãi dành cho bạn hôm nay
        </p>
        <p className='text-[18px] text-white leading-[21px]'>
          Sản phẩm mới, Siêu khuyến mãi, Hàng giá tốt và nhiều ưu đãi khác dành cho khách hàng hàng
          thân thiết.
          <br />
          Hãy nhấp vào nút “Xem thêm” để khám phá nhiều điều hấp dẫn...
        </p>
        <div className='ml-[26px] mt-[37px] grid lg:grid-cols-3 grid-cols-1 lg:gap-[72px] gap-[29px]'>
          <div className='min-h-[100px] bg-white rounded-[15px] px-[22px] flex items-center'>
            <Image
              className='mb-[16px]'
              alt='Hàng giá tốt'
              src={GoodPriceIcon}
              width={50}
              height={50}
            />
            <div className='ml-5'>
              <p className='text-22 font-semibold'>Hàng giá tốt</p>
              <Link href='/hang-gia-tot'>
                <span className='text-16 leading-[19px] text-primary mr-2.5'>Xem thêm</span>
                <Image
                  className='inline-block h-[9px]'
                  alt='chevron-right'
                  src={'/icons/right-arrow-orange.svg'}
                  width={5}
                  height={9}
                />
              </Link>
            </div>
          </div>
          <div className='min-h-[100px] bg-white rounded-[15px] px-[22px] flex items-center'>
            <Image
              className='mb-[16px]'
              alt='Sản phẩm mới'
              src={newProductIcon}
              width={50}
              height={50}
            />
            <div className='ml-5'>
              <p className='text-22 font-semibold'>Sản phẩm mới</p>
              <Link href='/san-pham-moi'>
                <span className='text-16 leading-[19px] text-primary mr-2.5'>Xem thêm</span>
                <Image
                  className='inline-block h-[9px]'
                  alt='chevron-right'
                  src={'/icons/right-arrow-orange.svg'}
                  width={5}
                  height={9}
                />
              </Link>
            </div>
          </div>
          <div className='min-h-[100px] bg-white rounded-[15px] px-[22px] flex items-center'>
            <Image alt='Siêu khuyến mãi' src={SaleIcon} width={50} height={50} />
            <div className='ml-5'>
              <p className='text-22 font-semibold'>Siêu khuyến mãi</p>
              <Link href='/sieu-khuyen-mai'>
                <span className='text-16 leading-[19px] text-primary mr-2.5'>Xem thêm</span>
                <Image
                  className='inline-block h-[9px]'
                  alt='chevron-right'
                  src={'/icons/right-arrow-orange.svg'}
                  width={5}
                  height={9}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperDiscount

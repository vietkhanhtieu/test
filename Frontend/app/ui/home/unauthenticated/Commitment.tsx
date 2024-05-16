import { ClaimA, ClaimB, ClaimC } from '@/public/icons'
import Image from 'next/image'

const Commitment = () => {
  return (
    <div className='home__section'>
      <div className='home__wrapper pt-[27px]'>
        <h2 className='mb-[52px] text-[32px] font-semibold leading-[38px] text-center'>
          Trung tâm dược phẩm cam kết
        </h2>

        <div className='border-t border-alto rounded-[10px]'>
          <ul className='grid grid-cols-1 md:grid-cols-3 gap-10 xl:block max-w-[328px] md:max-w-none p-[37px_30px_56px] xl:p-[37px_62px_56px] m-auto text-14 font-medium leading-4'>
            <li className='inline-flex items-center justify-center gap-5 xl:mr-[108px]'>
              <div className='min-w-[61px] md:min-w-0'>
                <Image alt='Genuine' src={ClaimA} width={39} height={48} />
              </div>
              <div>
                <p className='mb-[5px] text-[20px] leading-[23px]'>Sản phẩm chính hãng 100%</p>
                <p>Tư vấn miễn phí, tận tình, chu đáo</p>
              </div>
            </li>
            <li className='inline-flex items-center justify-center gap-5 xl:mr-[108px]'>
              <div className='min-w-[61px] md:min-w-0'>
                <Image alt='Quality' src={ClaimB} width={42} height={45} />
              </div>
              <div>
                <p className='mb-[5px] text-[20px] leading-[23px]'>Chất lượng đảm bảo</p>
                <p>Từ nhà máy, nhà phân phối uy tín</p>
              </div>
            </li>
            <li className='inline-flex items-center justify-center gap-5'>
              <Image alt='Delivery' src={ClaimC} width={61} height={40} />
              <div>
                <p className='mb-[5px] text-[20px] leading-[23px]'>Giao hàng toàn quốc</p>
                <p>Dịch vụ vận chuyển toàn quốc</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Commitment

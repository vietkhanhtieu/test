import { QuickSearchOption } from '@/app/tim-kiem-nhanh/QuickSearchOption'
import { Button } from '@/components/ui/button'
import { HOMEPAGE_QUICK_SEARCH_OPTIONS } from '@/lib/constants'
import { MenuOrdersIcon } from '@/public/icons'
import Image from 'next/image'

const QuickSearch = () => {
  return (
    <div className='container mt-[70px]'>
      <div className='mb-[21px]'>
        <h3 className='font-bold text-24 leading-7'> Tìm kiếm nhanh theo... </h3>
      </div>
      <div className='flex flex-col justify-between lg:flex-row'>
        <div className='flex flex-wrap md:flex-nowrap justify-center mb-5 lg:mb-0 lg:justify-between lg:mr-0 xl:mr-[58px]'>
          {HOMEPAGE_QUICK_SEARCH_OPTIONS.map((option: Record<string, any>, idx: number) => (
            <div key={idx} className='w-6/12 flex items-center justify-center p-2 md:p-0 md:w-auto'>
              <QuickSearchOption
                label={option.label}
                icon={option.icon}
                iconWidth={50}
                iconHeight={50}
                additionalClasses='w-full h-40 md:h-[123px] md:w-[170px] lg:w-40 xl:w-[170px] mr-0 ml-0 md:ml-2 md:mr-2 lg:ml-0 lg:mr-2 xl:mr-[17px]'
                href={option.href}
                handleOnClick={() => {}}
              />
            </div>
          ))}
        </div>
        <div className=''>
          <div className='border border-gray-10 bg-white rounded-[10px] pl-[46px] pr-2 py-10 lg:py-4'>
            <div className='flex'>
              <div className='mr-[30px]'>
                <div className=' min-w-[29px]'>
                  <Image width={29} height={35} src={MenuOrdersIcon} alt={''} />
                </div>
              </div>
              <div>
                <h5 className='font-medium text-18 leading-[21px] mb-[5px]'> Đề xuất sản phẩm </h5>
                <p className='text-12 leading-[14px] text-thunder mb-2'>
                  {' '}
                  Bạn chưa tìm thấy sản phẩm đáp ứng nhu cầu.Điền form để được hỗ trợ sớm nhất..{' '}
                </p>
                <Button
                  className='w-[135px] h-[26px] rounded-[32px] pt-2.5 px-6 pb-[9px] bg-primary font-bold text-12 leading-[14px] text-white text-center'
                  onClick={() => {}}
                >
                  Form đề xuất
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickSearch

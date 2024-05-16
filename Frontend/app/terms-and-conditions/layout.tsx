import { Label } from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { ReactNode } from 'react'

import Partners from '../ui/home/Partners'
import MenuContent from './MenuContent'
import PageBreadcrumb from './PageBreadcrumb'
import Sidebar from './Sidebar'

interface Props {
  readonly children: ReactNode
}

const GUANRANTEE_LIST = [
  {
    title: 'Sản phẩm chính hãng 100%',
    description: 'Tư vấn miễn phí, tận tình, chu đáo',
    icon: '/icons/menu-invoices-info-ico.svg',
    iconWidth: 39,
    iconHeight: 48
  },
  {
    title: 'Chất lượng đảm bảo',
    description: 'Từ nhà máy, nhà phân phối uy tín',
    icon: '/icons/reputable.svg',
    iconWidth: 42,
    iconHeight: 45
  },
  {
    title: 'Giao hàng toàn quốc',
    description: 'Dịch vụ vận chuyển toàn quốc',
    icon: '/icons/shipping-orange.svg',
    iconWidth: 61,
    iconHeight: 40
  }
]

const TermAndConditionsLayout = ({ children }: Props) => {
  return (
    <div className='min-h-[60vh] bg-white'>
      <PageBreadcrumb />

      <div className='container px-1 md:px-[1.25rem] mt-[50px]'>
        <div className='pb-4'>
          <div className='flex md:gap-10 gap-1'>
            <Sidebar />
            <div className={`w-full rounded-lg md:max-w-[840px]`}>
              <MenuContent />
              {children}
            </div>
          </div>
          <div className='border border-alto rounded-lg pt-[27px] mt-[102px] mx-auto max-w-[500px] lg:w-full lg:max-w-full mb-[50px]'>
            <p className='text-center text-[32px] font-bold leading-[39px] mb-[50px]'>
              Trung tâm dược phẩm cam kết
            </p>
            <div className='border-t border-alto rounded-lg md:px-[70px] px-[20px]'>
              <div className='flex flex-col lg:flex-row lg:items-center py-[37px]'>
                {GUANRANTEE_LIST.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='flex items-center h-[67px] py-[10px] border-0 lg:border-r border-alto last:border-0 px-0 lg:first:pe-[48px] lg:first:ps-0 lg:last:pe-0 lg:last:ps-[48px] lg:px-[48px]'
                    >
                      <Image
                        src={item.icon}
                        width={item.iconWidth}
                        height={item.iconHeight}
                        alt={item.title}
                      />
                      <div className='text-left ms-5'>
                        <p className='text-20 font-medium leading-[23px] mb-[5px]'>{item.title}</p>
                        <p className='text-14 font-medium leading-[16px]'>{item.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <Partners />
        </div>
      </div>
    </div>
  )
}

export default TermAndConditionsLayout

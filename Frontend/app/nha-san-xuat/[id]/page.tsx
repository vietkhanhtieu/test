'use client'

import { Breadcrumb } from '@/app/ui'
import { PromotionCarousel } from '@/app/ui'
import PageNotFound from '@/app/ui/PageNotFound'
import Spinner from '@/components/ui/spinner'

import { useGetProducerDetail } from '../producerFeature'
import { Detail } from './Detail'
import { ProducerHeader } from './ProducerHeader'
import { ProviderProducts } from './ProviderProducts'

interface ProducerPrams {
  id: string
}

export interface IProducerDetail {
  id: string
  name: string
  icon: string
  title: string
  description: string
  link: string
  totalProduct: number
}

export default function NhaSanXuat({ params }: { params: ProducerPrams }) {
  const {
    activeTab,
    setActiveTab,
    isLoading,
    producerProducts,
    producerDetail,
    hasInfo,
    isNotFound
  } = useGetProducerDetail(parseInt(params.id))

  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Nhà sản xuất', url: '/nha-san-xuat' },
          { title: producerDetail.name, url: 'javascript:void(0)' },
          { title: activeTab == 1 ? 'Giới thiệu' : 'Sản phẩm', url: 'javascript:void(0)' }
        ]}
      />

      {isLoading ? (
        <div className='flex items-center justify-center my-8'>
          <Spinner size='md' />
        </div>
      ) : (
        <>
          {isNotFound ? (
            <PageNotFound />
          ) : (
            <>
              <ProducerHeader producer={producerDetail} />
              <div className='container'>
                <div className='w-full h-[56px] py-[10.5px] pl-[30px] bg-brilliance flex'>
                  <div
                    className={`${activeTab === 1 ? 'bg-primary text-white' : 'text-dusty-gray'} font-medium w-[159px] h-[35px] rounded-[50px] flex justify-center items-center cursor-pointer`}
                    onClick={() => setActiveTab(1)}
                  >
                    Giới thiệu
                  </div>
                  <div
                    className={`${activeTab === 2 ? 'bg-primary text-white' : 'text-dusty-gray'} font-medium w-[162px] h-[35px] rounded-[50px] flex justify-center items-center cursor-pointer`}
                    onClick={() => setActiveTab(2)}
                  >
                    Sản Phẩm
                  </div>
                </div>
              </div>
              {activeTab === 1 && <Detail producer={producerDetail} hasInfo={hasInfo} />}
              {activeTab === 2 && <ProviderProducts producerProducts={producerProducts} />}
            </>
          )}
          <div className='container'>
            <PromotionCarousel />
          </div>
        </>
      )}
    </>
  )
}

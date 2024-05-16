'use client'

import Spinner from '@/components/ui/spinner'
import { SearchIcon } from '@/public/icons'
import { NoImageIcon, NoItemsIcon, SettingIcon } from '@/public/icons/index'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Breadcrumb } from '../ui'
import { useGetListProducers } from './producerFeature'

export interface IProducerData {
  tenNhaSanXuat: string
  maNhaSanXuat: string | null
  maTermEc: number
  urlNSX: string
  bound: string[]
}

const Producers = () => {
  const router = useRouter()

  const { activeTab, setActiveTab, isLoading, setTerm, filteredProducers } = useGetListProducers()

  const [selectedProducer, setSelectedProducer] = useState<number | null>(null)

  useEffect(() => {
    if (selectedProducer) {
      router.push(`/nha-san-xuat/${selectedProducer}`)
    }
  }, [selectedProducer])

  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Nhà sản xuất', url: '/nha-san-xuat' }
        ]}
      />
      <div className='container'>
        <div className='my-6 w-full rounded-[10px] bg-white flex flex-col gap-2.5 '>
          <h3 className='my-6 ml-2.5 md:ml-[30px] text-20 leading-[23px] font-medium flex gap-[12px] items-center'>
            <Image alt='Nhà sản xuất' src={SettingIcon} width={25} height={25} />
            Nhà sản xuất
          </h3>
          <div className='flex justify-center p-2.5 md:px-0 mb-[30px] border-t border-b border-lighthouse bg-brilliance text-14'>
            <div role='tablist' className='dy-tabs dy-tabs-boxed p-0 bg-transparent '>
              <a
                role='tab'
                className={`dy-tab ${activeTab === 1 && 'dy-tab-active !text-white font-medium'} h-auto min-h-[35px] md:px-[29px] leading-4 !rounded-[50px]`}
                onClick={() => setActiveTab(1)}
              >
                Nhà sản xuất trong nước
              </a>
              <a
                role='tab'
                className={`dy-tab ${activeTab === 2 && 'dy-tab-active !text-white font-medium'} h-auto min-h-[35px] md:px-[29px] leading-4 !rounded-[50px]`}
                onClick={() => setActiveTab(2)}
              >
                Nhà sản xuất nước ngoài
              </a>
            </div>
          </div>
          <div className='mt-[25px] mx-2.5 md:mx-4 mb-[30px]'>
            <label className='dy-input flex items-center gap-[19px] max-w-[539px] md:p-[12px_90px_9px_88px] border-0 rounded-full mx-auto bg-snowflake text-14 leading-4'>
              <Image src={SearchIcon} alt='Search icon' width={14} height={14} />
              <input
                type='text'
                placeholder='Tìm kiếm theo tên nhà sản xuất'
                className='w-full placeholder:text-gray-40'
                onChange={(e) => setTerm(e.target.value)}
              />
            </label>
            {isLoading ? (
              <div className='flex items-center justify-center my-8'>
                <Spinner size='md' />
              </div>
            ) : (
              <>
                {filteredProducers && filteredProducers.length > 0 ? (
                  <div className='grid lg:grid-cols-3 grid-cols-2 gap-4 mt-[10px] cursor-pointer'>
                    {filteredProducers.map((value: IProducerData, index: number) => (
                      <Link
                        href={`/nha-san-xuat/${value.maTermEc}`}
                        key={index}
                        className='rounded-md p-[10px_18px_10px_10px] bg-brilliance border border-lighthouse h-[120px]'
                      >
                        <div className='grid grid-cols-2 gap-[19px] h-full'>
                          <div className='flex items-center justify-center w-[150px] bg-white'>
                            {value.urlNSX?.length > 0 ? (
                              <Image
                                className='!h-[66px]'
                                alt={value.tenNhaSanXuat}
                                src={value.urlNSX}
                                width={132}
                                height={66}
                              />
                            ) : (
                              <Image
                                className='!h-[66px]'
                                alt=''
                                src={NoImageIcon}
                                width={132}
                                height={66}
                              />
                            )}
                          </div>
                          <div className='flex items-center text-16 font-semibold'>
                            {value.tenNhaSanXuat}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className='flex justify-center mt-[81px]'>
                    <div className='w-[214px] gap-5 flex-col flex justify-center items-center'>
                      <Image
                        className='!w-[52px] !h-[50px]'
                        alt=''
                        src={NoItemsIcon}
                        width={52}
                        height={50}
                      />
                      <p className='mt-[25px] text-center text-16'>Thông tin đang được cập nhật</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Producers

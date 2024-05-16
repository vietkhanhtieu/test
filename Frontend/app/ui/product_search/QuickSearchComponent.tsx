'use client'

import { SelectComponent } from '@/components/common/Select/SelectComponent'
import Spinner from '@/components/ui/spinner'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IQuickSearchProduct {
  page: string
}

interface IActiveElementItem {
  maHoatChat: string
  tenHoatChat: string
}

interface ICommerceItem {
  id: string
  name: string
}
export default function QuickSearchComponent(props: IQuickSearchProduct) {
  const router = useRouter()

  const { page } = props
  const [fetchingData, setFetchingData] = useState<boolean>(false)
  const [searchActiveElementItems, setSearchActiveElementItems] = useState<IActiveElementItem[]>([])
  const [searchCommerceItems, setSearchCommerceItems] = useState<ICommerceItem[]>([])

  const [selectedSearchAlphabet, setSelectSearchAlphabet] = useState<string | null>(null)

  useEffect(() => {
    const fetchSearchTypeData = async () => {
      setFetchingData(true)

      const requestPath =
        page === 'active-element' ? 'wp-json/get/active-element-new' : 'wp-json/get/commerce-new'

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${requestPath}`)
        if (response.data.message === 'Successfully') {
          page === 'active-element'
            ? setSearchActiveElementItems(response.data.data)
            : setSearchCommerceItems(response.data.data)
        }
      } catch (error) {
        console.error(error)
      }

      setFetchingData(false)
    }

    fetchSearchTypeData()
  }, [])

  const renderItems = (filterAlphabet: string | null) => {
    let arrItems: (IActiveElementItem | ICommerceItem)[] = searchCommerceItems
    let labelKey = 'name'
    let path = '/products/'

    if (page === 'active-element') {
      arrItems = searchActiveElementItems
      labelKey = 'tenHoatChat'
      path = '/hoat-chat/'
    }

    if (filterAlphabet) {
      arrItems = arrItems.filter((item: any) => {
        return item[labelKey].startsWith(filterAlphabet)
      })
    }

    return (
      <>
        {arrItems.length > 0 &&
          arrItems.map((item: any) => {
            return (
              <>
                <Link
                  href={`${path}${page === 'active-element' ? item.tenHoatChat : item.id}`}
                  className='dy-btn shadow-none h-auto min-h-0 text-abbey bg-white w-full rounded-md font-normal text-14 p-[9px_25px_9px_20px] justify-start'
                >
                  <div className='leading-[22px] text-left flex justify-start items-center'>
                    {item[labelKey]}
                  </div>
                </Link>
              </>
            )
          })}
      </>
    )
  }

  const generateAlphabetOptions = () => {
    const alphabetOption = []

    // 65 - 90 <=> from A - Z
    for (let i = 65; i <= 90; i++) {
      alphabetOption.push({ value: String.fromCharCode(i), label: String.fromCharCode(i) })
    }
    return alphabetOption
  }

  const onChangeSearchAlphabet = (data: any) => {
    setSelectSearchAlphabet(selectedSearchAlphabet === data.value ? null : data.value)
  }

  return (
    <>
      <div className='container'>
        <div className='flex my-6 flex-col gap-[33px]'>
          <div className='grid w-full grid-cols-3 gap-[29px]'>
            <div className='col-span-2 max-w-[778px]'>
              <div className='w-full rounded-[10px] bg-white flex px-7 flex-col gap-2.5 py-[31px] max-h-[156px]'>
                <p className='text-24 font-medium w-full'>Bảng chữ cái</p>
                <SelectComponent
                  classNames={{
                    control:
                      'w-full flex items-center py-[15px] pr-3.5 pl-5 !rounded-xl border !border-alto !h-[56px]',
                    menuList: '!text-left border !p-[15px_5px_15px_10px] !rounded-md !h-[473px]',
                    valueContainer: '!text-left !text-16 ',
                    singleValue: '!me-0 !hover:text-primary !text-[#FF6B00] !text-16 !font-medium ',
                    option: '!text-20 !font-medium',
                    optionSelected: '!bg-primary !text-white rounded-[5px]'
                  }}
                  options={generateAlphabetOptions()}
                  isSearchable={false}
                  value={selectedSearchAlphabet}
                  placeholder='Tìm kiếm theo ký tự bảng chữ cái A-Z'
                  handleOnChange={onChangeSearchAlphabet}
                  inPage={'quick_search_product'}
                />
              </div>
            </div>
            <div className='flex items-center'>
              <Image src='/banner-quick-search.png' alt='' width={374} height={156} />
            </div>
          </div>
          {fetchingData ? (
            <div className='flex items-center justify-center my-8'>
              <Spinner size='md' />
            </div>
          ) : (
            <div className='grid w-full grid-cols-3 gap-x-[29px] gap-y-2.5'>
              {searchActiveElementItems.length > 0 || searchCommerceItems.length > 0
                ? renderItems(selectedSearchAlphabet)
                : null}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

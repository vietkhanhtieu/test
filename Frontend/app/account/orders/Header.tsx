'use client'

import { ZALO_URL } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react'

interface Props {
  currentTab?: string
  moreData?: any
  searchValue: string
  fetching?: boolean
  handleSearchOrders: () => void
  setSearchValue: (arg: string) => void
  setCurrentTab: (arg: string) => void
  hiddenMoreData?: boolean
  forMyOrder?: boolean
  hideSearch?: boolean
  title?: string
  containerClassName?: string
}

const Header: React.FC<Props> = ({
  currentTab,
  moreData,
  searchValue,
  fetching,
  setSearchValue,
  setCurrentTab,
  handleSearchOrders,
  hiddenMoreData,
  forMyOrder,
  hideSearch,
  title,
  containerClassName
}) => {
  const [expandSearch, setExpandSearch] = useState(false)
  const [isInsideSearchArea, setIsInsideSearchArea] = useState(false)

  const STATUS = [
    { label: 'Tất cả', value: '' },
    { label: 'Chưa thanh toán', value: 'payment' },
    { label: 'Chờ xác nhận', value: 'waiting' },
    { label: 'Chờ lấy hàng', value: 'confirm' },
    { label: 'Đang giao', value: 'shipping' },
    { label: 'Đã giao', value: 'complete' },
    { label: 'Đã huỷ', value: 'cancel' },
    { label: 'Đổi/Trả hàng', value: 'return' }
  ]

  const handleExpandSearch = () => {
    if (!expandSearch) {
      setExpandSearch(true)
    }
    document.getElementById('searchOrderInput')?.focus()
  }

  const handleOnBlurSearch = () => {
    if (expandSearch && !isInsideSearchArea && !searchValue) {
      setExpandSearch(false)
    }
  }

  const handleOnMouseLeave = () => {
    setIsInsideSearchArea(false)
  }

  const handleOnMouseEnter = () => {
    setIsInsideSearchArea(true)
  }

  useEffect(() => {
    if (expandSearch) {
      document.getElementById('searchOrderInput')?.focus()
    }
  }, [expandSearch])

  const handleOnChange = (e: { target: HTMLInputElement }) => {
    const tartget = e.target as HTMLInputElement
    setSearchValue(tartget.value)
  }

  const handleOnKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      handleSearchOrders()
    }
  }

  function useClickOutside(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        const ele = document.getElementById('searchOrderInput') as HTMLInputElement
        if (ref.current && !ref.current.contains(event.target) && !ele?.value) {
          setExpandSearch(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  function useHorizontalScroll(elRef: any) {
    useEffect(() => {
      const el = elRef.current
      if (el) {
        const onWheel = (e: { deltaY: number; preventDefault: () => void }) => {
          if (e.deltaY == 0) return
          e.preventDefault()
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: 'smooth'
          })
        }
        el.addEventListener('wheel', onWheel)
        return () => el.removeEventListener('wheel', onWheel)
      }
    }, [elRef])
  }

  const searchInputContainerRef = useRef(null)
  const elRef = useRef(null)

  useClickOutside(searchInputContainerRef)
  useHorizontalScroll(elRef)
  const headerTitle = title || 'Quản lý đơn hàng'

  return (
    <div className='w-full bg-white rounded-t-[10px]'>
      <div
        className={`flex flex-col md:flex-row items-center justify-between w-full px-[30px] py-[17px] ${containerClassName}`}
      >
        <label
          className={`${forMyOrder ? 'text-24' : 'text-20'} text-20 font-medium leading-[23px] mb-2 md:mb-0`}
        >
          {headerTitle}
        </label>
        <div className='flex items-center'>
          <Link href={ZALO_URL} target='_blank'>
            <button className='w-[60px] h-9 border border-primary rounded-[10px] flex justify-center items-center hover:opacity-85'>
              <Image alt='chat-ico' src='/icons/chat.svg' width={19} height={18} />
            </button>
          </Link>
          {!hideSearch && (
            <div
              ref={searchInputContainerRef}
              className={`${expandSearch ? 'w-[200px] lg:w-[361px]' : 'w-[60px]'} transition-[width] duration-300 h-9 py-2 px-[17px] flex flex-1 items-center justify-between border border-primary rounded-[10px] flex justify-center items-center hover:opacity-85 cursor-pointer ms-[15px]`}
              onClick={handleExpandSearch}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            >
              <input
                id='searchOrderInput'
                value={searchValue}
                onChange={handleOnChange}
                placeholder='Tìm kiếm theo mã đơn hàng, tên sản phẩm'
                className={`${expandSearch ? 'block' : 'hidden'} text-abbey border-none text-14 w-full rounded-[10px] h-[34px] py-[10px]`}
                type='text'
                disabled={fetching}
                onKeyUp={(e) => handleOnKeyUp(e)}
                onBlur={handleOnBlurSearch}
              />
              <Image
                alt='chat-ico'
                src='/icons/search-ico-orange.svg'
                width={24}
                height={24}
                onClick={handleSearchOrders}
              />
            </div>
          )}
        </div>
      </div>
      {!hiddenMoreData && moreData && (
        <div ref={elRef} className='flex items-center max-w-[880px] overflow-x-auto tabs-bar'>
          {STATUS.map((status, index) => {
            return (
              <div
                key={index}
                className={`dy-tab flex-[0_0_auto] min-w-[99px] ${index !== STATUS.length - 1 ? 'lg:px-[17px]' : 'lg:px-[30px]'} px-[2px] h-[unset] py-[14px] text-14 leading-[16px] font-medium text-gray-40 whitespace-nowrap ${currentTab == status.value && 'border-b-2 border-primary text-primary'}`}
                onClick={() => setCurrentTab(status.value)}
              >
                <span>
                  {status.label}
                  {!Number.isNaN(parseInt(moreData[status.value])) && (
                    <span className='ms-[5px] text-primary'>
                      {'('}
                      {moreData[status.value]}
                      {')'}
                    </span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Header

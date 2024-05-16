'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import Button from './Button'
import styles from './page.module.css'

interface ButtonData {
  id: number
  label: string
  key: keyof IProductData
}

export interface IProductData {
  name: string
  hoatChat: string
  description: string
  congDung: string
  lieuDung: string
  tuongTacThuoc: string
  baoQuan: string
  tacDungPhu: string
}

export default function ProductInfo(props: any) {
  const { data } = props

  const [selectedBtn, setSelectedBtn] = useState(1)
  const [isExpanded, setIsExpanded] = useState(true)
  const informationDivRef = useRef<HTMLDivElement>(null)
  const [isScreenPhone, setIsScreenPhone] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsScreenPhone(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const element = informationDivRef.current
    if (element) {
      setIsExpanded(!(element.offsetHeight > 750))
    }
  }, [])

  const buttonData: ButtonData[] = [
    { id: 1, label: 'Thông tin chung', key: 'description' },
    { id: 2, label: 'Thành phần', key: 'hoatChat' },
    { id: 3, label: 'Chỉ định', key: 'congDung' },
    { id: 4, label: 'Liều lượng - Cách dùng', key: 'lieuDung' },
    { id: 5, label: 'Tương tác', key: 'tuongTacThuoc' },
    { id: 6, label: 'Bảo quản', key: 'baoQuan' },
    { id: 7, label: 'Khuyến cáo', key: 'tacDungPhu' }
  ]

  const handleBtnClick = (id: number) => {
    setSelectedBtn(id)
    setIsExpanded(true)
    if (informationDivRef.current) {
      const buttonIndex = buttonData.findIndex((button) => button.id === id)
      if (buttonIndex !== -1) {
        const targetElement = document.getElementById(`product-info-${id}`)
        const yOffset = -128
        if (targetElement) {
          const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }
    }
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='bg-white mt-8 px-0 rounded-lg'>
      <div className='flex w-full'>
        {!isScreenPhone ? (
          <>
            <div className='sm:max-w-[210px] lg:max-w-[246px] max-h-[430px] w-full'>
              <div className='flex flex-col h-[55px] m-4 w-full'>
                {buttonData.map((button, index) => (
                  <button
                    key={button.id}
                    className={`flex items-center pl-[19px] py-[17px] ${selectedBtn === button.id ? 'bg-[#EEF0F3] font-semibold' : 'bg-white font-normal'} text-abbey text-lg text-left rounded-[10px] h-[55px] hover:cursor-pointer hover:font-semibold ${index !== buttonData.length - 1 ? 'border-b border-[#EEF0F3]' : ''}`}
                    onClick={() => handleBtnClick(button.id)}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
            <div
              ref={informationDivRef}
              className={`test flex-1 py-0 px-2 my-4 ml-[51px] mr-6 min-h-[750px] ${isExpanded ? 'h-full' : 'h-[750px]'} overflow-hidden relative`}
            >
              <h3 className='text-xl font-semibold border-b border-[#EEF0F3] pb-2.5'>
                {data ? data.name : ''}
              </h3>
              <div
                className={`pt-2.5 max-w-[826px] ${isExpanded ? '' : ' overflow-hidden max-h-[659px]'}`}
              >
                {buttonData.map((button) => (
                  <div
                    key={button.id}
                    id={`product-info-${button.id}`}
                    data-button-id={button.id}
                    dangerouslySetInnerHTML={{ __html: data ? data[button.key] : '' }}
                  />
                ))}
              </div>
              {!isExpanded && (
                <div
                  className={`absolute bottom-0 left-0 w-full h-[40rem] bg-gradient-to-b ${styles.productGradient}`}
                ></div>
              )}
              {!isExpanded && (
                <button
                  onClick={handleToggleExpand}
                  className='text-[#3478F5] no-underline absolute bottom-5 left-0 right-0 mx-auto z-10 font-normal flex items-center justify-center h-[52px] py-[12px]'
                >
                  Mở rộng
                  <Image
                    src='/icons/vector.svg'
                    alt='biểu tượng'
                    className='ml-2'
                    width={11}
                    height={7}
                  />
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className='w-full'>
              <h3 className='text-xl text-center font-semibold border-b border-[#EEF0F3] p-4'>
                {data ? data.name : ''}
              </h3>
              <div className='flex flex-col h-full w-full p-4'>
                {buttonData.map((button, index) => (
                  <Button
                    key={button.id}
                    label={button.label}
                    value={data[buttonData[index].key] || ''}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

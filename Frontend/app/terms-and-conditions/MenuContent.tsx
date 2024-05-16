'use client'

import ChevronRight from '@/public/icons/svg_components/ChevronRight'
import Image from 'next/image'
import { MouseEventHandler, useState } from 'react'
import { Collapse } from 'react-collapse'

interface IMenu {
  label: string
  children: IMenu[]
  isParent?: boolean
}

const MENU = [
  { label: 'I. Nguyên tắc chung', children: [], isParent: true },
  { label: 'II. Quy định chung', children: [], isParent: true },
  {
    label: 'III. Quy trình giao dịch',
    isParent: true,
    children: [
      { label: '1. Quy trình dành cho Người mua', children: [] },
      { label: '2. Quy trình dành cho Người bán', children: [] },
      { label: '3. Quy trình dành Xác nhận/ Huỷ đơn hàng', children: [] },
      { label: '4. Quy trình Đổi trả/ Hoàn tiền', children: [] }
    ]
  },
  {
    label: 'IV. Chính sách Bảo vệ thông tin cá nhân của người tiêu dùng',
    children: [],
    isParent: true
  },
  {
    label:
      'X. Quyền và trách nhiệm của các bên tham gia Website cung cấp dịch vụ thương mại điện tử Trungtamduocpham.com',
    children: [],
    isParent: true
  }
]

const MenuContent = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }

  const handleToggelMenuItem = (label: string) => {
    const idx = expandedItems.findIndex((i) => i === label)
    if (idx !== -1) {
      // collapse item
      setExpandedItems(expandedItems.filter((i) => i !== label))
    } else {
      // expand item
      setExpandedItems([...expandedItems, label])
    }
  }

  const renderSubMenu = (subMenu: IMenu) => {
    return (
      <>
        {subMenu.children && !!subMenu.children.length ? (
          <>
            <div
              className='text-14 leading-[30px] flex items-center mb-[10px] cursor-pointer'
              onClick={() => handleToggelMenuItem(subMenu.label)}
            >
              <div className='w-[10px] flex items-center justify-between'>
                {expandedItems.includes(subMenu.label) ? (
                  <Image
                    src={`/icons/chevron-down-gray.svg`}
                    width={10}
                    height={5}
                    alt='chevron-down'
                  />
                ) : (
                  <ChevronRight />
                )}
              </div>
              <span className={`ms-[10px] ${subMenu.isParent ? 'font-medium' : ''}`}>
                {subMenu.label}
              </span>
            </div>
            <Collapse isOpened={expandedItems.includes(subMenu.label)}>
              {subMenu.children.map((child, index) => {
                return renderSubMenu(child)
              })}
            </Collapse>
          </>
        ) : (
          <div
            className={`ms-5 flex items-center mb-[10px] text-14 leading-[30px] ${subMenu.isParent ? 'font-medium' : ''}`}
          >
            {subMenu.label}
          </div>
        )}
      </>
    )
  }

  return (
    <div className='bg-lighthouse px-[21px] py-[11px] rounded-lg'>
      <div
        onClick={handleOpenMenu}
        className='w-full flex items-center justify-between cursor-pointer'
      >
        <div className='flex items-center'>
          <Image
            src='/icons/list.svg'
            width={24}
            height={24}
            alt='list-icon'
            className='me-[10px]'
          />
          <p className='text-18 leading-[21px] font-bold'>Mục lục nội dung</p>
        </div>
        {openMenu ? (
          <Image src={`/icons/chevron-down-gray.svg`} width={12} height={6} alt='chevron-down' />
        ) : (
          <ChevronRight />
        )}
      </div>
      <Collapse isOpened={openMenu}>
        <div className='mt-5'>
          {MENU.map((subMenu, index) => {
            return renderSubMenu(subMenu)
          })}
        </div>
      </Collapse>
    </div>
  )
}

export default MenuContent

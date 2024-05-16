import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import { cn } from '@/lib/utils'
import { SearchIcon } from '@/public/icons'
import _ from 'lodash'
import Image from 'next/image'
import { useState } from 'react'

import type { ICheckboxOption } from './definitions'
import './style.css'
import useDropdown from './useDropdown'

interface Props {
  type: string
  defaultOptions?: ICheckboxOption[] | undefined
}

const ProductDropdown = (props: Props) => {
  const { type, defaultOptions } = props
  const { options, onChangeCheckbox, onClickResetFilter, sort } = useDropdown(type, defaultOptions)
  const [term, setTerm] = useState<string>('')
  const [sortActive, setSortActive] = useState<'asc' | 'desc' | null>(null)

  const filteredOptions = options.filter(({ label }) =>
    label.toLowerCase().includes(term.toLowerCase())
  )

  const handleClickSort = (type: string, order: 'asc' | 'desc' | null) => {
    sort(type, order)
    setSortActive(order)
  }

  const checkedOptions = options.filter((option) => option.checked)

  return (
    <ul
      tabIndex={0}
      className='dy-dropdown-content min-w-[240px] z-[1] menu shadow bg-base-100 rounded-box border border-primary overflow-hidden p-0 text-abbey'
    >
      <div className='pt-[15px] pb-[13px]'>
        <div className='px-[12px]'>
          <label className='dy-input flex items-center justify-between gap-2 w-full h-auto p-[8px_15px_8px_10px] border-alto focus:border-alto focus-within:alto rounded mb-3.5 text-12 leading-[14px]'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='text-12 font-normal placeholder:text-silver-sand placeholder:text-12 placeholder:font-normal'
              onChange={(e) => setTerm(e.target.value)}
            />
            <Image alt='Search icon' src={SearchIcon} width={14} height={14} />
          </label>
        </div>
        <div className='options-wrapper flex flex-col max-h-[315px] px-4 overflow-y-auto'>
          {filteredOptions.map((option, index) => (
            <div key={index} className='flex justify-between'>
              <label
                key={index}
                className='flex gap-0.5 items-center min-h-[35px] font-normal pr-[30px]'
              >
                <CustomCheckbox
                  label={option.label}
                  name={option.id}
                  id={option.id}
                  handleOnChange={onChangeCheckbox}
                  checked={option.checked}
                  labelClassName={`ml-0.5 text-abbey !text-12 leading-[14px] hover:text-primary vertical-truncate ${option.checked && 'text-primary'}`}
                />
              </label>

              {option.icon && <Image alt='' src={option.icon} width={25} height={25} />}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`flex justify-between font-normal p-[19px_21px_14px_19px] border-t border-gray-10 text-gray-40 text-12 leading-[14px] ${checkedOptions.length > 0 ? 'text-primary' : ''}`}
      >
        <div className='cursor-pointer hover:text-primary'>Chọn ({checkedOptions.length})</div>

        <div
          role='button'
          className={`cursor-pointer hover:text-primary ${checkedOptions.length > 0 ? 'text-primary' : ''}`}
          onClick={onClickResetFilter}
        >
          Bỏ chọn
        </div>
      </div>

      <div
        className={cn(
          'bg-mercury py-[13px] border-b border-silver-sand leading-[14px] cursor-pointer hover:text-primary',
          sortActive === 'asc' ? 'text-primary' : ''
        )}
        onClick={() => handleClickSort(type, 'asc')}
      >
        Sắp xếp từ A đến Z
      </div>

      <div
        className={cn(
          'bg-mercury py-[13px] border-b border-silver-sand leading-[14px] cursor-pointer hover:text-primary',
          sortActive === 'desc' ? 'text-primary' : ''
        )}
        onClick={() => handleClickSort(type, 'desc')}
      >
        Sắp xếp từ Z đến A
      </div>
    </ul>
  )
}

export default ProductDropdown

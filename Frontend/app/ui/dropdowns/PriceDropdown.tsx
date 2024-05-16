import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import { setFilterOptions } from '@/lib/redux/slices/product_actions'
import { RootState } from '@/lib/redux/store'
import _ from 'lodash'
import type { ChangeEvent, ChangeEventHandler, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ICheckboxOption } from './definitions'
import useDropdown from './useDropdown'

interface PriceInputProps {
  readOnly: boolean
  value: string
  placeholder: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const PriceInput = (props: PriceInputProps) => {
  const { readOnly, value, onChange, placeholder } = props

  return (
    <label className='dy-input flex items-center gap-2 w-[95px] h-[26px] p-[5px] focus:border-alto focus-within:border-alto rounded bg-wild-sand text-12 leading-[14px]'>
      <input
        type='number'
        id='fromPrice'
        className='w-[68px] placeholder-silver'
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        onKeyDown={(evt) => ['e', 'E', '.', '-'].includes(evt.key) && evt.preventDefault()}
      />
      <span className='w-2 text-silver'>đ</span>
    </label>
  )
}

const PriceDropdown = () => {
  const {
    options,
    fromPrice,
    setFromPrice,
    toPrice,
    setToPrice,
    onChangeCheckbox,
    onClickResetFilter,
    sort
  } = useDropdown('price')

  const filterOptions = useSelector((state: RootState) => state.productActions.filterOptions)

  const otherOption: ICheckboxOption | undefined = options.find((item) => item.id === 'other')

  const dispatch = useDispatch()

  const onChangeFromPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setFromPrice(e.target.value)
  }

  const onChangeToPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setToPrice(e.target.value)
  }

  const onClickApplyCustomRange = () => {
    const cloneFilterOptions = _.cloneDeep(filterOptions)

    const numberFromPrice = Number(fromPrice)
    const numberToPrice = Number(toPrice)

    // If both fields are empty, it does not filter
    if (numberFromPrice === 0 && numberToPrice === 0) return

    let minValue, maxValue

    // If toPrice is empty => fromPrice -> Infinity
    if (numberToPrice === 0) {
      minValue = numberFromPrice
      maxValue = Infinity
    } else {
      // If fromPrice is empty => 0 -> toPrice
      // If both fields are filled => get min/max value
      const customRange = [numberFromPrice, numberToPrice]

      minValue = Math.min(...customRange)
      maxValue = Math.max(...customRange)
    }

    cloneFilterOptions.price.customRange = [minValue, maxValue]

    dispatch(setFilterOptions(cloneFilterOptions))
  }

  const onClickResetCustomRange = (e: MouseEvent<HTMLAnchorElement>) => {
    setFromPrice('')
    setToPrice('')

    const cloneFilterOptions = _.cloneDeep(filterOptions)

    cloneFilterOptions.price.customRange = []

    dispatch(setFilterOptions(cloneFilterOptions))
  }

  return (
    <ul
      tabIndex={0}
      className='dy-dropdown-content min-w-[240px] z-[1] menu shadow bg-base-100 rounded-box border border-primary overflow-hidden p-0 text-abbey'
    >
      <div className='pt-5 px-[15px] pb-[18px] text-left'>
        <p className='mb-2.5 text-left font-semibold leading-[13px]'>Chọn khoảng giá</p>
        <div className='options-wrapper flex flex-col gap-[7px] mb-[18px]'>
          {options.map((item, index) => (
            <label key={index} className='font-normal'>
              <CustomCheckbox
                label={item.label}
                name={item.id}
                id={item.id}
                handleOnChange={onChangeCheckbox}
                checked={item.checked}
                labelClassName='text-abbey hover:text-primary'
              />
            </label>
          ))}
        </div>
        <p className='mb-2.5 text-left font-semibold leading-[13px]'>Hoặc nhập khoảng giá</p>
        <div className='flex gap-2.5 mb-[7px] text-12'>
          <PriceInput
            placeholder='Từ'
            readOnly={!otherOption?.checked}
            value={fromPrice}
            onChange={onChangeFromPrice}
          />
          <PriceInput
            placeholder='Đến'
            readOnly={!otherOption?.checked}
            value={toPrice}
            onChange={onChangeToPrice}
          />
        </div>

        <button
          className={`dy-btn dy-btn-xs p-[6px_9px_5px_9px] rounded mr-3 text-[11px] font-medium leading-[13px] ${otherOption?.checked ? 'dy-btn-primary' : ''}`}
          disabled={!otherOption?.checked}
          onClick={onClickApplyCustomRange}
        >
          Áp dụng
        </button>
        <a
          className={`${otherOption?.checked ? 'text-primary' : 'text-silver'} cursor-pointer`}
          onClick={onClickResetCustomRange}
        >
          Xoá
        </a>
      </div>

      <div
        className='bg-mercury py-[13px] leading-[14px] cursor-pointer hover:text-primary'
        onClick={onClickResetFilter}
      >
        Bỏ lọc
      </div>

      <div
        className='bg-mercury py-[13px] border-t border-b border-silver-sand leading-[14px] cursor-pointer hover:text-primary'
        onClick={() => sort('priceSale', 'asc')}
      >
        Sắp xếp tăng dần
      </div>

      <div
        className='bg-mercury py-[13px] leading-[14px] cursor-pointer hover:text-primary'
        onClick={() => sort('priceSale', 'desc')}
      >
        Sắp xếp giảm dần
      </div>
    </ul>
  )
}

export default PriceDropdown

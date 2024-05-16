import { SelectComponent } from '@/components/common/Select/SelectComponent'
import Image from 'next/image'
import {
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  components
} from 'react-select'

import type { IOption } from './TableProduct'

export const SelectSortOption = (props: any) => {
  const shortOptions = [
    { label: 'Mới nhất', value: 'Mới nhất' },
    { label: 'Bán chạy', value: 'Bán chạy' },
    { label: 'Giá cao đến thấp', value: 'Giá cao đến thấp' },
    { label: 'Giá thấp đến cao', value: 'Giá thấp đến cao' }
  ]

  const CustomControl = ({
    children,
    ...props
  }: ControlProps<IOption, false, GroupBase<IOption>>) => {
    return (
      <components.Control {...props}>
        <span className='ms-[15px] text-gray-40 text-left leading-4 text-abbey'>Xếp theo:</span>
        {children}
      </components.Control>
    )
  }

  const CustomDropdownIndicator = (
    props: DropdownIndicatorProps<IOption, false, GroupBase<IOption>>
  ) => {
    return (
      <>
        <components.DropdownIndicator {...props}>
          <div className='select__indicator select__dropdown-indicator' aria-hidden='true'>
            <Image
              className='cursor-pointer'
              alt='chevron icon'
              src={`${props.selectProps.menuIsOpen ? '/icons/chevron-up-gray.svg' : '/icons/chevron-down-gray.svg'}`}
              height={10}
              width={10}
            />
          </div>
        </components.DropdownIndicator>
      </>
    )
  }

  const CustomOption = (props: OptionProps<IOption, false, GroupBase<IOption>>) => {
    const isLastOption =
      props.options.findIndex((o) => o.label === props.data.label) === props.options.length - 1
    return (
      <>
        <components.Option
          {...props}
          className={`!text-abbey !cursor-pointer ${props.isFocused ? '!bg-accent' : ''} ${props.isSelected ? '!bg-white' : ''} !py-0 !px-2.5 font-normal`}
        >
          <div
            className={`flex items-center py-2.5 ${isLastOption ? '' : ' border-b border-alto'}`}
          >
            {props.isSelected && (
              <Image
                className='cursor-pointer'
                alt='chevron icon'
                src='/icons/v-mark-gray.svg'
                height={10}
                width={10}
              />
            )}
            <div className='ms-[7px]'>{props.label}</div>
          </div>
        </components.Option>
      </>
    )
  }

  return (
    <SelectComponent
      options={shortOptions}
      isSearchable={false}
      value={props.sortItem}
      classNames={{
        control: 'w-[162px] flex items-center',
        menuList: '!py-1 !text-left',
        valueContainer: '!text-right',
        singleValue: '!me-0'
      }}
      handleOnChange={props.onChangeSort}
      CustomControl={CustomControl}
      CustomDropdownIndicator={CustomDropdownIndicator}
      CustomOption={CustomOption}
    />
  )
}

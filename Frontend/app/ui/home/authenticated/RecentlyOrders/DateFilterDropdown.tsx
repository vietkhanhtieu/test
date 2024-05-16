import { IOption } from '@/app/ui/TableProduct'
import { SelectComponent } from '@/components/common/Select/SelectComponent'
import Image from 'next/image'
import {
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  SingleValueProps,
  components
} from 'react-select'

export const DateFilterDropdown = (props: any) => {
  const options = [
    { label: 'Tất cả', value: '' },
    { label: '7 ngày', value: 7 },
    { label: '14 ngày', value: 14 },
    { label: '30 ngày', value: 30 }
  ]

  const numberOfItems = () => {
    return (
      <span>
        {'('}
        {props.totalOrder}
        {')'}
      </span>
    )
  }

  const CustomSingleValue = ({
    children,
    ...props
  }: SingleValueProps<IOption, false, GroupBase<IOption>>) => {
    return (
      <components.SingleValue {...props}>
        {children} {numberOfItems()}
      </components.SingleValue>
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
              className='cursor-pointer me-[9px]'
              alt='chevron icon'
              src={`${props.selectProps.menuIsOpen ? '/icons/chevron-up-gray.svg' : '/icons/chevron-down-gray.svg'}`}
              height={4}
              width={8}
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
      options={options}
      isSearchable={false}
      value={props.filterDate}
      classNames={{
        control:
          'w-[180px] flex items-center ps-[19px] !rounded-lg !border-0 !outline-none !bg-white !shadow-dark-gray',
        menu: '!w-[180px]',
        menuList: '!py-1 !w-[180px] !text-left',
        valueContainer: 'w-[180px] !text-left',
        singleValue: '!me-0 !text-16 leading-[19px] font-medium'
      }}
      handleOnChange={props.onChangeDateFilter}
      CustomDropdownIndicator={CustomDropdownIndicator}
      CustomOption={CustomOption}
      CustomSingleValue={CustomSingleValue}
    />
  )
}

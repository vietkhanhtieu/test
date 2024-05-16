'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ComponentType } from 'react'
import Select, {
  ActionMeta,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValue,
  OptionProps,
  SingleValue,
  SingleValueProps,
  components
} from 'react-select'

import './select.css'

interface IOption {
  readonly value: string | number
  readonly label: string | number
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
  readonly menuIsOpen?: boolean
}

interface IClassNames {
  control?: string
  valueContainer?: string
  singleValue?: string
  menu?: string
  menuList?: string
  option?: string
  selectContainer?: string
  optionFocus?: string
  optionSelected?: string
}

interface IProps {
  options: IOption[]
  handleOnChange?: (
    newValue: SingleValue<IOption> | MultiValue<IOption>,
    actionMeta: ActionMeta<IOption>
  ) => void
  value: string | number | null
  isSearchable: boolean
  menuIsOpen?: boolean
  classNames?: IClassNames
  autoFocus?: boolean
  rootClassName?: string
  classPrefix?: string
  name?: string
  CustomControl?: ComponentType<ControlProps<IOption, false, GroupBase<IOption>>>
  CustomSingleValue?: ComponentType<SingleValueProps<IOption, false, GroupBase<IOption>>>
  CustomOption?: ComponentType<OptionProps<IOption, false, GroupBase<IOption>>>
  CustomDropdownIndicator?: ComponentType<
    DropdownIndicatorProps<IOption, false, GroupBase<IOption>>
  >
  placeholder?: string
  inPage?: string
}

export const SelectComponent: React.FC<IProps> = ({
  options,
  value,
  isSearchable,
  menuIsOpen,
  autoFocus,
  rootClassName,
  classNames,
  classPrefix,
  name,
  CustomControl,
  CustomSingleValue,
  CustomOption,
  CustomDropdownIndicator,
  handleOnChange,
  placeholder = 'Select...',
  inPage
}) => {
  const Control = ({ children, ...props }: ControlProps<IOption, false, GroupBase<IOption>>) => {
    return (
      <>
        {!!CustomControl ? (
          <CustomControl {...props}>{children}</CustomControl>
        ) : (
          <components.Control {...props}>{children}</components.Control>
        )}
      </>
    )
  }

  const SingleValue = ({
    children,
    ...props
  }: SingleValueProps<IOption, false, GroupBase<IOption>>) => {
    return (
      <>
        {!!CustomSingleValue ? (
          <CustomSingleValue {...props}>{children}</CustomSingleValue>
        ) : (
          <components.SingleValue {...props}>{children}</components.SingleValue>
        )}
      </>
    )
  }

  const DropdownIndicator = (props: DropdownIndicatorProps<IOption, false, GroupBase<IOption>>) => {
    return (
      <>
        {!!CustomDropdownIndicator?.length ? (
          <CustomDropdownIndicator {...props} />
        ) : (
          <components.DropdownIndicator {...props}>
            <div className='select__indicator select__dropdown-indicator p-1' aria-hidden='true'>
              <Image
                className='cursor-pointer'
                alt='chevron icon'
                src={`${props.selectProps.menuIsOpen ? '/icons/chevron-up-gray.svg' : '/icons/chevron-down-gray.svg'}`}
                height={12}
                width={12}
              />
            </div>
          </components.DropdownIndicator>
        )}
      </>
    )
  }

  const Option = (props: OptionProps<IOption, false, GroupBase<IOption>>) => {
    const classFocus = classNames?.optionFocus || '!bg-accent'
    const optionSelected = classNames?.optionSelected || '!bg-accent !text-primary'
    return (
      <>
        {!!CustomOption ? (
          <CustomOption {...props} />
        ) : (
          <components.Option
            {...props}
            className={`!text-abbey !cursor-pointer ${props.isFocused ? classFocus : ''} ${props.isSelected ? optionSelected : ''} !py-1 font-normal last:rounded-b-md first:rounded-t-md`}
          >
            {inPage != 'quick_search_product' ? (
              <div className='py-1'>{props.label}</div>
            ) : (
              <div className='py-1 flex items-center gap-x-2.5 relative pl-[18px]'>
                <span className='absolute left-0'>
                  {props.isSelected && (
                    <Image alt='' src={'/icons/check-white.svg'} width={8} height={6} />
                  )}
                </span>
                {props.label}
              </div>
            )}
          </components.Option>
        )}
      </>
    )
  }

  return (
    <Select
      className={cn(rootClassName, 'border-alto')}
      classNamePrefix={classPrefix || 'select'}
      defaultValue={options.find((o) => o.value === value)}
      value={options.find((o) => o.value === value) || null}
      menuIsOpen={menuIsOpen}
      name={name}
      options={options}
      isSearchable={isSearchable}
      autoFocus={autoFocus}
      components={{ Control, DropdownIndicator, Option, SingleValue }}
      onChange={handleOnChange}
      classNames={{
        control: () => {
          return `!outline-none border-dusty-gray shadow-none !rounded-md !bg-transparent !min-h-10 ${classNames?.control}`
        },
        valueContainer: () =>
          `${isSearchable ? '' : 'text-center !p-0 !rounded-md !bg-transparent !text-abbey !text-14 !leading-4'} ${classNames?.valueContainer}`,
        singleValue: () => `${classNames?.singleValue}`,
        menu: () => `!mt-0.5 !shadow-lg !rounded-md ${classNames?.menu}`,
        menuList: () => `text-center text-14 text-abbey !p-0 ${classNames?.menuList}`,
        option: () => `${classNames?.option}`,
        input: () =>
          `text-center !rounded-md !bg-transparent !text-abbey !text-14 !leading-4 ${classNames?.valueContainer}`
      }}
      placeholder={<div className='!text-[#979797]'> {placeholder}</div>}
    />
  )
}

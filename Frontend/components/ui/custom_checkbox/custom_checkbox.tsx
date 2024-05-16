import { cn } from '@/lib/utils'
import * as React from 'react'

import './custom_checkbox.css'

export interface ICustomCheckboxProps {
  checked: boolean
  className?: string
  labelClassName?: string
  labelHTML?: string
  label?: string
  id?: string
  name?: string
  disabled?: boolean
  handleOnChange: (arg0: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomCheckbox: React.FC<ICustomCheckboxProps> = ({
  className,
  label,
  checked,
  labelClassName,
  id,
  name,
  labelHTML,
  disabled,
  handleOnChange
}) => {
  return (
    <div className='checkbox-wrapper-46'>
      <input
        type='checkbox'
        id={id ?? 'cbx-46'}
        name={name}
        checked={checked}
        className={cn(className, 'inp-cbx')}
        onChange={(e) => handleOnChange(e)}
        disabled={disabled}
      />
      <label className='cbx flex items-center' htmlFor={id ?? 'cbx-46'}>
        <span className='custom-checkbox min-w-4'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g opacity='0.3'>
              <path
                d='M4.09375 6.54143L5.84695 8.45313L10.0312 4.70312'
                stroke='#FF6B00'
                strokeWidth='0.8625'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </g>
            <path
              d='M4.5625 5.91643L6.3157 7.82813L10.5 4.07812'
              stroke='#4D4D4F'
              strokeWidth='0.8625'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          <span className='custom-checkbox--sub sub'></span>
        </span>
        {label && (
          <span className={cn('text-sm text-gray-700 text-left', labelClassName)}>{label}</span>
        )}
        {labelHTML && <span dangerouslySetInnerHTML={{ __html: labelHTML }} />}
      </label>
    </div>
  )
}

export default CustomCheckbox

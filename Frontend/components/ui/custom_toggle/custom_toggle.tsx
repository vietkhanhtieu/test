import { cn } from '@/lib/utils'
import * as React from 'react'

import './custom_toggle.css'

export interface ICustomToggleProps {
  checked: boolean
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  handleOnChange: (arg0: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomToggle: React.FC<ICustomToggleProps> = ({
  className,
  checked,
  disabled,
  id,
  name,
  handleOnChange
}) => {
  return (
    <input
      type='checkbox'
      id={id}
      name={name}
      checked={checked}
      className={cn('custom-toggle', className)}
      disabled={disabled}
      onChange={handleOnChange}
    />
  )
}

export default CustomToggle

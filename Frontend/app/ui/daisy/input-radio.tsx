import { cn } from '@/lib/utils'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  radioText?: string
  labelText?: string
}

const InputRadio = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, radioText, value, checked, onChange, labelText, ...props }, ref) => {
    return (
      <div className='form-control '>
        <label className='label cursor-pointer flex items-center gap-2'>
          <input
            type='radio'
            name='pronoun'
            className={cn('dy-radio checked:bg-primary', className)}
            value={value}
            label-text={labelText}
            checked={checked}
            onChange={onChange}
            ref={ref}
            {...props}
          />
          <span className='label-text'>{radioText}</span>
        </label>
      </div>
    )
  }
)
InputRadio.displayName = 'InputRadio'

export { InputRadio }

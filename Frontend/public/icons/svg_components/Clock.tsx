import { cn } from '@/lib/utils'

interface Props {
  disabled?: boolean
  stroke?: string
  className?: string
}

const Clock = (props: Props) => {
  const { disabled, stroke, className } = props

  return (
    <svg
      width={14}
      height={15}
      className={cn(className, disabled && 'disabled')}
      viewBox='0 0 14 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        minWidth: '14px',
        height: '14px'
      }}
    >
      <path
        d='M6.91406 13.3525C10.2278 13.3525 12.9141 10.6662 12.9141 7.35254C12.9141 4.03883 10.2278 1.35254 6.91406 1.35254C3.60035 1.35254 0.914062 4.03883 0.914062 7.35254C0.914062 10.6662 3.60035 13.3525 6.91406 13.3525Z'
        stroke={stroke || '#4d4d4f'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.53125 5.17773V8.36372H9.53784'
        stroke={stroke || '#4d4d4f'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Clock

interface Props {
  stroke?: string
  className?: string
}

const ChevronRight = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='6'
      height='10'
      className={className}
      viewBox='0 0 6 10'
      fill='none'
    >
      <path
        d='M1 9.00073L5 5.00073L1 1.00073'
        stroke={stroke || '#4D4D4F'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default ChevronRight

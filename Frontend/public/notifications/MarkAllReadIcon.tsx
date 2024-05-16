interface Props {
  stroke?: string
  className?: string
}

const MarkReadAllIcon = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      width='16'
      height='15'
      viewBox='0 0 16 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        opacity='0.3'
        d='M1.58325 7.57908L4.82243 10.664L6.44203 8.81305M5.28518 7.57908L8.52436 10.664L13.923 4.49414M10.2211 4.49414L8.06162 6.96209'
        stroke={stroke || '#FF6B00'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.0769 7.08494L5.31609 10.1699L6.93568 8.31891M5.77883 7.08494L9.01801 10.1699L14.4166 4M10.7147 4L8.55527 6.46795'
        stroke={stroke || '#FF6B00'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default MarkReadAllIcon

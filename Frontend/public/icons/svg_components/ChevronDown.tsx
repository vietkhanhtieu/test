import { Stoke } from 'next/font/google'

interface Props {
  stroke?: string
  className?: string
}

const ChevronDown = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      width='10'
      height='6'
      viewBox='0 0 10 6'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.3'>
        <path
          d='M1.28624 2.25879L4.49517 5.3282L7.7041 2.25879'
          stroke={stroke || '#4D4D4F'}
          stroke-width='1.25455'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </g>
      <path
        d='M2.12315 1.42187L5.33208 4.49129L8.54102 1.42188'
        stroke={stroke || '#4D4D4F'}
        stroke-width='1.25455'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default ChevronDown

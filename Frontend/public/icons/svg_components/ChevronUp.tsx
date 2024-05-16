interface Props {
  stroke?: string
  className?: string
}

const ChevronUp = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      width='10'
      height='6'
      className={className}
      viewBox='0 0 10 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.3'>
        <path
          d='M8.54286 4.49109L5.33393 1.42168L2.125 4.49109'
          stroke={stroke || '#4D4D4F'}
          stroke-width='1.25455'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </g>
      <path
        d='M7.70497 5.32825L4.49604 2.25883L1.28711 5.32825'
        stroke={stroke || '#4D4D4F'}
        stroke-width='1.25455'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default ChevronUp

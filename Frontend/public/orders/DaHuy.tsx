import React from 'react'

interface Props {
  stroke?: string
  className?: string
}

const DaHuy = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      width='23'
      height='24'
      className={className}
      viewBox='0 0 23 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.3'>
        <path
          d='M11.4258 6.33203V14.5779'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.62'
          strokeLinecap='round'
        />
        <path
          d='M11.5312 16.7188H11.424'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.62'
          strokeLinecap='round'
        />
        <path
          d='M0.980469 2.00391V22.8164L2.66797 20.9414L4.07422 22.9727L6.16797 20.9414L8.04297 22.8164L10.043 20.9414L12.0742 22.8164L13.9805 20.9414L15.9805 22.8164L18.043 20.9414L20.9805 22.8164V2.00391H0.980469Z'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.62'
          stroke-linejoin='round'
        />
      </g>
      <path
        d='M12.4258 5.33203V13.5779'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.62'
        strokeLinecap='round'
      />
      <path
        d='M12.5312 15.7188H12.424'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.62'
        strokeLinecap='round'
      />
      <path
        d='M1.98047 1.00391V21.8164L3.66797 19.9414L5.07422 21.9727L7.16797 19.9414L9.04297 21.8164L11.043 19.9414L13.0742 21.8164L14.9805 19.9414L16.9805 21.8164L19.043 19.9414L21.9805 21.8164V1.00391H1.98047Z'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.62'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default DaHuy

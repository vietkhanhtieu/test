import React from 'react'

interface Props {
  stroke?: string
  className?: string
}

const DaGiao = (props: Props) => {
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
          d='M5.08805 6.30598H20.1815L17.094 2.13867H4.59214L1.47266 6.30598V20.9195C1.47266 21.4714 1.68863 21.9993 2.08056 22.3912C2.27253 22.5832 2.49646 22.7432 2.75242 22.8471C3.00837 22.9511 3.27233 23.0071 3.55228 23.0071H18.1658C18.4377 23.0071 18.7097 22.9511 18.9657 22.8471C19.2216 22.7432 19.4456 22.5832 19.6376 22.3912C20.0295 21.9993 20.2454 21.4714 20.2454 20.9195V9.43342'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.62372'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14.983 10.4746C14.983 11.5784 14.5431 12.6422 13.7592 13.4181C12.9754 14.202 11.9196 14.6419 10.8157 14.6419C9.71193 14.6419 8.64812 14.202 7.87225 13.4181C7.08839 12.6342 6.64844 11.5784 6.64844 10.4746'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.62372'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <path
        d='M6.26383 5.13019H21.3572L18.2697 0.962891H5.76792L2.64844 5.13019V19.7437C2.64844 20.2956 2.86441 20.8235 3.25634 21.2154C3.44831 21.4074 3.67224 21.5674 3.9282 21.6714C4.18415 21.7753 4.44811 21.8313 4.72806 21.8313H19.3416C19.6135 21.8313 19.8855 21.7753 20.1414 21.6714C20.3974 21.5674 20.6214 21.4074 20.8133 21.2154C21.2053 20.8235 21.4212 20.2956 21.4212 19.7437V8.25764'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.62372'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.1588 9.29883C16.1588 10.4026 15.7189 11.4665 14.935 12.2423C14.1511 13.0262 13.0953 13.4661 11.9915 13.4661C10.8877 13.4661 9.8239 13.0262 9.04803 12.2423C8.26417 11.4585 7.82422 10.4026 7.82422 9.29883'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.62372'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default DaGiao

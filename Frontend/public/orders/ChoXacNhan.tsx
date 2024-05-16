import React from 'react'

interface Props {
  stroke?: string
  className?: string
}

const ChoXacNhan = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      width='23'
      height='26'
      className={className}
      viewBox='0 0 23 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.3'>
        <path
          d='M15.4786 19.4277H6.12109'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58828'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15.4786 14.7754H6.12109'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58828'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8.46048 10.1738H6.12109'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58828'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8.45959 2.06835H3.78082C3.16272 2.06835 2.56805 2.31091 2.12991 2.74124C1.69176 3.17156 1.44922 3.76618 1.44922 4.37646V22.896C1.44922 23.2011 1.51184 23.5063 1.6292 23.7879C1.74657 24.0696 1.91867 24.3278 2.13774 24.539C2.35681 24.7503 2.61503 24.9224 2.8967 25.0398C3.17836 25.1572 3.48347 25.2119 3.7886 25.2119H17.8172C18.1223 25.2119 18.4274 25.1572 18.7091 25.0398C18.9907 24.9224 19.249 24.7581 19.468 24.539C19.6871 24.32 19.8592 24.0696 19.9766 23.7879C20.0939 23.5063 20.1566 23.2011 20.1566 22.896V13.6323M11.9726 2.06055L20.1566 10.1584H11.9726V2.06055Z'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58828'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <path
        d='M16.6271 18.2793H7.26953'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58828'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.6271 13.625H7.26953'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58828'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.60892 9.02344H7.26953'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58828'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.60803 0.917964H4.92926C4.31116 0.917964 3.71649 1.16052 3.27835 1.59085C2.8402 2.02117 2.59766 2.61579 2.59766 3.22607V21.7456C2.59766 22.0508 2.66028 22.3559 2.77764 22.6375C2.895 22.9192 3.0671 23.1774 3.28618 23.3887C3.50525 23.5999 3.76347 23.772 4.04514 23.8894C4.3268 24.0068 4.6319 24.0615 4.93704 24.0615H18.9656C19.2708 24.0615 19.5759 24.0068 19.8575 23.8894C20.1392 23.772 20.3974 23.6077 20.6165 23.3887C20.8356 23.1696 21.0077 22.9192 21.125 22.6375C21.2424 22.3559 21.305 22.0508 21.305 21.7456V12.4819M13.121 0.910156L21.305 9.00806H13.121V0.910156Z'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58828'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default ChoXacNhan

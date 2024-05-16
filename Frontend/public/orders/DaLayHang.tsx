import React from 'react'

interface Props {
  stroke?: string
  className?: string
}

const DaLayHang = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      width='27'
      height='30'
      className={className}
      viewBox='0 0 27 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.3'>
        <path
          d='M15.5784 23.3691H6.21875'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58997'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15.5784 18.7168H6.21875'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58997'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8.56062 14.0879H6.21875'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58997'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8.56075 5.98047H3.877C3.25824 5.98047 2.66299 6.22326 2.22438 6.65404C1.78577 7.08482 1.54297 7.68006 1.54297 8.29098V26.8224C1.54297 27.1279 1.60561 27.4255 1.7231 27.7075C1.84058 27.9894 2.01292 28.24 2.23222 28.4593C2.45153 28.6787 2.70997 28.851 2.99194 28.9685C3.2739 29.086 3.57938 29.1486 3.88484 29.1486H17.9283C18.547 29.1486 19.1423 28.898 19.5809 28.4672C19.8002 28.2557 19.9725 27.9973 20.09 27.7153C20.2075 27.4333 20.2702 27.1357 20.2702 26.8302V17.5645'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58997'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M24.4076 8.85525C24.1882 10.1163 23.6008 11.2833 22.7314 12.2153C21.862 13.1474 20.7342 13.8053 19.4966 14.1108C18.2356 14.3614 16.9276 14.2126 15.7606 13.6721C14.5936 13.1395 13.6224 12.2466 12.9958 11.1266C12.3535 10.0066 12.0872 8.70643 12.2282 7.42192C12.3692 6.13741 12.9174 4.93125 13.7946 3.9757C14.711 3.03581 15.8859 2.38568 17.1626 2.11938C18.4471 1.85308 19.7786 1.97057 20.9926 2.46401'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58997'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.1094 7.87713L18.5531 10.3208L24.4117 3.96094'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.58997'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <path
        d='M16.7308 22.2168H7.37109'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58997'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.7308 17.5645H7.37109'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58997'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.71297 12.9355H7.37109'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58997'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.71309 4.82812H5.02935C4.41059 4.82812 3.81534 5.07092 3.37673 5.5017C2.93811 5.93248 2.69531 6.52771 2.69531 7.13864V25.6701C2.69531 25.9755 2.75796 26.2732 2.87544 26.5551C2.99293 26.8371 3.16526 27.0877 3.38457 27.307C3.60387 27.5263 3.86232 27.6986 4.14428 27.8161C4.42625 27.9336 4.73172 27.9963 5.03719 27.9963H19.0806C19.6994 27.9963 20.2946 27.7456 20.7332 27.3148C20.9526 27.1034 21.1249 26.8449 21.2424 26.563C21.3599 26.281 21.4225 25.9834 21.4225 25.6779V16.4122'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58997'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M25.5599 7.70291C25.3406 8.96392 24.7531 10.1309 23.8838 11.063C23.0144 11.995 21.8865 12.653 20.649 12.9585C19.388 13.2091 18.0799 13.0602 16.9129 12.5198C15.7459 11.9872 14.7747 11.0943 14.1481 9.97427C13.5059 8.85424 13.2395 7.55408 13.3805 6.26957C13.5215 4.98506 14.0698 3.77891 14.947 2.82336C15.8634 1.88347 17.0383 1.23334 18.3149 0.967038C19.5995 0.700738 20.9309 0.818225 22.1449 1.31166'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58997'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.2617 6.72478L19.7054 9.16848L25.564 2.80859'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.58997'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default DaLayHang

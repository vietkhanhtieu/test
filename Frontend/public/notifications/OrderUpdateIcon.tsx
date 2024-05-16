interface Props {
  stroke?: string
  className?: string
}

const OrderUpdateIcon = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      width='27'
      height='17'
      viewBox='0 0 27 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M6.04233 13.1999H4.51562V11.5254'
        stroke={stroke || '#FF6B00'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.51562 3.80176V0.75H17.3079V13.2074H12.8242'
        stroke={stroke || '#FF6B00'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.3047 2.87695H21.9384L25.6507 5.88697V13.2059H25.0133'
        stroke={stroke || '#FF6B00'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.9375 13.207H18.3249'
        stroke={stroke || '#FF6B00'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.4297 5.41797V9.10092H23.1152V6.56042L21.7385 5.42319H19.4297V5.41797Z'
        stroke={stroke || '#FF6B00'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.4811 5.41602H3.74219'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.06956 7.77539H2.33594'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.63987 10.1465H0.90625'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.36511 16.1074C10.4151 16.1074 11.2614 15.278 11.2614 14.2607C11.2614 13.2435 10.4097 12.4141 9.36511 12.4141C8.32052 12.4141 7.46875 13.2435 7.46875 14.2607C7.46875 15.278 8.32052 16.1074 9.36511 16.1074Z'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21.6385 16.1094C22.6885 16.1094 23.5349 15.2799 23.5349 14.2627C23.5349 13.2455 22.6831 12.416 21.6385 12.416C20.5939 12.416 19.7422 13.2455 19.7422 14.2627C19.7422 15.2799 20.5939 16.1094 21.6385 16.1094Z'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default OrderUpdateIcon

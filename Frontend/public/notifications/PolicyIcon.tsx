interface Props {
  stroke?: string
  className?: string
}

const PolicyIcon = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      width='19'
      height='20'
      viewBox='0 0 19 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M4.68864 3.48265C4.36325 3.80867 4.18579 4.24661 4.18579 4.70401V8.58088M14.6771 2.98633H16.4223C16.6541 2.98633 16.8808 3.03012 17.0928 3.11284C17.3048 3.19556 17.4971 3.32207 17.6598 3.48265C17.9852 3.80867 18.1627 4.24661 18.1627 4.70401V16.7667C18.1627 16.9954 18.1183 17.2192 18.0296 17.4285C17.9408 17.6377 17.8126 17.8275 17.6499 17.988C17.4872 18.1486 17.295 18.2751 17.083 18.3627C16.871 18.4503 16.6442 18.4941 16.4125 18.4941H5.93598C5.70426 18.4941 5.47748 18.4503 5.26549 18.3627C5.05349 18.2751 4.86121 18.1486 4.69851 17.988C4.53582 17.8275 4.40763 17.6377 4.31888 17.4285C4.23014 17.2192 4.18579 16.9954 4.18579 16.7667V16.092'
        stroke={stroke || '#FF6B00'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.6529 2.98228V2.1064C14.6529 1.99449 14.6283 1.88257 14.5888 1.77552C14.5444 1.67334 14.4804 1.57602 14.4015 1.49816C14.3226 1.42031 14.224 1.35705 14.1204 1.31326C14.0169 1.26947 13.9035 1.25 13.7852 1.25H8.54449C8.31277 1.25 8.09091 1.34246 7.92822 1.50303C7.76553 1.66361 7.67188 1.88258 7.67188 2.11128V3.83382C7.67188 4.06252 7.76553 4.28149 7.92822 4.44206C8.09091 4.60264 8.31277 4.69509 8.54449 4.69509H13.7852C14.0169 4.69509 14.2388 4.60264 14.4015 4.44206C14.5642 4.28149 14.6578 4.06252 14.6578 3.83382V2.98228H14.6529Z'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.8064 6.78711H15.725'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        d='M9.79956 9.11719H15.779'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        d='M9.79956 11.4453H15.779'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        d='M9.79956 13.7676H15.779'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        d='M6.8064 16.1777H15.725'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        d='M4.18996 8.58398L0.928467 9.94964V11.9981C0.928467 13.893 2.32004 15.6649 4.18996 16.0951C6.05988 15.6649 7.45145 13.893 7.45145 11.9981V9.94964L4.18996 8.58398Z'
        stroke={stroke || '#FF6B00'}
        strokeWidth='1.2'
        strokeLinejoin='round'
      />
      <path
        d='M2.92383 12.0701L4.01099 13.322L5.82293 11.623'
        stroke={stroke || '#FF9B53'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default PolicyIcon

import React from 'react'

interface Props {
  stroke?: string
  className?: string
}

const DanhGia = (props: Props) => {
  const { stroke, className } = props

  return (
    <svg
      width='28'
      height='28'
      className={className}
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.3'>
        <path
          d='M10.5129 16.5906L7.33594 13.4945L11.7254 12.8559L13.6898 8.88672L15.6542 12.8559L20.0437 13.4945L16.8668 16.5906L17.6105 20.964L13.6898 18.8945L9.76109 20.964'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.64102'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13.6905 27.0041C20.3597 27.0041 25.7678 21.596 25.7678 14.9269C25.7678 8.25769 20.3597 2.84961 13.6905 2.84961C7.02136 2.84961 1.61328 8.25769 1.61328 14.9269C1.61328 21.596 7.02136 27.0041 13.6905 27.0041Z'
          stroke={stroke || '#C7C8CA'}
          strokeWidth='1.64102'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <path
        d='M11.7004 15.4031L8.52344 12.307L12.9129 11.6684L14.8773 7.69922L16.8417 11.6684L21.2312 12.307L18.0543 15.4031L18.798 19.7765L14.8773 17.707L10.9486 19.7765'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.64102'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.878 25.8166C21.5472 25.8166 26.9553 20.4085 26.9553 13.7394C26.9553 7.07019 21.5472 1.66211 14.878 1.66211C8.20886 1.66211 2.80078 7.07019 2.80078 13.7394C2.80078 20.4085 8.20886 25.8166 14.878 25.8166Z'
        stroke={stroke || '#C7C8CA'}
        strokeWidth='1.64102'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default DanhGia

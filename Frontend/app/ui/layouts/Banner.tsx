'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Banner() {
  const [showBanner, setShowBanner] = useState(true)

  return (
    showBanner && (
      <div className='h-20 bg-black-rock'>
        <div className='container relative h-full bg-banner-conq bg-cover bg-center'>
          <button className='absolute right-7 top-2'>
            <Image
              src='/icons/close-button.svg'
              alt='Close button'
              width={21}
              height={21}
              onClick={() => setShowBanner(false)}
            />
          </button>
        </div>
      </div>
    )
  )
}

import Spinner from '@/components/ui/spinner'
import React from 'react'

export default function Loading() {
  return (
    <div className='container flex mt-24 justify-center items-center w-full'>
      <Spinner size='lg' />
    </div>
  )
}

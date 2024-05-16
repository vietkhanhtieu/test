import { Hero1, Hero2 } from '@/public/home'
import Image from 'next/image'

const Banner = () => {
  return (
    <div className='container grid grid-cols-3 space-x-3 mt-6'>
      <div className='col-span-2 overflow-clip rounded-lg'>
        <Image alt='Claim' src={Hero1} />
      </div>
      <div className='overflow-clip rounded-lg'>
        <Image alt='Claim' src={Hero2} className='h-full object-cover' />
      </div>
    </div>
  )
}

export default Banner

'use client'

import Spinner from '@/components/ui/spinner'
import { RootState } from '@/lib/redux/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const router = useRouter()
  const { items, fetching } = useSelector((state: RootState) => state.termsAndConditionsMenu)

  useEffect(() => {
    if (!fetching && !!items.length) {
      router.push(`/terms-and-conditions/${items[0].post_name}`)
    }
  }, [items])

  return (
    <>
      {fetching ? (
        <div className='flex items-center justify-center py-4'>
          <Spinner />
        </div>
      ) : (
        <div className='mt-[30px]'></div>
      )}
    </>
  )
}

export default Page

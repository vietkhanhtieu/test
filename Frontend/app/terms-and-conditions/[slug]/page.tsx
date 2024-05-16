'use client'

import Spinner from '@/components/ui/spinner'
import { RootState } from '@/lib/redux/store'
import { last } from 'lodash'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

const Page = () => {
  const currentPath = usePathname()
  const slug = last(currentPath.split('/'))
  const { items, fetching } = useSelector((state: RootState) => state.termsAndConditionsMenu)
  const item = items.find((i) => i.post_name === slug)

  return (
    <>
      {fetching ? (
        <div className='flex items-center justify-center py-4'>
          <Spinner />
        </div>
      ) : (
        <div className='mt-[30px]'>
          <div className='w-full' dangerouslySetInnerHTML={{ __html: item?.post_content || '' }} />
        </div>
      )}
    </>
  )
}

export default Page

import axios from '@/app/api/axios'
import Pagination from '@/components/common/Pagination/Pagination'
import { setNotificationList } from '@/lib/redux/slices/notifications'
import { RootState } from '@/lib/redux/store'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'

import {
  INotification,
  NotificationType,
  mappingNotificationData
} from '../../api/definitions/notification'
import Loading from './Loading'
import Notification from './Notification'

const TabContent = ({ activeTab }: { activeTab: NotificationType }) => {
  const [pageIndex, setPageIndex] = useState<number>(1)

  const fetcher = ([url, type]: string[]) =>
    axios.post(url, { type: type, limit: 7 }).then((response) => response.data.data)
  const { data, isLoading } = useSWR(
    [`/wp-json/notification/list?page=${pageIndex}`, activeTab],
    fetcher
  )
  const notificationList = useSelector((state: RootState) => state.notifications.list)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setNotificationList(mappingNotificationData(data.data)))
    }
  }, [data])

  if (isLoading) return <Loading />

  const handleOnPageChange = (index: number) => {
    if (!isLoading) {
      setPageIndex(index)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-2.5'>
        {notificationList?.map((notification: INotification, index: number) => (
          <div
            key={notification.id}
            className={cn(
              'grid grid-cols-[70px_1fr] gap-5 p-[15px_20px] rounded-[10px] bg-white',
              index === 0 && 'rounded-[0_0_10px_10px]',
              index === notificationList.length - 1 && 'rounded-[10px_10px_0_0]'
            )}
          >
            <Notification notification={notification} />
          </div>
        ))}
      </div>
      <div className='rounded-[0_0_10px_10px] bg-white'>
        <Pagination
          pageCount={data.last_page}
          className='py-[15px] border-t border-steam'
          pageLinkClassName='!w-[33px] !h-[33px]'
          breakClassName='!w-[33px] !h-[33px]'
          disable={isLoading}
          currentPage={pageIndex}
          handleOnPageChange={handleOnPageChange}
        />
      </div>
    </>
  )
}

export default TabContent

import axios from '@/app/api/axios'
import {
  INotification,
  getListAllUpdated,
  mappingNotificationData
} from '@/app/api/definitions/notification'
import { setNotificationList, setNotificationModalList } from '@/lib/redux/slices/notifications'
import { RootState } from '@/lib/redux/store'
import { cn } from '@/lib/utils'
import { BellIcon, TriangleIcon } from '@/public/icons'
import { MarkAllReadIcon } from '@/public/notifications'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'

import Loading from '../daisy/Loading'
import Empty from './Empty'
import Notification from './Notification'

const NotificationModal = () => {
  // used for current component
  const modalList = useSelector((state: RootState) => state.notifications.modalList)
  const unreadAmount: number = modalList.filter((notification: any) => !notification.isRead).length
  const [showList, setShowList] = useState<boolean>(false)

  // Re-render page list when read all notifications
  const list = useSelector((state: RootState) => state.notifications.list)

  // Fetch data as /notifications, same per page and SWR key
  const fetcher = (url: string) =>
    axios.post(url, { limit: 7 }).then((response) => response.data.data)
  const { data, isLoading } = useSWR('/wp-json/notification/list?page=1', fetcher)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setNotificationModalList(mappingNotificationData(data.data)))
      dispatch(setNotificationList(mappingNotificationData(data.data)))
    }
  }, [data])

  if (isLoading) {
    return (
      <div className='flex gap-1.5 items-center'>
        <Loading size='dy-loading-xs' color='text-white' />{' '}
        <span className='hidden lg:inline'>Thông báo</span>
      </div>
    )
  }

  const readAllNotifications = () => {
    axios.post('/wp-json/notification/read_all_notification')

    // Gray out the items
    dispatch(setNotificationModalList(getListAllUpdated(modalList)))
    dispatch(setNotificationList(getListAllUpdated(list)))
  }

  return (
    <div className='dy-dropdown dy-dropdown-hover m-auto' onMouseOver={() => setShowList(true)}>
      <Link href='#' tabIndex={0} role='button' className='flex gap-1.5 items-center'>
        <div className='relative'>
          {unreadAmount > 0 && (
            <div className='absolute -top-2.5 left-[-15px] flex items-center justify-center w-[24px] h-[17px] border-2 border-primary rounded-[10px] bg-white text-primary text-12 font-bold text-center'>
              {unreadAmount > 9 ? '9+' : unreadAmount}
            </div>
          )}
          <Image src={BellIcon} alt='Bell' width={14} height={14} />
        </div>
        <span className='hidden lg:inline'>Thông báo</span>
      </Link>
      {showList && (
        <div
          tabIndex={0}
          className='dy-dropdown-content top-[26px] right-[-56px] lg:-right-1.5 z-[51] w-[289px] rounded-[12px_12px_10px_10px] bg-white text-abbey'
        >
          <div className='absolute -top-1.5 w-full'>
            <Image src={TriangleIcon} alt='chevron up' className='mr-[57px] lg:mr-[44px] ml-auto' />
          </div>
          <div className='flex items-center justify-between py-4 px-[23px] border-b border-alto'>
            <h5 className='text-16 font-medium leading-[19px]'>Thông báo</h5>
            <button onClick={readAllNotifications}>
              <MarkAllReadIcon
                stroke={unreadAmount === 0 ? '#a7a9ac' : ''}
                className='w-3.5 h-3.5'
              />
            </button>
          </div>
          {modalList.length === 0 ? (
            <Empty />
          ) : (
            <div className='flex flex-col gap-5 py-[22px]'>
              {modalList.slice(0, 5).map((notification: INotification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                  setShowList={setShowList}
                />
              ))}
            </div>
          )}
          <Link
            href='/notifications'
            className={cn(
              'block py-2.5 rounded-[0_0_10px_10px] bg-lighthouse text-12 leading-[14px] text-center',
              modalList.length === 0 && 'text-alto'
            )}
            onClick={() => setShowList(false)}
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </div>
  )
}

export default NotificationModal

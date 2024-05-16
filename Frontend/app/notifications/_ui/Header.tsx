'use client'

import axios from '@/app/api/axios'
import { getListAllUpdated } from '@/app/api/definitions/notification'
import { setNotificationList, setNotificationModalList } from '@/lib/redux/slices/notifications'
import { RootState } from '@/lib/redux/store'
import { MarkAllReadIcon } from '@/public/notifications'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const list = useSelector((state: RootState) => state.notifications.list)
  const modalList = useSelector((state: RootState) => state.notifications.modalList)
  const dispatch = useDispatch()

  const readAllNotifications = () => {
    axios.post('/wp-json/notification/read_all_notification')

    dispatch(setNotificationList(getListAllUpdated(list)))
    dispatch(setNotificationModalList(getListAllUpdated(modalList)))
  }

  return (
    <div className='flex items-center justify-between mb-[30px]'>
      <h1 className='text-32 font-bold leading-[38px]'>Thông báo</h1>
      <button className='flex gap-2 items-center h-10 text-primary' onClick={readAllNotifications}>
        <MarkAllReadIcon className='w-6 h-6' />
        Đánh dấu tất cả đã đọc
      </button>
    </div>
  )
}

export default Header

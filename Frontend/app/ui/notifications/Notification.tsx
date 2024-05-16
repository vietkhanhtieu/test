import axios from '@/app/api/axios'
import {
  INotification,
  NotificationType,
  NotificationTypeLabel,
  getListOneUpdated
} from '@/app/api/definitions/notification'
import { setNotificationList, setNotificationModalList } from '@/lib/redux/slices/notifications'
import { RootState } from '@/lib/redux/store'
import { displayDateTimeLeft } from '@/lib/utils'
import { ClockIcon } from '@/public/notifications'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TicketTypeIcon from './TicketTypeIcon'
import TypeIcon from './TypeIcon'

interface Props {
  notification: INotification
  setShowList: Dispatch<SetStateAction<boolean>>
}

const Notification = (props: Props) => {
  // used for current component
  const { notification, setShowList } = props
  const { id, isRead, postDate, postTitle, type } = notification
  const modalList = useSelector((state: RootState) => state.notifications.modalList)

  const Icon = () => {
    return type === NotificationType.customer_care ? (
      <TicketTypeIcon notification={notification} />
    ) : (
      <TypeIcon notification={notification} />
    )
  }

  const PostTitle = () => {
    return type === NotificationType.customer_care ? (
      <h6 className='font-medium'>{postTitle}</h6>
    ) : (
      <>
        <h6 className='font-medium'>{NotificationTypeLabel[type]}</h6>
        <p>{postTitle}</p>
      </>
    )
  }

  // Re-render page list when read a notification
  const list = useSelector((state: RootState) => state.notifications.list)
  const dispatch = useDispatch()
  const router = useRouter()

  const readNotification = async () => {
    if (!isRead) {
      // Gray out the item
      dispatch(setNotificationModalList(getListOneUpdated(modalList, id)))
      dispatch(setNotificationList(getListOneUpdated(list, id)))

      // Close the modal and navigate
      setShowList(false)
      router.push('/notifications')

      await axios.post('/wp-json/notification/detail', { id: id })
    }
  }

  return (
    <div
      className='grid grid-cols-[44px_1fr] gap-1 items-center px-[13px] cursor-pointer'
      onClick={readNotification}
    >
      <Icon />
      <div className={`flex flex-col gap-1 text-12 leading-[14px] ${isRead && 'text-gray-40'}`}>
        <PostTitle />
        <div className='flex gap-2 items-center text-gray-40'>
          <Image src={ClockIcon} alt='clock' />
          {displayDateTimeLeft(postDate)}
        </div>
      </div>
    </div>
  )
}

export default Notification

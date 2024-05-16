import { INotification } from '@/app/api/definitions/notification'
import moment from 'moment'

import Icon from './Icon'

const Notification = ({ notification }: { notification: INotification }) => {
  const { isRead, postModified, postTitle, ticketDescriptionOcs, ticketOrderId, ticketStatusOcs } =
    notification

  const PostModified = () => {
    const dateTimeObject = moment(postModified)
    const timeString: string = dateTimeObject.format('HH:mm')
    const dateString: string = dateTimeObject.format('DD/MM/YYYY')

    return (
      <>
        <span className='mr-2'>{timeString}</span>|<span className='ml-2'>{dateString}</span>
      </>
    )
  }

  return (
    <>
      <Icon className='w-[70px] h-[70px] p-4 m-auto' notification={notification} />
      <div className={isRead ? 'text-gray-40' : ''}>
        <h5 className='mb-[5px] font-bold leading-[19px]'>{postTitle}</h5>
        <p className='text-14 leading-5'>
          ID #{ticketOrderId}
          <br />
          Trạng thái xử lí: <span className='text-dodger-blue'>{ticketStatusOcs}</span>
          <br />
          Thời gian: <PostModified />
          <br />
          <span className='text-stone-cairn'>{ticketDescriptionOcs}</span>
        </p>
      </div>
    </>
  )
}

export default Notification

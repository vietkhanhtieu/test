import { INotification, NotificationTicketType } from '@/app/api/definitions/notification'
import { ExchangeIcon, HandHeartIcon, ReturnIcon, SuggestProductIcon } from '@/public/notifications'

interface Props {
  className?: string
  notification: INotification
}

const TicketTypeIcon = (props: Props) => {
  const { isRead, ticketType } = props.notification
  const styles = props.className || 'w-[44px] h-[44px] p-2.5'

  const icons = {
    [NotificationTicketType.REQUEST_RETURN]: (
      <ReturnIcon stroke={isRead ? '#a7a9ac' : ''} className={styles} />
    ),
    [NotificationTicketType.REQUEST_EXCHANGE]: (
      <ExchangeIcon stroke={isRead ? '#a7a9ac' : ''} className={styles} />
    ),
    [NotificationTicketType.SUGGEST_PRODUCT]: (
      <SuggestProductIcon stroke={isRead ? '#a7a9ac' : ''} className={styles} />
    )
  }

  return icons[ticketType] || <HandHeartIcon />
}

export default TicketTypeIcon

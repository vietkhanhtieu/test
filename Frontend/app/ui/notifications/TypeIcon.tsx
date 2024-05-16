import { INotification, NotificationType } from '@/app/api/definitions/notification'
import {
  OrderUpdateIcon,
  PolicyIcon,
  PromotionIcon,
  SystemUpdateIcon
} from '@/public/notifications'

interface Props {
  className?: string
  notification: INotification
}

const TypeIcon = (props: Props) => {
  const { isRead, type } = props.notification
  const styles = props.className || 'w-[44px] h-[44px] p-2.5'

  const icons = {
    [NotificationType.order_update]: (
      <OrderUpdateIcon stroke={isRead ? '#a7a9ac' : ''} className={styles} />
    ),
    [NotificationType.policy_update]: (
      <PolicyIcon stroke={isRead ? '#a7a9ac' : ''} className={styles} />
    ),
    [NotificationType.promotion]: (
      <PromotionIcon stroke={isRead ? '#a7a9ac' : ''} className={styles} />
    ),
    [NotificationType.system_update]: (
      <SystemUpdateIcon stroke={isRead ? '#a7a9ac' : ''} className={styles} />
    ),
    [NotificationType.customer_care]: null // get icon by ticket_type instead
  }

  return icons[type]
}

export default TypeIcon

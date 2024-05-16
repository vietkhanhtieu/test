import { INotification, NotificationType } from '@/app/api/definitions/notification'
import TicketTypeIcon from '@/app/ui/notifications/TicketTypeIcon'
import TypeIcon from '@/app/ui/notifications/TypeIcon'

const Icon = ({ notification, className }: { notification: INotification; className?: string }) => {
  return notification.type === NotificationType.customer_care ? (
    <TicketTypeIcon notification={notification} className={className} />
  ) : (
    <TypeIcon notification={notification} className={className} />
  )
}

export default Icon

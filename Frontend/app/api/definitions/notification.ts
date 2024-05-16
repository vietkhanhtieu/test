import { cloneDeep, findIndex } from 'lodash'

//*** Interfaces ***/
export interface INotification {
  id: number
  isRead: boolean
  postDate: string
  postModified: string
  postTitle: string
  ticketDescriptionOcs: string
  ticketOrderId: string
  ticketStatusOcs: string
  ticketType: NotificationTicketType
  type: NotificationType
}

//*** Enums ***/
export enum NotificationTicketType {
  REQUEST_EXCHANGE = 'REQUEST_EXCHANGE',
  REQUEST_RETURN = 'REQUEST_RETURN',
  SUGGEST_PRODUCT = 'SUGGEST_PRODUCT'
}

export enum NotificationType {
  customer_care = 'customer_care',
  order_update = 'order_update',
  policy_update = 'policy_update',
  promotion = 'promotion',
  system_update = 'system_update'
}

export enum NotificationTypeLabel {
  order_update = 'Cập nhật đơn hàng',
  policy_update = 'Cập nhật chính sách',
  promotion = 'Khuyến mãi',
  system_update = 'Cập nhật hệ thống'
}

const mappingNotificationData = (response: any): INotification[] => {
  if (!response) return []

  return Object.values(response).map((value: any) => ({
    id: value.id,
    isRead: value.is_read,
    postDate: value.post_date,
    postModified: value.post_modified,
    postTitle: value.post_title,
    ticketDescriptionOcs: value.ticket_description_ocs,
    ticketOrderId: value.ticket_order_id,
    ticketStatusOcs: value.ticket_status_ocs,
    ticketType: value.ticket_type,
    type: value.type
  }))
}

const getListOneUpdated = (list: INotification[], id: number) => {
  const newList = cloneDeep(list)

  // Find index of current notification
  const index = findIndex(newList, ['id', id])

  if (index === -1) return []

  newList[index].isRead = true

  return newList
}

const getListAllUpdated = (list: INotification[]) => {
  const newList = cloneDeep(list)

  newList.map((notification: INotification) => {
    if (!notification.isRead) notification.isRead = true
  })

  return newList
}

export { mappingNotificationData, getListOneUpdated, getListAllUpdated }

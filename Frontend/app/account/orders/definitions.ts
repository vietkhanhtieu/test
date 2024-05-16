const statusMapping: any = {
  'wc-order-payment': 'Chưa thanh toán',
  'wc-order-waiting': 'Chờ xác nhận',
  'wc-order-confirm': 'Chờ lấy hàng',
  'wc-order-shipping': 'Đang giao',
  'wc-order-complete': 'Đã giao',
  'wc-order-cancel': 'Đã huỷ',
  'wc-order-return': 'Trả hàng',
  'wc-order-exchange': 'Đổi hàng'
}

const progressMapping: any = {
  order_created: 'Đặt đơn hàng thành công',
  order_waiting: 'Chờ người bán xác nhận',
  order_confirm: 'Đơn hàng đã được xác nhận. Người bán đang chuẩn bị',
  order_packed: 'Đơn hàng đã được đóng gói, chờ bàn giao cho đơn vị vận chuyển',
  order_issued: 'Đơn hàng đã bàn giao cho đơn vị vận chuyển',
  order_fail: 'Giao hàng chưa thành công',
  order_payment: 'Chưa thanh toán',
  order_cancel: 'Hủy đơn',
  order_return: 'Trả hàng',
  order_exchange: 'Đổi hàng',
  order_shipping: 'Đơn hàng đang giao',
  order_complete: 'Giao hàng thành công',
  handling: 'Đang xử lí',
  handled: 'Đã xử lý',
  complete: 'Hoàn thành',
  reject: 'Từ chối yêu cầu',
  received: 'Tiếp nhận yêu cầu'
}

export { statusMapping, progressMapping }

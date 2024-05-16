import { _fetch } from '@/app/actions'
import { IOrder } from '@/lib/types/order'

export async function POST(request: Request) {
  const data = await request.json()
  const response = await _fetch('/wp-json/order-management/reorder', 'POST', {
    order_id: data.orderId
  })
  let result = {}
  if (response.message == 'Successfully') {
    result = { message: response.message, products: response.data.product }
  } else {
    result = { message: 'Failed' }
  }
  return Response.json(result)
}

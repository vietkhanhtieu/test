import { _fetch } from '@/app/actions'

export async function POST() {
  const response = await _fetch(
    '/wp-json/order-management/list',
    'POST',
    { page: 1, limit: 12, status: [] },
    { tags: ['recentlyOrders'], revalidate: 3600 },
    'force-cache'
  )

  return Response.json(response)
}

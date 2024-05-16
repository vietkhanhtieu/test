import { _fetch } from '@/app/actions'

export async function POST() {
  const response = await _fetch('/wp-json/category/list-dashboard', 'POST')

  return Response.json(response)
}

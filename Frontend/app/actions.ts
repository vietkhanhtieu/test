import { USER_TOKEN_NAME } from '@/lib/constants'
import { cookies } from 'next/headers'

interface NextOptions {
  revalidate?: false | 0 | number
  tags?: string[]
}

const _fetch = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any,
  options: NextOptions = {},
  cache: 'force-cache' | 'no-store' = 'no-store'
) => {

  const request: RequestInit = {
    cache: cache,
    headers: {
      'Content-Type': 'application/json'
    },
    method,
    next: options
  }
  if (body) {
    request.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`https://localhost:7111/api${url}`, request)

    if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

    return response.json()
  } catch (error: any) {
    console.error(error)
    throw error
  }
}

export { _fetch }

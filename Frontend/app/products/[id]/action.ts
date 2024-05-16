'use server'

import { revalidateTag } from 'next/cache'

export default async function revalidateProduct() {
  revalidateTag('product')
}

import { signIn } from '@/lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next';
import { USER_TOKEN_NAME } from '@/lib/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, password } = req.body
    const userToken = await signIn({ username, password })

    res.status(200).json({ success: true, token: userToken })
  } catch (error: any) {
    console.log(error)
    if (error.type === 'CredentialsSignin') {
      res.status(401).json({ error: 'Invalid credentials.' })
    } else {
      res.status(500).json({ error: 'Something went wrong.' })
    }
  }
}

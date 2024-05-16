'use client'

import { RootState } from '@/lib/redux/store'
import { useSelector } from 'react-redux'

import { AuthenticatedHome, UnauthenticatedHome } from './ui/home'

const Page = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.currentUser)

  return isSignedIn ? <AuthenticatedHome /> : <UnauthenticatedHome />
}

export default Page

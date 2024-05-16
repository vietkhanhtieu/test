'use client'

import { WHITELIST_PATHS } from '@/lib/constants'
import {
  setFetching,
  setTermsAndConditionsMenuItems
} from '@/lib/redux/slices/terms_and_conditions'
import { setLoadingFetch, setUserCart } from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AuthenticatedHeader from './AuthenticatedHeader'
import UnauthenticatedHeader from './UnauthenticatedHeader'

const Header = () => {
  const dispatch = useDispatch()
  const pathname: string = usePathname()
  const { isSignedIn } = useSelector((state: RootState) => state.currentUser)

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch(setLoadingFetch(true))
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/get`
        )
        if (response.data.message === 'Successfully') {
          dispatch(setUserCart(response.data.data))
        }
      } catch (error) {
        console.error(error)
      }
      dispatch(setLoadingFetch(false))
    }

    const fetchTermsAndConditions = async () => {
      dispatch(setFetching({ fetching: true }))
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/footer/list`
        )
        if (response.data.message === 'Successfully') {
          dispatch(setTermsAndConditionsMenuItems({ items: response.data.data }))
        }
      } catch (error) {
        console.error(error)
      }
      dispatch(setFetching({ fetching: false }))
    }

    // always fetch new cart data to ensure the data is up-to-date
    if (isSignedIn) {
      fetchCartData()
      fetchTermsAndConditions()
    }
  }, [])

  return (
    <>{WHITELIST_PATHS.includes(pathname) ? <UnauthenticatedHeader /> : <AuthenticatedHeader />}</>
  )
}

export default Header

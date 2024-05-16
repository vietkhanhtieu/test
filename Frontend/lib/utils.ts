import { type ClassValue, clsx } from 'clsx'
import _ from 'lodash'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

import axios from './axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function SortProduct(value: string, listProducts: any) {
  switch (value) {
    case 'Mới nhất':
      return _.orderBy(listProducts, 'publicDate', 'desc')
    case 'Bán chạy':
      return _.orderBy(listProducts, 'bestSell', 'desc')
    case 'Giá cao đến thấp':
      return _.orderBy(listProducts, 'priceSale', 'desc')
    case 'Giá thấp đến cao':
      return _.orderBy(listProducts, 'priceSale')
    default:
      return listProducts
  }
}

export function formatVND(price: any) {
  if (price === undefined || price === null || price === '') return null
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
}

export const NormalizeVietnameseText = (input: string): string => {
  const words: string[] = input.split(' ')
  const normalizedWords = words.map((word, i) => {
    const characters: string[] = word.split('')
    const normalizedCharacters: string[] = characters.map((char, index) => {
      if ((index === 0 && i === 0) || (words[i - 1] === '-' && index === 0)) {
        return char.toUpperCase()
      } else {
        return char.toLowerCase()
      }
    })
    return normalizedCharacters.join('')
  })
  return normalizedWords.join(' ')
}

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleanedNumber = phoneNumber.replace(/\D/g, '')

  const withCountryCode = cleanedNumber.startsWith('0')
    ? '+84' + cleanedNumber.slice(1)
    : cleanedNumber

  return withCountryCode.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
}

export const formatAddress = (addresses: any[], type: string) => {
  const filteredAddresses = addresses.filter(Boolean)

  return filteredAddresses.map((item) => item.trim()).join(type)
}

export const copy = (item: any) => {
  navigator.clipboard.writeText(item)
}

export const requestValidateKeyword = async (data: { paragraph: string[] }): Promise<any> => {
  const checkValidKeywordResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/validate/keyword`,
    data
  )
  const response = checkValidKeywordResponse.data

  return Promise.resolve(response)
}

export const toNonAccentVietnamese = (str: string) => {
  str = str.toLowerCase()

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')

  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư

  return str
}

export const displayDateTimeLeft = (date: string | undefined): string | null => {
  if (!date) {
    return null
  }

  const now = moment()
  const dateTimeLeft = moment(date)

  const diffInMilliseconds = dateTimeLeft.diff(now)

  if (diffInMilliseconds <= 0) {
    // Show date if expired
    return dateTimeLeft.format('DD/MM/YYYY')
  }

  // in milliseconds
  const minute: number = 60000
  const hour: number = 3600000
  const day: number = 86400000

  if (diffInMilliseconds < hour) {
    // Less than 1 hour
    const minutes = Math.floor(diffInMilliseconds / minute)
    return `Còn ${minutes} phút`
  } else if (diffInMilliseconds <= day) {
    // Less than 1 day
    const hours = Math.floor(diffInMilliseconds / hour)
    const minutes = Math.floor((diffInMilliseconds % hour) / minute)
    return `Còn ${hours} giờ ${minutes} phút`
  }

  return dateTimeLeft.format('DD/MM/YYYY')
}

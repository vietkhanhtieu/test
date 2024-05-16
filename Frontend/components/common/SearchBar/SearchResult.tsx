'use client'

import Spinner from '@/components/ui/spinner'
import { setSearchKey } from '@/lib/redux/slices/search_results'
import { RootState } from '@/lib/redux/store'
import { ISearchResult } from '@/lib/types/search_result'
import match from 'autosuggest-highlight/match'
import { capitalize, result } from 'lodash'
import { uniqBy } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

interface Props {
  searchKey: string
  results: ISearchResult[]
  suggestedProducts: any
  searching: boolean
  showSearchResults: boolean
  searchType: string
  searchHistory: string[]
  setSearchValue: (arg0: string) => void
  removeAllHistory: () => void
  removeHistory: (arg0: string) => void
  handleCloseSearchResults: (agr0?: boolean) => void
  handleClickSearch: () => void
  handleOnFocusSearch: () => void
  setIsInsideSearchArea: (arg0: boolean) => void
}

interface ModifiedResult {
  label: string
  id: string
  type: string
}

export const SearchResult: React.FC<Props> = ({
  suggestedProducts,
  searchKey,
  results,
  searching,
  searchHistory,
  showSearchResults,
  searchType,
  setSearchValue,
  handleClickSearch,
  removeAllHistory,
  removeHistory,
  handleCloseSearchResults,
  setIsInsideSearchArea
}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const modifyName = (result: ModifiedResult) => {
    const name = result.label
    if (!name || !searchKey) {
      return ''
    }
    let newName = name
    const matches = match(newName, searchKey, { insideWords: true })

    if (matches.length) {
      matches.forEach((matchIndexes: any) => {
        const matchString = name.slice(matchIndexes[0], matchIndexes[1])
        newName = newName.replace(
          matchString,
          "<span class='text-primary font-medium underline decoration-1'>" + matchString + '</span>'
        )
      })
    }

    if (!searchType) {
      // handle for searching all
      newName = newName + ` - trong ${getSearchType(result.type)}`
    }
    return newName
  }

  const getSearchType = (type: string) => {
    switch (type) {
      case 'tentm':
        return 'Tên thương mại'
      case 'tenhc':
        return 'Hoạt chất'
      case 'tenndt':
        return 'Nhóm điều trị'
      case 'tennsx':
        return 'Nhà sản xuất'
      case 'hamLuong':
        return 'Hàm lượng'
      default:
        ''
    }
  }

  const getUnit = (donViTinh: string) => {
    return capitalize(donViTinh.split(',')[0])
  }

  const matchString = (inputString: string) => {
    return match(inputString, searchKey, { insideWords: true })
  }

  const findResultNameAndType = (result: ISearchResult) => {
    if (searchKey) {
      if (matchString(result.tenThuongMai).length) {
        return { label: result.tenThuongMai, type: 'tentm' }
      }
      if (matchString(result.tenHoatChat).length) {
        return { label: result.tenHoatChat, type: 'tenhc' }
      }
      if (matchString(result.nhomDieuTri?.tenNhomDieuTri).length) {
        return { label: result.nhomDieuTri?.tenNhomDieuTri, type: 'tenndt' }
      }
      if (matchString(result.nhaSanXuat?.tenVietGon).length) {
        return { label: result.nhaSanXuat?.tenVietGon, type: 'tennsx' }
      }
      if (matchString(result.hoatChatHamLuong).length) {
        return { label: result.hoatChatHamLuong, type: 'hamLuong' }
      }
    } else {
      return ''
    }
  }

  const getResultNameAndType = (result: ISearchResult) => {
    switch (searchType) {
      case 'tentm':
        return { label: result.tenThuongMai, type: 'tentm' }
      case 'tenhc':
        return { label: result.tenHoatChat, type: 'tenhc' }
      case 'tenndt':
        return { label: result.nhomDieuTri?.tenNhomDieuTri, type: 'tenndt' }
      case 'tennsx':
        return { label: result.nhaSanXuat?.tenVietGon, type: 'tennsx' }
      case 'hamLuong':
        return { label: result.hoatChatHamLuong, type: 'hamLuong' }
      default:
        return findResultNameAndType(result)
    }
  }

  const modifyResults = (results: ISearchResult[]) => {
    let newResults = results.map((result) => {
      return { ...getResultNameAndType(result), id: result.id }
    })
    return uniqBy(newResults, 'label')
  }

  const handleOnMouseEnter = () => {
    setIsInsideSearchArea(true)
  }

  const handleOpenResultDetails = (result: ModifiedResult) => {
    handleCloseSearchResults(true)
    setSearchValue(result.label)
    switch (searchType) {
      case 'tentm':
        router.push(`/products/${result.id}`)
        return
      default:
        let type = searchType || result.type
        if (type === 'tentm') {
          router.push(`/products/${result.id}`)
        } else {
          router.push(`/tim-kiem?keyword=${result.label}&type=${type}`)
          dispatch(setSearchKey(result.label))
        }
        return
    }
  }

  const handleOpenProductDetail = (productId: string | number) => {
    handleCloseSearchResults(true)
    router.push(`/products/${productId}`)
  }

  const handleOnSelectHistoryItem = (item: string) => {
    setSearchValue(item)
    router.push(`/tim-kiem?keyword=${item}&type=${searchType}`)
    dispatch(setSearchKey(item))
    handleCloseSearchResults(true)
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  return (
    <div
      onMouseEnter={handleOnMouseEnter}
      tabIndex={0}
      className={`absolute ${showSearchResults ? 'block' : 'hidden'} top-[42px] z-50 shadow-xl left-0 w-[98%] max-w-[571px] bg-white text-abbey rounded-b-lg`}
    >
      {searching && (
        <div className='flex justify-center pt-2 pb-1'>
          <Spinner size='md' />
        </div>
      )}
      {!searching && !searchKey.length && !!searchHistory.length && (
        <>
          <div className='p-4 px-2 font-semibold text-16 flex items-center justify-between border-b-[0.5px]'>
            <div>Lịch sử</div>
            <button
              className='w-[71px] text-12 flex items-center justify-between font-normal'
              onClick={removeAllHistory}
            >
              <div className='w-[13px] h-[13px] flex items-center'>
                <Image
                  alt='trash bin'
                  src='/icons/trash-bin.svg'
                  height={0}
                  width={0}
                  style={{ width: '13px', height: '13px' }}
                />
              </div>
              Xoá tất cả
            </button>
          </div>
          <ul className='flex flex-col-reverse'>
            {searchHistory.map((item: any, index: number) => {
              return (
                <li
                  key={index}
                  className='px-[15px] cursor-pointer hover:bg-accent flex flex-1 items-center'
                >
                  <div
                    className='p-1 pl-0 rounded flex w-full'
                    onClick={() => handleOnSelectHistoryItem(item)}
                  >
                    <Image alt='history Icon' src='/icons/history-ico.svg' height={20} width={20} />
                    <div className='ms-1 text-14 text-abbey'>{item}</div>
                  </div>
                  <div
                    onClick={() => removeHistory(item)}
                    className='w-5 h-5 flex items-center justify-center'
                  >
                    <Image
                      alt='cross Icon'
                      src='/icons/cross.svg'
                      height={0}
                      width={0}
                      className=''
                      style={{ width: '10px', height: '10px' }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
      {!searching && !!results.length && (
        <ul className='mt-2'>
          {modifyResults(results).map((result, index) => {
            const modifiedName = modifyName(result as ModifiedResult)
            return (
              <li
                key={index}
                onClick={() => handleOpenResultDetails(result as ModifiedResult)}
                className='px-[15px] cursor-pointer hover:bg-accent leading-5'
              >
                {modifiedName ? (
                  <div className='py-[5px] rounded flex'>
                    <Image
                      alt='Search Icon'
                      src='/icons/search-ico-orange.svg'
                      height={20}
                      width={19}
                    />
                    <div
                      className='ms-1 text-14 text-abbey'
                      dangerouslySetInnerHTML={{ __html: modifiedName }}
                    ></div>
                  </div>
                ) : (
                  <></>
                )}
              </li>
            )
          })}
        </ul>
      )}
      {!!suggestedProducts.length && (
        <>
          <div className='p-4 font-semibold text-16 leading-5'>Đề xuất tìm kiếm</div>
          <ul>
            {suggestedProducts.map((result: ISearchResult, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => handleOpenProductDetail(result.id)}
                  className='px-[15px] py-2.5 cursor-pointer hover:bg-accent border-t-[0.5px] border-alto last:rounded-b-lg'
                >
                  <div className='flex items-center'>
                    <div className='w-[60px] h-[60px] bg-white flex items-center'>
                      {/* eslint-disable @next/next/no-img-element */}
                      {/* This is a download link, <Image /> raises error */}
                      <img src={result.hinhAnh} alt='' className='w-full h-auto' />
                    </div>
                    <div className='ms-4'>
                      <div className='text-16'>
                        {result.title} ({result.packing})
                      </div>
                      <div className='text-16'>
                        <span className='font-bold'>{formatPrice(result.sale_price)}đ&#160;</span>
                        {!!result.donViTinh && (
                          <span className='text-12 font-normal text-gray-40 mt-1'>
                            / {getUnit(result.donViTinh)}
                          </span>
                        )}
                        {result.regular_price !== result.sale_price && (
                          <span className='text-12 text-gray-40 ml-2 line-through'>
                            {formatPrice(result.regular_price)}đ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
      <div
        onClick={handleClickSearch}
        className='text-14 text-primary flex items-center justify-center p-4 border-t-[0.5px] border-alto cursor-pointer h-[47px]'
      >
        Xem tất cả
        <Image
          src={'/icons/right-arrow-orange.svg'}
          width={6}
          height={12}
          alt='right-arrow-orange'
          className='ms-1'
        />
      </div>
    </div>
  )
}

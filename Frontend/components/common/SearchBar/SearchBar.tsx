'use client'

import ClearSearch from '@/components/icons/clearSearch.svg'
import SearchIcon from '@/components/icons/searchIcon.svg'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import { clearSearch, setSearchKey, storeSearchResults } from '@/lib/redux/slices/search_results'
import { RootState } from '@/lib/redux/store'
import { getCookie, setCookie } from 'cookies-next'
import { uniq } from 'lodash'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Select, {
  ActionMeta,
  DropdownIndicatorProps,
  GroupBase,
  MultiValue,
  OptionProps,
  SingleValue,
  components
} from 'react-select'
import { useDebounce } from 'use-debounce'

import { SearchResult } from './SearchResult'
import './select.css'

interface IOption {
  readonly value: string
  readonly label: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const ClearIcon = ({ value, resetValue }: { value: string; resetValue: () => void }) => {
  if (value.length === 0) return null

  return (
    <Button
      className='absolute right-[46px] top-0 bg-transparent hover:bg-transparent'
      onClick={resetValue}
    >
      <Image src={ClearSearch} alt='Reset search button' />
    </Button>
  )
}

export const SearchBar: React.FC = () => {
  const searchParams = useSearchParams()
  const isSignedIn = useSelector((state: RootState) => state.currentUser.isSignedIn)
  const router = useRouter()
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('keyword') || '')
  const pathname: string | null = usePathname()
  const [searchType, setSearchType] = useState<string>(searchParams.get('type') || '')
  const [debouncedSearchValue] = useDebounce(searchValue, 500)
  const [suggestedProducts, setSuggestedProducts] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false)
  const [isInsideSearchArea, setIsInsideSearchArea] = useState<boolean>(false)
  const [searching, setSearching] = useState<boolean>(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const searchBarRef = useRef<HTMLDivElement>(null)
  const [placeholderText, setPlaceholderText] = useState<string>('Tìm kiếm tất cả trong bộ lọc')

  const dispatch = useDispatch()

  const handleInputChange = (value: string) => {
    setSearchValue(value)
  }

  const handleOnFocusSearch = () => {
    setShowSearchResults(true)
  }

  const handleCloseSearchResults = (force: boolean = false) => {
    if (!isInsideSearchArea || !!force) {
      setShowSearchResults(false)
    }
  }

  useEffect(() => {
    if ('/tim-kiem' !== pathname && !pathname.includes('/products/')) {
      setSearchValue('')
    }
  }, [pathname])

  useEffect(() => {
    const searchByKey = async () => {
      setSearching(true)
      const bodySearch = {
        keyword: debouncedSearchValue,
        type: searchType
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/search/search-dashboard-new`,
        bodySearch
      )

      const productsList = response.data.data.list_product.data

      if (searchValue) {
        setSearchResults(productsList)
        setSearching(false)
      }
    }

    if (!debouncedSearchValue) {
      setSearchResults([])
    } else {
      searchByKey()
    }
  }, [searchType, debouncedSearchValue])

  useEffect(() => {
    if (!searchValue.length) {
      setSearchResults([])
      setSearching(false)
    }
  }, [searchValue])

  useEffect(() => {
    const fetchSuggestionProducts = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/search/search-dashboard-new`,
        {
          keyword: 'adsfsdf', // API issue: we use random keyword so we can get most searched products
          most_search: true
        }
      )

      //only display top 3 products
      setSuggestedProducts(response.data.data.most_searched.slice(0, 3))
    }

    if (!suggestedProducts.length) {
      fetchSuggestionProducts()
    }
  }, [])

  const handleClickSearch = () => {
    if (isSignedIn) {
      if (searchValue) {
        saveSearchHistory()
      }
      setShowSearchResults(false)
      router.push(`/tim-kiem?keyword=${searchValue}&type=${searchType}`)
      dispatch(setSearchKey(searchValue))
    } else {
      router.push('/login')
    }
  }

  const saveSearchHistory = () => {
    let searchHistory = JSON.parse(getCookie('searchHistory') || '[]')
    searchHistory.push(searchValue)
    searchHistory = uniq(searchHistory)
    if (searchHistory?.length > 3) {
      searchHistory = searchHistory.slice(1, 4)
    }
    setCookie('searchHistory', JSON.stringify(searchHistory))
    setSearchHistory(searchHistory)
  }

  useEffect(() => {
    const history = JSON.parse(getCookie('searchHistory') || '[]')
    setSearchHistory(history)
  }, [])

  const removeAllHistory = () => {
    setCookie('searchHistory', '[]')
    setSearchHistory([])
  }

  const removeHistory = (h: string) => {
    setSearchHistory(searchHistory.filter((i) => i !== h))
    let history = JSON.parse(getCookie('searchHistory') || '[]')
    history = history.filter((i: string) => i !== h)

    setCookie('searchHistory', JSON.stringify(history))
  }

  const menuOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Tên thương mại', value: 'tentm' },
    { label: 'Hoạt chất', value: 'tenhc' },
    { label: 'Nhóm điều trị', value: 'tenndt' },
    { label: 'Nhà sản xuất', value: 'tennsx' },
    { label: 'Hàm lượng', value: 'hamLuong' }
  ]

  const DropdownIndicator = (props: DropdownIndicatorProps<IOption, false, GroupBase<IOption>>) => {
    return (
      <div className='!pe-[8px] select__indicators'>
        <div className='select__indicator select__dropdown-indicator' aria-hidden='true'>
          <Image
            className='cursor-pointer'
            alt='chevron-down icon'
            src={`${props.selectProps.menuIsOpen ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'}`}
            height={12}
            width={12}
          />
        </div>
      </div>
    )
  }

  const Option = (props: OptionProps<IOption>) => {
    return (
      <components.Option
        {...props}
        className={`!text-abbey !cursor-pointer !bg-white ${props.isSelected ? '!text-primary' : ''} !py-0 font-normal last:rounded-[10px]`}
      >
        <div className='py-2'>{props.label}</div>
        <div className='mx-[19px] border-b-[0.5px]'></div>
      </components.Option>
    )
  }

  const handleOnSelectSearchType = (
    newValue: SingleValue<IOption> | MultiValue<IOption>,
    actionMeta: ActionMeta<IOption>
  ) => {
    const value = newValue as SingleValue<IOption>
    setSearchType(value?.value || '')
  }

  const handleOnMouseLeave = () => {
    setIsInsideSearchArea(false)
  }

  const handleOnMouseEnter = () => {
    setIsInsideSearchArea(true)
  }

  // if click outside search bar, close the search results
  useEffect(() => {
    const closeSearchResults = (e: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
        handleCloseSearchResults(true)
      }
    }

    document.addEventListener('click', closeSearchResults)

    return () => {
      document.removeEventListener('click', closeSearchResults)
    }
  }, [])

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClickSearch()
    }
  }

  //change placeholder depending on searchType
  useEffect(() => {
    const placeholder = menuOptions.find((o) => o.value === searchType)?.label
    if (placeholder) {
      if (placeholder === 'Tất cả') {
        setPlaceholderText('Tìm kiếm tất cả trong bộ lọc')
      } else {
        setPlaceholderText(`Tìm kiếm theo ${placeholder.toLowerCase()}`)
      }
    }
  }, [searchType])

  return (
    <div className='relative flex w-full lg:max-w-[725px]' ref={searchBarRef}>
      <Select
        className='!font-roboto'
        classNamePrefix='select'
        defaultValue={menuOptions.find((o) => o.value === searchType)}
        name='type'
        options={menuOptions}
        isSearchable={false}
        autoFocus={false}
        components={{ DropdownIndicator, Option }}
        onChange={handleOnSelectSearchType}
        classNames={{
          control: (state: any) => {
            return `!w-[138px] ${state.menuIsOpen ? '!rounded-bl-none' : ''} !outline-none !border-2 !border-white !shadow-none !min-h-[40px] !bg-secondary !rounded-1xl !rounded-br-none !rounded-tr-none`
          },
          valueContainer: () =>
            '!ms-1 text-center !p-0 !rounded-[10px] !rounded-br-none !rounded-tr-none !text-abbey !text-14 !leading-4',
          menu: () =>
            '!mt-0.5 !w-[135px] !border !border-primary !shadow-lg !rounded-[10px] !rounded-tl-none !rounded-tr-none',
          menuList: () => 'text-center text-14 text-abbey !p-0'
        }}
        styles={{
          singleValue: (provided) => ({
            ...provided,
            color: '#4d4d4f'
          })
        }}
      />
      <div
        className='w-full relative'
        onMouseLeave={handleOnMouseLeave}
        onMouseEnter={handleOnMouseEnter}
        tabIndex={0}
      >
        <input
          type='text'
          placeholder={placeholderText}
          className='border-alto flex text-abbey h-10 w-full bg-background pl-4 pr-12 py-2 ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-full rounded-tl-none rounded-bl-none border-l-transparent placeholder-gray-40'
          onChange={(e) => handleInputChange(e.target.value)}
          value={searchValue}
          onFocus={() => handleOnFocusSearch()}
          onKeyUp={handleEnterKey}
        />
        {isSignedIn && (
          <SearchResult
            searchKey={searchValue}
            results={searchResults}
            suggestedProducts={suggestedProducts}
            searching={searching}
            searchHistory={searchHistory}
            showSearchResults={showSearchResults}
            searchType={searchType}
            setSearchValue={setSearchValue}
            removeAllHistory={removeAllHistory}
            removeHistory={removeHistory}
            handleOnFocusSearch={handleOnFocusSearch}
            handleCloseSearchResults={handleCloseSearchResults}
            setIsInsideSearchArea={setIsInsideSearchArea}
            handleClickSearch={handleClickSearch}
          />
        )}
      </div>
      <ClearIcon value={searchValue} resetValue={() => setSearchValue('')} />
      <div onClick={handleClickSearch}>
        <Image
          className='absolute right-1 top-1 h-8 w-8 rounded-full bg-primary p-2 cursor-pointer'
          alt='Search Icon'
          src={SearchIcon}
          height={20}
          width={20}
        />
      </div>
    </div>
  )
}

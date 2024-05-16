import {
  IFilterOptions,
  ISortOption,
  setFilterOptions,
  setSortOption
} from '@/lib/redux/slices/product_actions'
import { RootState } from '@/lib/redux/store'
import _ from 'lodash'
import { useState } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dosageFormOptions, ingredientContentOptions, priceOptions } from './definitions'
import type { ICheckboxOption } from './definitions'

const getOptionList = (type: string): ICheckboxOption[] => {
  switch (type) {
    case 'activeIngredientConcentration':
      return ingredientContentOptions
    case 'dosageForm':
      return dosageFormOptions
    default:
      return priceOptions
  }
}

//*=== for Price *
interface IPriceRangeMapping {
  under_100: number[]
  between_100_and_300: number[]
  between_300_and_500: number[]
  above_500: number[]
  [key: string]: number[]
}

const priceRangeMapping: IPriceRangeMapping = {
  under_100: [0, 100000],
  between_100_and_300: [100000, 300000],
  between_300_and_500: [300000, 500000],
  above_500: [500000, Infinity],
  other: []
}

const mapPriceRanges = (ids: string[]): number[][] => {
  return ids.map((id) => priceRangeMapping[id]).filter((range) => range.length !== 0)
}
// * for Price *===

const useDropdown = (type: string, defaultOptions?: ICheckboxOption[] | undefined) => {
  // defaultOptions is a list options from API
  // If it's undefined, use mock data
  if (!defaultOptions) {
    defaultOptions = getOptionList(type)
  }

  const [options, setOptions] = useState<ICheckboxOption[]>(defaultOptions)

  //*=== Filter / Sort *
  const dispatch = useDispatch()
  const filterOptions = useSelector((state: RootState) => state.productActions.filterOptions)
  // * Filter / Sort *===

  //*=== for Price *
  const [fromPrice, setFromPrice] = useState<string>('')
  const [toPrice, setToPrice] = useState<string>('')
  // * for Price *===

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = _.cloneDeep(options)

    const optionIndex = updatedOptions.findIndex((obj) => obj.id === e.target.id)

    updatedOptions[optionIndex].checked = e.target.checked

    setOptions(updatedOptions)

    // PriceDropdown only
    if (type === 'price') {
      // Reset input values when uncheck "other" option
      const otherOption: ICheckboxOption | undefined = updatedOptions.find(
        (item) => item.id === 'other'
      )

      if (otherOption?.checked) {
        document.getElementById('fromPrice')?.focus()
      } else {
        setFromPrice('')
        setToPrice('')
      }
    }

    filter(updatedOptions)
  }

  const onClickResetFilter = (e: MouseEvent<HTMLDivElement>) => {
    setOptions(defaultOptions)
    filter(defaultOptions)

    if (type === 'price') {
      setFromPrice('')
      setToPrice('')
    }
  }

  const filter = (updatedOptions: ICheckboxOption[]) => {
    const checkedOptions: ICheckboxOption[] = updatedOptions.filter((option) => option.checked)
    const cloneFilterOptions: IFilterOptions = _.cloneDeep(filterOptions)

    if (type !== 'price') {
      const labels: string[] = checkedOptions.map((option) => option.label)
      cloneFilterOptions[type] = labels
    } else {
      const ids = checkedOptions.map((option) => option.id)

      // [[0, 100], [100, 300], [300, 500], [500, Infinity]]
      cloneFilterOptions.price.fixedRange = mapPriceRanges(ids)

      const checkedOtherOption = checkedOptions.filter((option) => option.id === 'other')

      // If uncheck other option, remove custom price range filter
      if (!checkedOtherOption.length) cloneFilterOptions.price.customRange = []
    }

    dispatch(setFilterOptions(cloneFilterOptions))
  }

  const sort = (type: string, order: 'asc' | 'desc' | null) => {
    const option: ISortOption = {
      [type]: order
    }

    dispatch(setSortOption(option))
  }
  // * Filter / Sort *===

  return {
    options,
    fromPrice,
    setFromPrice,
    toPrice,
    setToPrice,
    onChangeCheckbox,
    onClickResetFilter,
    sort
  }
}

export default useDropdown

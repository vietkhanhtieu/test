import { IFilterPrice, setInitialProductActions } from '@/lib/redux/slices/product_actions'
import { RootState } from '@/lib/redux/store'
import _ from 'lodash'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { IProductListProps } from '../ui/TableProduct'

const isEmptyPriceRange = (priceObject: IFilterPrice): boolean => {
  return priceObject.fixedRange.length === 0 && priceObject.customRange.length === 0
}

const verifiedFixedPriceRange = (ranges: number[][], value: number): boolean => {
  // ranges like [[0, 100], [100, 300], [300, 500], [500, Infinity]]

  // Loop through each range in the array
  for (const range of ranges) {
    // Check if the value falls within the current range
    if (range[0] <= value && value <= range[1]) {
      // If it's within the range, return true
      return true
    }
  }

  // If no match is found, return false
  return false
}

const useFilter = (
  productList: IProductListProps[],
  filteredProducts: IProductListProps[],
  setFilteredProducts: Dispatch<SetStateAction<IProductListProps[]>>
) => {
  const productActions = useSelector((state: RootState) => state.productActions)
  const filterOptions = productActions.filterOptions
  const sortOption = productActions.sortOption

  const verifyFilter = (product: IProductListProps): boolean => {
    const filteredOptions = Object.fromEntries(
      Object.entries(filterOptions).filter(([key, value]) => {
        if (key === 'price') {
          return !isEmptyPriceRange(value) // Filter price with both ranges empty
        } else {
          return value.length > 0 // Filter empty arrays
        }
      })
    )

    // ['treatmentGroup', 'activeIngredientConcentration', 'dosageForm', 'price']
    const filterKeys: string[] = Object.keys(filteredOptions)

    for (const key of filterKeys) {
      let optionList = filteredOptions[key]
      let value = product[key]

      if (!value) return false

      if (key !== 'price') {
        if (key === 'treatmentGroup') {
          optionList = optionList.map((option: string) => option.toUpperCase())
        }

        if (!optionList.includes(value)) {
          return false
        }
      } else {
        if (product.priceSale && product.priceSale > 0) value = product.priceSale

        const fixedRange: number[][] = optionList.fixedRange
        const customRange: number[] = optionList.customRange

        // If both ranges are empty, does not filter
        if (!fixedRange.length && !customRange.length) return true

        let verifiedCustomPriceRange: boolean

        // customRange = [min, max]
        if (customRange[1] === Infinity) {
          verifiedCustomPriceRange = customRange[0] <= Number(value)
        } else {
          verifiedCustomPriceRange =
            customRange[0] <= Number(value) && Number(value) <= customRange[1]
        }

        // filter "value" between fixedRange and customRange
        return verifiedFixedPriceRange(fixedRange, Number(value)) || verifiedCustomPriceRange
      }
    }

    return true
  }

  const filter = () => {
    if (productList.length) {
      const filteredProducts = productList.filter((product: IProductListProps) =>
        verifyFilter(product)
      )

      setFilteredProducts(filteredProducts)
    }
  }

  const sort = () => {
    if (filteredProducts.length && Object.keys(sortOption).length) {
      const sortedProducts = _.orderBy(
        filteredProducts,
        Object.keys(sortOption)[0],
        Object.values(sortOption)[0]
      )

      setFilteredProducts(sortedProducts)
    }
  }

  const dispatch = useDispatch()

  // Reset filter / sort options by default
  useEffect(() => {
    dispatch(setInitialProductActions())
  }, [])

  useEffect(() => {
    filter()
  }, [filterOptions])

  useEffect(() => {
    sort()
  }, [sortOption])

  return {
    filter,
    sort
  }
}

export default useFilter

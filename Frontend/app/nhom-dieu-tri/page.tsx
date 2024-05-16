'use client'

// import { MoleculeIcon } from '@/public/icons/index'
import Spinner from '@/components/ui/spinner'
import { NormalizeVietnameseText } from '@/lib/utils'
import axios from 'axios'
import { groupBy } from 'lodash'
import { useEffect, useState } from 'react'

import { Breadcrumb, PromotionCarousel } from '../ui'
import { Banner } from './Banner'
import { TreatmentGroup } from './TreatMentGroup'
import './style.css'

export interface ITreatmentItem {
  name: string
  groupName: string
  groupSlug: string
  icon: string
  products: any
  hide: number
}

export default function NhomDieuTri() {
  const [loading, setLoading] = useState<boolean>(false)
  const [listMedicine, setListMedicine] = useState<ITreatmentItem[]>([])

  useEffect(() => {
    const fetchTreatmentData = async () => {
      try {
        setLoading(true)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/get/treatment-new`
        )
        if (response.data.message === 'Successfully') {
          const data = response.data.data.map((item: any) => {
            return {
              name: NormalizeVietnameseText(item.name),
              groupName: item.group_name,
              icon: item.icon,
              products: item.sanPhamKinhDoanhs,
              hide: item.hide,
              groupSlug: item.group_slug
            }
          })
          const groups = groupBy(data, 'groupSlug')
          const groupThuoc = groups['thuoc']

          if (groups['null']) {
            groupThuoc.push(groups['null'][0])
          }

          setListMedicine(groupThuoc ? groupThuoc : [])
        }
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    fetchTreatmentData()
  }, [])

  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Nhóm điều trị', url: '/nhom-dieu-tri' }
        ]}
      />
      <div className='container'>
        <Banner />
      </div>
      <div className='container gap-[42px] flex flex-col'>
        {loading ? (
          <div className='flex items-center justify-center my-8'>
            <Spinner size='lg' />
          </div>
        ) : (
          <TreatmentGroup groupName={'Thuốc'} items={listMedicine} />
        )}
        <div
          className={`w-full h-[144px] rounded-lg bg-[url('/image-group-treatment.png')] bg-no-repeat bg-[length:200%_100%] md:bg-full-size`}
        ></div>
        <TreatmentGroup groupName={'Thực phẩm chức năng'} items={[]} />
        <PromotionCarousel />
      </div>
    </>
  )
}

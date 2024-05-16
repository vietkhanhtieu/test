import { Metadata } from 'next'

import { Breadcrumb } from '../ui'
import Header from './_ui/Header'
import Tabs from './_ui/Tabs'
import './styles.css'

export const metadata: Metadata = {
  title: 'Gonsa - Danh sách thông báo',
  description: 'Gonsa - Danh sách thông báo'
}

const Page = async () => {
  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Thông báo', url: '/notifications' }
        ]}
      />
      <section className='notifications container mt-10 mb-[100px]'>
        <Header />
        <Tabs />
      </section>
    </>
  )
}

export default Page

import { Metadata } from 'next'

import { Banner } from '../nhom-dieu-tri/Banner'
import { Breadcrumb } from '../ui'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Gonsa - Liên hệ',
  description: 'Gonsa - Liên hệ'
}

const Page = () => {
  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Liên hệ', url: '/lien-he' }
        ]}
      />
      <div className='container pb-1'>
        <Banner />
        <div className='bg-white py-[50px] lg:px-[147px] px-[20px] rounded-[10px]'>
          <p className='text-[28px] text-center font-bold leading-[33px] mb-[19px]'>
            Bạn cần được hỗ trợ hay hợp tác với Trung Tâm Dược Phẩm?
          </p>
          <p className='text-16 text-center leading-[22px] font-normal'>
            Hãy liên hệ với bộ phận <strong>CSKH</strong> của chúng tôi qua số{' '}
            <strong>Hotline: 028.7779.6768</strong> hoặc để lại lời nhắn theo biểu mẫu dưới đây.
          </p>
          <p className='text-16 text-center leading-[22px] font-normal'>
            Chúng tôi sẽ hỗ trợ bạn nhanh nhất có thể !
          </p>
          <ContactForm />
        </div>
      </div>
    </>
  )
}

export default Page

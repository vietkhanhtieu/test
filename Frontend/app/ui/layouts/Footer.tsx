'use client'

import { Button } from '@/components/ui/button'
import { ZALO_URL } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer id='footer' className='bg-white'>
      <Button
        onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
        className='block w-full h-9 mx-auto bg-primary'
      >
        Trở về đầu trang
      </Button>
      <div className='container text-abbey pt-[50px] pb-4'>
        <div className='mx-auto flex flex-col justify-between gap-5 md:flex-row'>
          <div>
            <div className='mb-4 font-semibold uppercase'>Tài khoản</div>
            <ul className='flex flex-col gap-2 text-xs'>
              <li>
                <Link href='#'>Tài khoản</Link>
              </li>
              <li>
                <Link href='#'>Đơn hàng của tôi</Link>
              </li>
              <li>
                <Link href='#'>Sản phẩm yêu thích</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className='mb-4 font-semibold uppercase'>Hỗ trợ</div>
            <ul className='flex flex-col gap-2 text-xs'>
              <li>
                <Link href='#'>Quy trình giải quyết khiếu nại</Link>
              </li>
              <li>
                <Link href='#'>Quy trình đổi trả và hoàn tiền</Link>
              </li>
              <li>
                <Link href='#'>Quyền, nghĩa vụ của khách hàng</Link>
              </li>
              <li>
                <Link href='#'>Chính sách bảo mật thông tin</Link>
              </li>
              <li>
                <Link href='#'>Quy chế Sàn Thương Mại Điện Tử</Link>
              </li>
              <li>
                <Link href='#'>Hướng dẫn đặt đơn hàng</Link>
              </li>
              <li>
                <Link href='#'>Hướng dẫn đăng ký</Link>
              </li>
              <li>
                <Link href='#'>Quy trình hủy đơn hàng</Link>
              </li>
              <li>
                <Link href='#'>Điều khoản sử dụng</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className='mb-4 font-semibold uppercase'>Theo dõi tại</div>
            <div className='flex gap-5'>
              <Link href='https://www.facebook.com/trungtamduocpham' target='_blank'>
                <Image src='/icons/facebook-logo.svg' alt='Facebook logo' width={30} height={30} />
              </Link>
              <Link href={ZALO_URL} target='_blank'>
                <Image src='/icons/zalo-logo.svg' alt='Zalo logo' width={30} height={30} />
              </Link>
            </div>
            <div className='mb-4 mt-7 font-semibold uppercase'>Giao hàng</div>
            <Link href='https://gonsa.com.vn' target='_blank'>
              <Image src='/icons/gonsa-logo.svg' alt='Gonsa logo' width={36} height={36} />
            </Link>
            <div className='mb-4 mt-7 font-semibold uppercase'>Liên hệ</div>
            <ul className='text-xs'>
              <li className='mb-3'>
                <Link href='mailto:cskh@trungtamduocpham.com'>
                  Email: cskh@trungtamduocpham.com
                </Link>
              </li>
              <li>
                <Link href='tel:028 7779 6768'>Hotline: 028 7779 6768 (Từ T2 đến CN: 8h-20h)</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className='mb-4 font-semibold uppercase'>Tải ứng dụng</div>
            <div className='flex gap-4'>
              <Image src='/icons/qr-code.svg' alt='QR code' width={90} height={90} />
              <div className='flex flex-col justify-between'>
                <Link
                  href='https://play.google.com/store/apps/details?id=com.connectpharm.connectpharm'
                  target='_blank'
                >
                  <Image
                    src='/get-on-google-play.svg'
                    alt='Get it on Google Play'
                    width={127}
                    height={36}
                  />
                </Link>
                <Link
                  href='https://apps.apple.com/vn/app/connect-pharm/id6451052186'
                  target='_blank'
                >
                  <Image
                    src='/download-on-app-store.svg'
                    alt='Download on the App Store'
                    width={127}
                    height={36}
                  />
                </Link>
              </div>
            </div>

            <div className='mb-4 mt-10 font-semibold uppercase md:mt-20'>Chứng nhận</div>
            <Link href='http://online.gov.vn/Home/WebDetails/105727' target='_blank'>
              <Image
                src='/icons/chung-nhan.svg'
                alt='Đã đăng ký bộ công thương'
                width={88}
                height={33}
              />
            </Link>
          </div>
        </div>
        <hr className='my-5' />

        <p className='text-center text-[9px] leading-[15px]'>
          Công ty Cổ Phần Connect Pharm
          <br />
          Địa chỉ: 88 Phạm Thị Tánh, Phường 4, Quận 8, Thành Phố Hồ Chí Minh, Việt Nam. Người đại
          diện pháp luật: Nguyễn Tôn Hùng Trường
          <br />
          Chứng nhận ĐKKD: 0316969707, Cấp ngày 08/10/2021, Tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ
          Chí Minh
          <br />
          ©2024 - Bản quyền thuộc về Công ty Cổ Phần Connect Pharm
        </p>
      </div>
    </footer>
  )
}

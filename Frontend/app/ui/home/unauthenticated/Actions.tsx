import styles from '@/app/page.module.css'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Actions = () => {
  return (
    <div className={styles.signUpLetternews}>
      <div className={styles.callToActionForm}>
        <div className='text-pretty text-center font-bold text-primary md:text-[32px]'>
          Đăng ký ngay để nhận nhiều ưu đãi hấp dẫn
        </div>
        <div className={styles.buttonGroup}>
          <Link href='/login'>
            <Button className={cn(styles.signInButton, '!border-[3px]')}>Đăng nhập</Button>
          </Link>
          <Link href='/signup'>
            <Button className={cn(styles.signUpButton, '!border-[3px]')}>Đăng ký</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Actions

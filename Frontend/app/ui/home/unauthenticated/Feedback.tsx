import styles from '@/app/page.module.css'
import { FeedBackCarousel } from '@/components/common/FeedBackCarousel/FeedBackCarousel'
import { cn } from '@/lib/utils'

const Feedbacks = () => {
  return (
    <div className={cn(styles.feedbackCard, styles.containerWrapper)}>
      <h2 className={styles.cardTitle}>Khách hàng nói gì về chúng tôi</h2>

      <ul className={styles.cardList}>
        <FeedBackCarousel />
      </ul>
    </div>
  )
}

export default Feedbacks

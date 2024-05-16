import styles from '@/app/page.module.css'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@/public/orders'
import Image from 'next/image'

const Introduction = () => {
  return (
    <div className={cn(styles.mainCard, styles.containerWrapper, 'mb-[30px]')}>
      <div className={styles.cardLeftSection}>
        <h2 className={styles.cardLeftSectionTitle}>Trung Tâm Dược Phẩm </h2>

        <p className={styles.cardLeftSectionDescription}>
          Trung Tâm Dược Phẩm là sàn thương mại với các hoạt động buôn bán trao đổi sản phẩm về
          thuốc và các sản phẩm y tế liên quan. Chúng tôi đảm báo 100% thuốc chính hãng, được kiểm
          duyệt bởi Bộ Y Tế và có hạn sử dụng rõ ràng.
        </p>

        <div className={styles.cardLeftSectionTagline}>Uy tín - Chất lượng - Tận tâm</div>

        <ul className={styles.cardLeftSectionList}>
          <li>
            <Image alt='Claim' src={CheckIcon} />
            <div className={styles.title}>Dược phẩm chất lượng</div>
            <div className={styles.description}>
              Dược phẩm đạt chuẩn chất lượng, đa dạng đáp ứng nhu cầu, tình trạng nguồn gốc rõ ràng.
            </div>
          </li>
          <li>
            <Image alt='Claim' src={CheckIcon} />
            <div className={styles.title}>Dịch vụ chuyên nghiệp</div>
            <div className={styles.description}>
              Dịch vụ hỗ trợ tận tình, dịch vụ gia tăng hữu ích, đảm bảo trải nghiệm hài lòng.
            </div>
          </li>
          <li>
            <Image alt='Claim' src={CheckIcon} />
            <div className={styles.title}>Sổ tay thông thái</div>
            <div className={styles.description}>
              Tin tức chuyên ngành mới nhất, thông tin tham khảo chính xác, tra cứu dễ dàng thuận
              tiện.
            </div>
          </li>
          <li>
            <Image alt='Claim' src={CheckIcon} />
            <div className={styles.title}>Vận chuyển linh hoạt</div>
            <div className={styles.description}>
              Hệ thống giao hàng phủ khắp, tiêu chuẩn bảo quản khắt khe, thời gian vận chuyển nhanh
              chóng.
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.cardRightSection}>
        <div className={styles.cardRightSectionText}>
          <ul>
            <li>
              <div className={styles.title}>{'>1.200'}</div>
              <div className={styles.description}>Đối tác</div>
            </li>
            <li>
              <div className={styles.title}>6.800+</div>
              <div className={styles.description}>Sản phẩm</div>
            </li>
            <li>
              <div className={styles.title}>3.620.000+</div>
              <div className={styles.description}>Lượt truy cập/ngày</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Introduction

import styles from '@/app/page.module.css'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  Brand1,
  Brand2,
  Brand3,
  Brand4,
  Brand5,
  Brand6,
  Brand7,
  Brand8,
  Brand9,
  Brand10,
  Brand11,
  Brand12
} from '@/public/home'
import Image from 'next/image'

const brands = [
  Brand2,
  Brand11,
  Brand9,
  Brand12,
  Brand1,
  Brand10,
  Brand4,
  Brand3,
  Brand5,
  Brand7,
  Brand6,
  Brand8
]

const Partners = () => {
  return (
    <div className={cn(styles.brandCard, styles.containerWrapper)}>
      <h2 className={`${styles.cardTitle} !mt-10 !mb-0`}>Đối tác của Trung Tâm Dược Phẩm</h2>

      <ul className={styles.cardList}>
        {brands.map((brand, idx) => (
          <Card key={idx}>
            <CardContent className={styles.cardContent}>
              <Image src={brand} alt={`Brand ${idx}`} />
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  )
}

export default Partners

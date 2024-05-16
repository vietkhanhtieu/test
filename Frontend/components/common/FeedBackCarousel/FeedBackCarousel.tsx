'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import React from 'react'

import styles from './FeedBackCarousel.module.css'

export const feedbacks = [
  {
    name: 'Hoàng Đạt',
    content:
      'Rất tiện lợi, tôi có thể dễ dàng xem giá các thuốc và cân chỉnh đơn hàng, ngoài ra mỗi ngày đều có sản phẩm mới giúp nhà thuốc đa dạng hơn danh mục hàng.',
    date: '15/12/2022',
    source: 'Phòng mạch Sức Khỏe',
    avatar_url: '/assets/avt_dat.png'
  },
  {
    name: 'Trần Thanh Trúc',
    content:
      'Địa điểm đáng tin cậy, đầy đủ hàng, giao hàng nhanh và thuận tiện. Nhân viên tư vấn nhiệt tình và tận tâm.',
    date: '27/03/2023',
    source: 'Nhà thuốc Bình An',
    avatar_url: '/assets/avt_truc.png'
  },
  {
    name: 'Đại Nghĩa',
    content: 'Hàng hóa đa dạng, dễ dàng tra cứu giá và đặt hàng thuốc.',
    date: '03/05/2023',
    source: 'Nhà thuốc Đại An',
    avatar_url: '/assets/avt_nghia.png'
  }
]

export const FeedBackCarousel: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      plugins={[
        Autoplay({
          delay: 5000
        })
      ]}
      setApi={setApi}
      className={styles.feedbacksWrapper}
    >
      <CarouselContent>
        {[feedbacks, feedbacks, feedbacks].map((fbds, index) => (
          <CarouselItem key={index} className={styles.carouselItemWrapper}>
            {fbds.map(({ name, content, date, source, avatar_url }, index) => {
              return (
                <div key={`${name}-${index}`} className={`${styles.feedbackWrapper} text-abbey`}>
                  <Avatar className={styles.avatarWrapper}>
                    <Image
                      src={avatar_url}
                      width={80}
                      height={80}
                      className='rounded-full'
                      alt={`avt_${name}`}
                    />
                  </Avatar>
                  <div className={`${styles.name} text-16 font-semibold leading-[17px] mb-[5px]`}>
                    {name}
                  </div>
                  <div className={`${styles.content} text-14 leading-[17px]`}>{content}</div>
                  <div className={styles.dateAndSource}>
                    <span className={`${styles.date} text-14 leading-[17px]`}>{`${date} - `}</span>
                    <span className={`${styles.source} text-14 leading-[17px] font-semibold`}>
                      {source}
                    </span>
                  </div>
                  <div className='absolute -left-[1px] top-8 h-[120px] border-r-2 border-primary'></div>
                </div>
              )
            })}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

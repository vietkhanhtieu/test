import { Fragment } from 'react'

import { TreatmentItem } from './TreatmentItem'

const TreatmentGroup = () => {
  const listMap = [
    {
      title: 'Thuốc',
      description:
        'Là chế phẩm có chứa dược chất hoặc dược liệu dùng cho người nhằm mục đích phòng bệnh, chữa bệnh...điều chỉnh chức năng sinh lý cơ thể người.',
      imageUrl: '/image-group-treatment-1.png',
      slug: 'thuoc'
    },
    {
      title: 'Thực phẩm chức năng',
      description:
        'Là chế phẩm bổ sung dinh dưỡng, bổ sung chế độ ăn uống khi uống dưới dạng thuốc viên, viên nang, viên nén hoặc chất lỏng.',
      imageUrl: '/image-group-treatment.png',
      slug: 'thuc-pham-chuc-nang-danh-muc-san-pham'
    },
    {
      title: 'Thiết bị y tế',
      description:
        'Các loại thiết bị, dụng cụ, vật liệu, vật tư cấy ghép...phần mềm (software) được sử dụng riêng lẻ hay phối hợp với nhau theo chỉ định của chủ sở hữu trang thiết bị y tế.',
      imageUrl: '/image-group-treatment-2.png',
      slug: 'thiet-bi-dung-cu-y-te-danh-muc-san-pham'
    },
    {
      title: 'Chăm sóc cá nhân - Nhà cửa - Đời sống',
      description:
        'Là các sản phẩm tiêu dùng được thoa lên các bộ phận bên ngoài khác nhau của cơ thể bảo vệ chúng khỏi vi trùng có hại và giữ cơ thể luôn năng động và tốt nhất.',
      imageUrl: '/image-group-treatment-3.png',
      slug: 'cham-soc-ca-nhan-nha-cua-doi-song-danh-muc-san-pham'
    }
  ]

  return (
    <div className='flex flex-col gap-8'>
      {listMap &&
        listMap.map((item, index) => {
          return (
            <Fragment key={index}>
              <TreatmentItem
                title={item.title}
                imageUrl={item.imageUrl}
                description={item.description}
                slug={item.slug}
              />
            </Fragment>
          )
        })}
    </div>
  )
}

export default TreatmentGroup

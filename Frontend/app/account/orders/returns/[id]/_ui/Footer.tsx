import axios from '@/app/api/axios'
import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import Spinner from '@/components/ui/spinner'
import { setInitState } from '@/lib/redux/slices/refund_order'
import { RootState } from '@/lib/redux/store'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ModalSendRequestSuccess } from '../../../ModalSendRequestSuccess'
import ReasonDetail from './ReasonDetail'

interface Props {
  selectedItems: number[]
  products: any[]
  order?: any
  viewOnly?: boolean
}

const Footer = (props: Props) => {
  const { status, message_detail, message, order_id } = useSelector(
    (state: RootState) => state.refundOrders
  )
  const [filesProduct, setFilesProduct] = useState<File[]>([])
  const [selectedApprove, setSelectedApprove] = useState<boolean>(false)
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false)
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useDispatch()
  var formData = new FormData()

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles: File[] = Array.from(event.target.files || [])
    const maxNewFiles = Math.max(0, 5 - filesProduct.length)
    const allowedFiles = newFiles.slice(0, maxNewFiles)

    setFilesProduct([...filesProduct, ...allowedFiles])
  }

  const appendData = () => {
    filesProduct.forEach((file, index) => {
      formData.append(`file_${index + 1}`, file)
    })

    props.products
      .filter((product: any) => {
        return props.selectedItems.includes(product.product_id)
      })
      .map((product, index) => {
        Object.keys(product).map((key) => {
          if (key == 'supplier') {
            Object.keys(product[key]).map((supplierKey) => {
              formData.append(
                `product_info[${index}][${key}][${supplierKey}]`,
                product[key][supplierKey]
              )
            })
          } else {
            formData.append(`product_info[${index}][${key}]`, product[key])
          }
        })
      })

    formData.append('order_id', order_id)
    formData.append('message', message)
    formData.append('message_detail', message_detail)
  }

  const handleSelectedApprove = () => {
    setSelectedApprove(!selectedApprove)
  }

  const handleSubmit = async () => {
    appendData()
    setIsLoading(true)
    try {
      const res = await axios.post(
        `/wp-json/order-management/${status == 1 ? 'exchange_order' : status == 2 ? 'refund_order' : ''}`,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
      )

      if (res.data.status == 200) {
        setIsOpenModalSuccess(true)
        dispatch(setInitState())
      }
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    const hasLot = props.products.filter((product: any) => {
      return props.selectedItems.includes(product.product_id) && product.lot.trim().length > 1
    })
    if (hasLot.length == props.selectedItems.length) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
  }, [props.products])

  return (
    <>
      <div className='w-full h-3 bg-lighthouse'></div>
      <ReasonDetail
        filesProduct={filesProduct}
        handleSelectFile={handleSelectFile}
        order={props.order}
        viewOnly={props.viewOnly}
      />
      {!props.viewOnly && (
        <div className='flex h-[90px] w-full px-[30px] py-[25px] border-t'>
          <div className='flex items-center justify-between w-full '>
            <div className='flex gap-2.5 items-center'>
              <CustomCheckbox
                id='selected-approve'
                checked={selectedApprove}
                handleOnChange={handleSelectedApprove}
                className='w-[22px] h-[22px]'
              />
              <span className='text-14 leading-[21px]'>
                Tôi đồng ý với Điều kiện đổi hàng của TTDP
              </span>
            </div>
            <button
              className='w-[168px] h-10 py-[7px] px-2.5 bg-primary text-white font-bold rounded-[10px] disabled:bg-gray-10 disabled:opacity-100'
              disabled={
                !selectedApprove ||
                filesProduct.length < 3 ||
                props.selectedItems.length < 1 ||
                disableSubmit
              }
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner size='md' /> : 'Gửi ngay'}
            </button>
          </div>
          <ModalSendRequestSuccess
            isOpenModalSuccess={isOpenModalSuccess}
            setIsOpenModalSuccess={setIsOpenModalSuccess}
          />
        </div>
      )}
    </>
  )
}

export default Footer

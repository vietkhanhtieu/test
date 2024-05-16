import TaxInformation from '@/app/account/tax-information/TaxInformation'

interface Props {
  setInvoiceId: (e: string) => void
}
export const CartTaxInformation = (props: Props) => {
  return (
    <>
      <div className='w-full bg-white rounded-[10px] px-[30px] py-[15px] font-normal text-abbey'>
        <p className='text-20 font-medium mb-2.5'> Thông tin xuất hóa đơn </p>

        <div>
          <TaxInformation fromScreen='cart' setInvoiceId={props.setInvoiceId} />
        </div>
      </div>
    </>
  )
}

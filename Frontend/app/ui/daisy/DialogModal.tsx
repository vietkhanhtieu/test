// https://daisyui.com/components/modal/
import Image from 'next/image'
import { ReactNode } from 'react'

interface Props {
  modalId: string
  modalBoxStyles?: string
  children: ReactNode
}

export const showDialogModal = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLDialogElement | null

  if (modal) modal.showModal()
}

export const closeDialogModal = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLDialogElement | null

  if (modal) modal.close()
}

const DialogModal = (props: Props) => {
  const { modalId, modalBoxStyles, children } = props

  const boxStyles: string = `dy-modal-box ${modalBoxStyles || ''}`

  return (
    <dialog id={modalId} className='dy-modal'>
      <div className={boxStyles}>
        {/* close modal button */}
        <form method='dialog'>
          <button className='dy-btn dy-btn-sm dy-btn-transparent absolute top-1 right-1 p-0 border-0 rounded'>
            <Image src='/close-modal.svg' alt='close icon' width={32} height={32} />
          </button>
        </form>

        {children}
      </div>

      {/* click outside to close modal */}
      <form method='dialog' className='dy-modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}

export default DialogModal

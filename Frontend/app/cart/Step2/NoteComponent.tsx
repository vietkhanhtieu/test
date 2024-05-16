interface Props {
  setNote: (e: string) => void
}

export const NoteComponent = (props: Props) => {
  return (
    <>
      <div className='w-full bg-white rounded-[10px] px-[30px] py-[15px] font-normal text-abbey'>
        <p className='text-20 font-medium mb-2.5'> Ghi Chú </p>

        <textarea
          maxLength={1000}
          placeholder='Nhập thông tin...'
          className='w-full rounded-lg border-alto bg-note-card pl-5 pt-[15px] text-14 text-gray-40 font-normal '
          onChange={(e) => props.setNote(e.target.value)}
        ></textarea>

        <p className='text-14 text-gray-40 font-normal'> *** tối đa 1000 ký tự</p>
      </div>
    </>
  )
}

import { getMonth, getYear } from 'date-fns'
import range from 'lodash/range'
import moment from 'moment'
import React, { forwardRef, useEffect, useState } from 'react'
import 'react-clock/dist/Clock.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'

import './datetime_picker.css'

interface Props {
  dateSelected: (startDate: Date | null) => void
  selectTime: boolean | false
  timeSelected?: void
  minDate?: Date
  defaultDate?: Date | null
  className?: string
  inputClassName?: string
}

export const DateTimePicker = (props: Props) => {
  const years = range(getYear(new Date()), 3000)
  const [startDate, setStartDate] = useState(props.defaultDate)

  const defaultTime = ''
  const [time, setTime] = useState(defaultTime)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const handleOnChangeTime = (e: any) => {
    if (e) {
      setTime(e)
    } else {
      setTime('')
    }
  }

  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button
      className={`flex items-center text-16 text-abbey w-full h-full pl-4 ${props.inputClassName}`}
      onClick={onClick}
      ref={ref}
    >
      {!startDate ? (
        <p>Vui lòng chọn ngày nhận hàng</p>
      ) : (
        <>
          <span>{value}</span>
          {time.length > 0 ? (
            <>
              &nbsp; &nbsp;
              <span>|</span>
              &nbsp;&nbsp;
              <span>{`${moment(time, 'HH:mm').format('hh:mm A')}`}</span>
            </>
          ) : null}
        </>
      )}
    </button>
  ))

  useEffect(() => {
    if (startDate) {
      props.dateSelected(startDate)
    }
  }, [startDate])
  return (
    <>
      <div id='datetimepicker' className='w-full h-full flex items-center'>
        <DatePicker
          className={`custom-input-style bg-white w-full h-full ${props.className}`}
          minDate={props.minDate}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }) => (
            <div className='flex justify-between items-center bg-white'>
              <div className='flex'>
                <select
                  className='text-abbey text-14 font-normal ml-4 bg-transparent'
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  className='text-abbey text-14 font-normal ml-4 bg-transparent'
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(parseInt(value))}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex items-center gap-1'>
                <button className='mr-2' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {'<'}
                </button>
                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {'>'}
                </button>
              </div>
            </div>
          )}
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          customInput={<ExampleCustomInput />}
          dateFormat='dd/MM/yyyy'
        >
          {props.selectTime ? (
            <>
              <span className='text-14 text-abbey'>Điền giờ, phút</span>
              <TimePicker
                className='ml-3.5'
                onChange={handleOnChangeTime}
                value={time}
                disableClock={true}
                clearIcon={null}
              />
            </>
          ) : null}
        </DatePicker>
      </div>
    </>
  )
}

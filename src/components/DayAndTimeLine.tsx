import React from 'react'
import dayjs from 'dayjs';

export const DayAndTimeLine = (CreatedDate:any) => {
  return (
    <>
    <div className="relative flex items-center justify-center w-full">
        <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
        <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">
          {dayjs(CreatedDate).format('DD-MMM-YYYY - hh:mm A')}
        </span>
      </div>
    </>
  )
}

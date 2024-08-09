import React from 'react';
import dayjs from 'dayjs';
import { DayAndTimeLine } from './DayAndTimeLine';

// interface Log {
//   created_at: string;
//   buildingType?: string;
//   message: string;
//   created_by: {
//     picture?: string;
//     name: string;
//     department?: string;
//   };
// }

// interface LocationLogsCardsProps {
//   item: {
//     log: Log;
//   };
// }

const LocationLogsCards = (props:any) => {
    console.log(props);
    
  return (
    <div className="">
      <DayAndTimeLine CreatedDate={props.item?.log?.created_at}/>

      <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
        <img src="/assets/images/currect-lolipop.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
        <div className="flex justify-between flex-wrap">
          <div className="">
            <span className="text-gray-500">Scouted - </span>
            <span className="text-[#F59927] font-black">{props.item?.log?.buildingType}</span>
            <p className="font-black">{props.item?.log?.message} </p>
            <small className="text-gray-500">{dayjs(props.item?.log?.created_at).format('DD-MMM-YYYY - hh:mm A')}</small>
          </div>
          <div className="flex flex-wrap justify-center md:justify-left">
            <div className="">
              <img
                src={props.item?.log?.created_by?.picture || '/assets/images/office-man.png'}
                className="w-[70px] h-[70px] object-cover border-transparent rounded-full"
                alt=""
              />
            </div>

            <ScoutedByComponent item={props.item}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScoutedByComponent = (props:any)=>{
return(
  <>
  <div className="ms-3">
              <span className="text-gray-500">Scouted By</span>
              <p className="text-[#F59927] font-black text-2xl">{props.item?.log?.created_by?.name}</p>
              <small className="text-gray-500">{props.item?.log?.created_by?.department || 'Clipsal'}</small>
            </div>
  </>
)
}


export default LocationLogsCards;

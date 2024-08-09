import React from 'react';
import Banner from '../components/Banner';
import '../assets/css/test.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLocationLogsById } from '../Fetcher/Api';
import Loader from './Elements/Loader';
import { LoadingOverlay } from '@mantine/core';
import dayjs from 'dayjs';
import ScreenLoader from './Elements/ScreenLoader';
import { isPending } from '@reduxjs/toolkit';
import DatePicker from 'react-flatpickr';
import { set } from 'react-datepicker/dist/date_utils';
import IconXCircle from '../components/Icon/IconXCircle';
// import DatePicker from 'react-datepicker';
// import DateRangePicker from './Forms/DateRangePicker';



const bannerData = {
    image: "/assets/images/mobile-banner.png",
    title: "Residential Villa",
    titleColored: "",
    para: "There is no better way to understand the benefits of electrical products than seeing them in action at a",
    paraBold: "Powerhouse Display Centers."
}

const LocationLogs = () => {
    const {id}= useParams();
    const [search, setSearch] = React.useState<string>('');
    const [toSearch,setToSearch]=React.useState<string>('');
    const [initalLoad,setInitialLoad]=React.useState<boolean>(true);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    // now we can use the id to fetch the data from the server
    // and display the data on the page
    const { isLoading, isError, data, error,isPending,isFetching } = useQuery({
        queryKey: ['getLocationLogsById', id, search,selectedDate],
        queryFn: () => {

            return getLocationLogsById(id, search,selectedDate)
        },

        refetchOnWindowFocus: false,
        retry: 1,

    });
    console.log(data);

        return (
        <>
            <Banner bannerData={{
                ...bannerData,
                title:data?.length>=1 ? data[0]?.log?.buildingType : null,
            }} />
            <section>
                <div className="flex flex-wrap">
                    <form className="max-w-sm me-3">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <button type="button" onClick={
                                    ()=>{
                                        console.log(toSearch);
                                        setSearch(toSearch)
                                    }
                                } className="absolute inset-y-0 start-0 flex items-center ps-3 ">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </button>
                            <input
                                type="search"
                                id="default-search"
                                className="mb-2 md:mb-0 block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Logs..."
                                required
                                value={
                                    toSearch
                                }
                                // we should use debouncing here
                                onChange={(e) => {
                                    if(e.target.value.length===0){
                                        setSearch('')
                                        setToSearch(e.target.value)
                                    }else{
                                       setToSearch(e.target.value)
                                    }

                                }}
                            />
                        </div>
                    </form>

                    <div className="flex justify-between gap-2">
                        {/* <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Date</p> */}
                        <DatePicker
                            options={{
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                                defaultDate: new Date(),

                                onChange: (selectedDates: any) => {
                                    setSelectedDate(selectedDates);
                                    console.log(selectedDates);
                                },
                            }}
                            value={selectedDate??new Date()}
                            className="p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />




{(
    selectedDate!==null && selectedDate!==undefined && selectedDate!==new Date()
)&&(<button
  type="button"
  className="bg-transparent "
  onClick={() => {
    setSelectedDate(null);
  }}
>
  {/* place icon */}
   <IconXCircle
    className="w-6 h-6 text-gray-500"
   />
</button>)}


                    </div>
                </div>
                {
                    (!isPending && data && data?.length>=1) ? (
                        data.map((item:any, index:number) => {
                        if(item?.log?.type === 'Scouted'){

                            return(
                           <div className="">
                    <div className="relative flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                        <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">{
                            dayjs(item?.log?.created_at).format('DD-MMM-YYYY - hh:mm A')
                    }</span>
                    </div>

                    <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                        <img src="/assets/images/currect-lolipop.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                        <div className="flex justify-between flex-wrap">
                            <div className="">
                                <span className="text-gray-500">Scouted - </span>
                                <span className="text-[#F59927] font-black">{
                                    item?.log?.buildingType
                        }</span>
                                <p className="font-black">{
                                    item?.log?.message
                                    } </p>
                                <small className="text-gray-500">{
                                    dayjs(item?.created_at).format('DD-MMM-YYYY - hh:mm A')}</small>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-left">
                                <div className="">
                                    <img src={
                                        item?.log?.created_by?.picture || "/assets/images/office-man.png"
                                    } className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                </div>


                                <div className="ms-3">
                                    <span className="text-gray-500">Scouted By</span>
                                    <p className="text-[#F59927] font-black text-2xl">{
                                        item?.log?.created_by?.name
                                        }</p>
                                    <small className="text-gray-500">{
                                        item?.log?.created_by?.department || 'Clipsal'
                                        }</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                        )
                    }
                        else if(item?.log?.type === 'Alloted' || item?.log?.type === 'Assigned'){
                            return(
                                <div className="">
                         <div className="relative flex items-center justify-center w-full">
                             <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                             <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">{
                                 dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')
                         }</span>
                         </div>

                         <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                             <img src="/assets/images/currect-lolipop-green.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                             <div className="flex justify-between flex-wrap">
                                 <div className="">
                                     <span className="text-gray-500">Alloted - </span>
                                     <span className="text-[#F59927] font-black">{
                                         item?.log?.buildingType
                             }</span>
                                     <p className="font-black">{
                                         item?.log?.message
                                         } </p>
                                     <small className="text-gray-500">{
                                         dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')}</small>
                                 </div>
                                 {
                                    item?.log?.allotedUsers?.length>1 ? (
                                    <div className="flex flex-wrap justify-center md:justify-left">
                                <div className="">
                                    <span className="text-gray-500">Alloted Members</span>
                                    <div className="mt-1 relative h-[40px] flex">
                                        {item?.log?.allotedUsers?.slice(0,4)?.map((user:any, index:number) => {
                                            return(<img
                                            src={
                                                user?.picture || "/assets/images/office-man.png"

                                            }
                                            className="w-[40px] h-[40px] bottom-0 left-0 object-cover border-transparent rounded-full  border-2 border-[#CFCFCF]"
                                            alt=""
                                        />)
                                        })}
                                        {
                                            item?.log?.allotedUsers?.length>4 && <div className="absolute bottom-0 left-[75px] flex items-center justify-center w-[40px] h-[40px] bg-[#2E2E30] text-white font-black rounded-full border-2 border-[#CFCFCF]">{

                                                item?.log?.allotedUsers?.length-4
                                            }</div>
                                        }


                                    </div>
                                </div>
                            </div>
                        ):(
                        <div className="flex flex-wrap justify-center md:justify-left">
                                     <div className="">
                                         <img src={
                                             item?.log?.allotedUsers[0]?.picture || "/assets/images/office-man.png"
                                         } className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                     </div>


                                     <div className="ms-3">
                                         <span className="text-gray-500">Alloted To</span>
                                         <p className="text-[#F59927] font-black text-2xl">{
                                             item?.log?.allotedUsers[0]?.name
                                             }</p>
                                         <small className="text-gray-500">{
                                             item?.log?.allotedUsers[0]?.department || 'Clipsal'
                                             }</small>
                                     </div>




                                 </div>
                                 )
                                 }


                             </div>
                         </div>
                     </div>
                             )
                        }
                        else if(item?.log?.type === 'SOP'){
                            return(
                                <div className="">
                         <div className="relative flex items-center justify-center w-full">
                             <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                             <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">{
                                 dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')
                         }</span>
                         </div>

                         <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                             <img src="/assets/images/currect-lolipop-green.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                             <div className="flex justify-between flex-wrap">
                                 <div className="">
                                     <span className="text-gray-500">SOP - </span>
                                     <span className="text-[#F59927] font-black">{
                                         item?.log?.buildingType
                             }</span>
                                     <p className="font-black">{
                                         item?.log?.message
                                         } </p>
                                     <small className="text-gray-500">{
                                         dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')}</small>
                                 </div>
                                 {/* {
                                    item?.log?.allotedUsers?.length>1 ? (
                                    <div className="flex flex-wrap justify-center md:justify-left">
                                <div className="">
                                    <span className="text-gray-500">Requested Members</span>
                                    <div className="mt-1 relative h-[40px]">
                                        {item?.log?.allotedUsers?.slice(0,4)?.map((user:any, index:number) => {
                                            return(<img
                                            src={
                                                user?.picture || "/assets/images/office-man.png"
                                            }
                                            className="w-[40px] h-[40px] bottom-0 left-0 object-cover border-transparent rounded-full absolute border-2 border-[#CFCFCF]"
                                            alt=""
                                        />)
                                        })}
                                        {
                                            item?.log?.allotedUsers?.length>4 && <div className="absolute bottom-0 left-[75px] flex items-center justify-center w-[40px] h-[40px] bg-[#2E2E30] text-white font-black rounded-full border-2 border-[#CFCFCF]">{

                                                item?.log?.allotedUsers?.length-4
                                            }</div>
                                        }


                                    </div>
                                </div>
                            </div>
                        ):(
                        <div className="flex flex-wrap justify-center md:justify-left">
                                     <div className="">
                                         <img src={
                                             item?.log?.allotedUsers?.picture || "/assets/images/office-man.png"
                                         } className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                     </div>


                                     <div className="ms-3">
                                         <span className="text-gray-500">Alloted To</span>
                                         <p className="text-[#F59927] font-black text-2xl">{
                                             item?.log?.allotedUsers?.name
                                             }</p>
                                         <small className="text-gray-500">{
                                             item?.log?.allotedUsers?.department || 'Clipsal'
                                             }</small>
                                     </div>




                                 </div>
                                 )
                                 } */}


                             </div>
                         </div>
                     </div>
                             )
                        }
                        else if(item?.log?.type === 'Handshake'){


                            if(item?.log?.subType==='Requested'){

                                return(    <div className="">
                                <div className="relative flex items-center justify-center w-full">
                                    <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                                    <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">{
                                        dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')
                                }</span>
                                </div>

                                <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                                    <img src="/assets/images/currect-lolipop-hand-blue.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                                    <div className="flex justify-between flex-wrap">
                                        <div className="">
                                            <span className="text-gray-500">Handshake - </span>
                                            <span className="text-[#F59927] font-black">{
                                                item?.log?.buildingType
                                    }</span>
                                            <p className="font-black">{
                                                item?.log?.message
                                                } </p>
                                            <small className="text-gray-500">{
                                                dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')}</small>
                                        </div>
                                        {
                                           item?.log?.handShakeRequestedTo?.length>1 ? (
                                           <div className="flex flex-wrap justify-center md:justify-left">
                                       <div className="">
                                           <span className="text-gray-500">Requested To</span>
                                           <div className="mt-1 relative h-[40px] flex">
                                               {item?.log?.handShakeRequestedTo?.slice(0,4)?.map((user:any, index:number) => {
                                                   return(<img
                                                   src={
                                                       user?.picture || "/assets/images/office-man.png"
                                                   }
                                                   className="w-[40px] h-[40px] bottom-0 left-0 object-cover border-transparent rounded-full  border-2 border-[#CFCFCF]"
                                                   alt=""
                                               />)
                                               })}
                                               {
                                                   item?.log?.handShakeRequestedTo?.length>4 && <div className="absolute bottom-0 left-[75px] flex items-center justify-center w-[40px] h-[40px] bg-[#2E2E30] text-white font-black rounded-full border-2 border-[#CFCFCF]">{

                                                       item?.log?.handShakeRequestedTo?.length-4
                                                   }</div>
                                               }


                                           </div>
                                       </div>
                                   </div>
                               ):(

                               <div className="flex flex-wrap justify-center md:justify-left">
                                            <div className="">
                                                <img src={
                                                    item?.log?.handShakeRequestedTo[0]?.picture || "/assets/images/office-man.png"
                                                } className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                            </div>


                                            <div className="ms-3">
                                                <span className="text-gray-500">Alloted To</span>
                                                <p className="text-[#F59927] font-black text-xl">{
                                                    item?.log?.handShakeRequestedTo[0]?.name
                                                    }</p>
                                                <small className="text-gray-500">{
                                                    item?.log?.handShakeRequestedTo[0]?.department || 'Clipsal'
                                                    }</small>
                                            </div>




                                        </div>
                                        )
                                        }


                                    </div>
                                </div>
                            </div>)

                            }
                            else{
                                return(<div className="">
                                <div className="relative flex items-center justify-center w-full">
                                    <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                                    <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">{
                                        dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')
                                }</span>
                                </div>

                                <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                                    <img src="/assets/images/currect-lolipop-hand-blue.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                                    <div className="flex justify-between flex-wrap">
                                        <div className="">
                                            <span className="text-gray-500">HandShake - </span>
                                            <span className="text-[#F59927] font-black">{
                                                item?.log?.buildingType
                                    }</span>
                                            <p className="font-black">{
                                                item?.log?.message
                                                } </p>
                                            <small className="text-gray-500">{
                                                dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')}</small>
                                        </div>
                                        {
                                           item?.log?.handShakeRequestedTo?.length>1 ? (
                                           <div className="flex flex-wrap justify-center md:justify-left">
                                       <div className="">
                                           <span className="text-gray-500">Requested To</span>
                                           <div className="mt-1 relative h-[40px] flex">
                                               {item?.log?.handShakeRequestedTo?.slice(0,4)?.map((user:any, index:number) => {
                                                   return(<img
                                                   src={
                                                       user?.picture || "/assets/images/office-man.png"
                                                   }
                                                   className="w-[40px] h-[40px] bottom-0 left-0 object-cover border-transparent rounded-full  border-2 border-[#CFCFCF]"
                                                   alt=""
                                               />)
                                               })}
                                               {
                                                   item?.log?.handShakeRequestedTo?.length>4 && <div className="absolute bottom-0 left-[75px] flex items-center justify-center w-[40px] h-[40px] bg-[#2E2E30] text-white font-black rounded-full border-2 border-[#CFCFCF]">{

                                                       item?.log?.handShakeRequestedTo?.length-4
                                                   }</div>
                                               }


                                           </div>
                                       </div>
                                   </div>
                               ):(
                               <div className="flex flex-wrap justify-center md:justify-left">
                                            <div className="">
                                                <img src={
                                                    item?.log?.handShakeRequestedTo[0]?.picture || "/assets/images/office-man.png"
                                                } className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                            </div>


                                            <div className="ms-3">
                                                <span className="text-gray-500">Alloted To</span>
                                                <p className="text-[#F59927] font-black text-2xl">{
                                                    item?.log?.handShakeRequestedTo[0]?.name
                                                    }</p>
                                                <small className="text-gray-500">{
                                                    item?.log?.handShakeRequestedTo[0]?.department || 'Clipsal'
                                                    }</small>
                                            </div>




                                        </div>
                                        )
                                        }


                                    </div>
                                </div>
                            </div>)

                            }
                        }
                        else if(item?.log?.type === 'Meeting'){
                           return( <div className="">
                            <div className="relative flex items-center justify-center w-full">
                                <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                                <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">{
                                    dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')
                            }</span>
                            </div>

                            <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                                <img src="/assets/images/currect-lolipop-hand-dark-blue.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                                <div className="flex justify-between flex-wrap">
                                    <div className="">
                                        <span className="text-gray-500">Meeting - </span>
                                        <span className="text-[#F59927] font-black">{
                                            item?.log?.buildingType
                                }</span>
                                        <p className="font-black">{
                                            item?.log?.message
                                            } </p>
                                        <small className="text-gray-500">{
                                            dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')}</small>
                                    </div>
                                    {
                                       item?.log?.meetingMembers?.length>1 ? (
                                       <div className="flex flex-wrap justify-center md:justify-left">
                                   <div className="">
                                       <span className="text-gray-500">Members</span>
                                       <div className="mt-1 relative h-[40px] flex">
                                           {item?.log?.meetingMembers?.slice(0,4)?.map((user:any, index:number) => {
                                               return(<img
                                               src={
                                                   user?.picture || "/assets/images/office-man.png"
                                               }
                                               className="w-[40px] h-[40px] bottom-0 left-0 object-cover border-transparent rounded-full border-2 border-[#CFCFCF]"
                                               alt=""
                                           />)
                                           })}
                                           {
                                               item?.log?.meetingMembers?.length>4 && <div className="absolute bottom-0 left-[75px] flex items-center justify-center w-[40px] h-[40px] bg-[#2E2E30] text-white font-black rounded-full border-2 border-[#CFCFCF]">{

                                                   item?.log?.meetingMembers?.length-4
                                               }</div>
                                           }


                                       </div>
                                   </div>
                               </div>
                           ):(
                           <div className="flex flex-wrap justify-center md:justify-left">
                                        <div className="">
                                            <img src={
                                                item?.log?.meetingMembers[0]?.picture || "/assets/images/office-man.png"
                                            } className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                        </div>


                                        <div className="ms-3">
                                            <span className="text-gray-500">Alloted To</span>
                                            <p className="text-[#F59927] font-black text-2xl">{
                                                item?.log?.meetingMembers[0]?.name
                                                }</p>
                                            <small className="text-gray-500">{
                                                item?.log?.meetingMembers[0]?.department || 'Clipsal'
                                                }</small>
                                        </div>




                                    </div>
                                    )
                                    }


                                </div>
                            </div>
                        </div>
)
                        }
                        else if(item?.log?.type==='Updates'){
                            return(
                                <div className="">
                         <div className="relative flex items-center justify-center w-full">
                             <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                             <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">{
                                 dayjs(item?.date).format('DD-MMM-YYYY - hh:mm A')
                         }</span>
                         </div>

                         <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                             <img src="/assets/images/currect-lolipop-setting.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                             <div className="flex justify-between flex-wrap">
                                 <div className="">
                                     <span className="text-gray-500">Updates - </span>
                                     <span className="text-[#F59927] font-black">{
                                         item?.log?.buildingType
                             }</span>
                                     <p className="font-black">{
                                         item?.log?.message
                                         } </p>
                                     <small className="text-gray-500">{
                                         dayjs(item?.created_at).format('DD-MMM-YYYY - hh:mm A')}</small>
                                 </div>
                                 <div className="flex flex-wrap justify-center md:justify-left">
                                     <div className="">
                                         <img src={
                                             item?.log?.updatedBy?.picture || "/assets/images/office-man.png"
                                         } className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                     </div>


                                     <div className="ms-3">
                                         <span className="text-gray-500">Scouted By</span>
                                         <p className="text-[#F59927] font-black text-2xl">{
                                             item?.log?.updatedBy?.name
                                             }</p>
                                         <small className="text-gray-500">{
                                             item?.log?.updatedBy?.department || 'Clipsal'
                                             }</small>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                             )
                        }
                    })
                ):(!isPending && data && data?.length==0) ?(
                    <div className="flex items-center justify-center h-[50vh]">
                        <p className="text-gray-500">No Logs Found</p>
                    </div>
                ):(<ScreenLoader/>)

                }





            </section>
        </>
    );


};

export default LocationLogs;

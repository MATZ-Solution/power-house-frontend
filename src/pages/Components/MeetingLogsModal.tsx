import React, { useState, useEffect } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SomeThingWentWrong from '../Pages/SomethingWentWrong';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getScoutMember, getSinglemeetingLogs, ManuallyAddScoutMember, updateScoutMember } from '../../Fetcher/Api';
import Select from 'react-select';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { alertFail, alertSuccess } from './Alert';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { getSingleScoutMember } from '../../Fetcher/Api';
import ScreenLoader from '../Elements/ScreenLoader';
import { log } from 'console';
import { getMeetings } from '../../Fetcher/Api';

function MeetingLogsModal({ open, handleOpen, meetingID, projectName }: any): any {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['getSinglemeetingLogs', [meetingID]],
        queryFn: () => getSinglemeetingLogs(meetingID),
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: !meetingID ? false : true,
    });

    // if (isError) {
    //     if (error?.message === 'Failed to fetch') {
    //         return <SomeThingWentWrong message="Server Cannot Respond" />;
    //     }
    //     return <SomeThingWentWrong message="Internal Server Error" />;
    // }

    return (
        <>
            {isError ? (
                alertFail(error?.message)
            ) : (
                <div className="mb-5">
                    <Transition appear show={open} as={Fragment}>
                        <Dialog as="div" open={open} onClose={() => handleOpen(false)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen px-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        {isLoading ? (
                                            <div className="bg-[#fffdfd] w-[30%] flex items-center justify-center rounded-lg px-28 py-8">
                                                <p className="font-semibold text-[#F59927] ">Loading...</p>
                                            </div>
                                        ) : (
                                            <Dialog.Panel as="div" className="panel border-0 p-0  rounded-3xl  w-full max-w-5xl my-8 text-black dark:text-white-dark h-[80vh]  ">
                                                <div className="">
                                                    <div className=" bg-gray-200  rounded-t-3xl flex justify-between px-6 py-3 text-black ">
                                                        <h1 className="font-extrabold">Meetings Logs- ({projectName})</h1>
                                                        <CloseOutlinedIcon
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                handleOpen(false);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={` mt-3 px-5 rounded-[20px] ${isDark ? 'bg-[#0e1726]' : 'bg-white'}`}>
                                                        {data?.length === 0 ? (
                                                            <div className="flex items-center justify-center mt-5 h-[60vh]">
                                                                <p className="text-black font-bold text-xl">No Meeting Found </p>
                                                            </div>
                                                        ) : (
                                                            <div className=" pt-5">
                                                                <div className="panel rounded-[20px] table-responsive mb-5">
                                                                    <table className=" ">
                                                                        <thead>
                                                                            <tr className="text-black border-b-[1px] border-[#e5e7eb]">
                                                                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Started By</th>
                                                                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Start Time</th>
                                                                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>End Time</th>
                                                                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Meeting Notes </th>
                                                                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {data?.map((data: any) => {
                                                                                return (
                                                                                    <tr key={data?.id}>
                                                                                        <td>{data?.startedByName}</td>

                                                                                        <td>
                                                                                            <div className="whitespace-nowrap">
                                                                                                {data?.startTime}
                                                                                                {/* {data?.startTime.split(' ').map((index: any, i: number) => (
                                                                                            <span key={i} className="mr-1">
                                                                                                <span>{index}</span>
                                                                                            </span>
                                                                                        ))} */}
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div className="whitespace-nowrap">{data?.endTime}</div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="whitespace-nowrap">{!data?.meetingNotes ? <p>-</p> : data?.meetingNotes}</div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div
                                                                                                className={`whitespace-nowrap badge  ${
                                                                                                    data?.inProgress === 0 ? 'bg-danger' : 'bg-success'
                                                                                                } flex justify-center`}
                                                                                            >
                                                                                                {data?.inProgress === 0 ? <p>Not Started</p> : <p>In Progress</p>}
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                )
                                            </Dialog.Panel>
                                        )}
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            )}
        </>
        // <div
        //     className="flex items-center justify-center  bg-gray-900  bg-opacity-50 w-full h-[100vh] px-6 sm:px-0"

        // >
        //     <div className="bg-white w-[35rem] rounded-3xl">
        //         <div className="bg-[#F8F8F8] px-6 py-3 rounded-t-3xl flex justify-between">
        //             <h1 className="font-semibold">Add Scouter</h1>
        //             <CloseOutlinedIcon className="cursor-pointer" onClick={() => handleOpen(false)} />
        //         </div>
        //         <div className="flex flex-col gap-3 px-6 mt-3">
        //             <h1 className="font-semibold">Scout Members</h1>
        //             <Select
        //                 name="userIds"
        //                 placeholder="Select an option"
        //                 options={scoutMemberOptions}
        //                 // value={scoutMemberOptions?.map((option: any) => user.map((data : object)=> data === option.value))}
        //                 isMulti
        //                 isSearchable={false}
        //                 styles={customStyles}
        //                 theme={(theme) => ({
        //                     ...theme,
        //                     colors: {
        //                         ...theme.colors,
        //                         primary25: 'transparent',
        //                         primary: '#F59927',
        //                     },
        //                 })}
        //                 onChange={handleChangeUser}
        //                 components={{
        //                     NoOptionsMessage: () => <div style={{ padding: 10 }}>{scoutMemberIsLoading ? <p>Loading...</p> : scoutMemberError ? <p>{scoutMemberError?.message}</p> : ''}</div>,
        //                 }}
        //             />
        //         </div>

        //         <div className="flex gap-2 justify-end p-4 mt-6">
        //             <button className="text-black font-semibold border[#D9D9D9] border-[1px] rounded-full pl-6 pr-6 pt-2 pb-2 " onClick={() => handleOpen(false)}>
        //                 Cancel
        //             </button>
        //             <button className=" bg-[#F59927] rounded-full pl-6 pr-6 pt-2 pb-2 text-white" onClick={add}>
        //                 Add
        //             </button>
        //         </div>
        //     </div>
        // </div>
    );
}

export default MeetingLogsModal;

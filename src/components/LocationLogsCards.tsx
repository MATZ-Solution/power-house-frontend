import React from 'react';
import dayjs from 'dayjs';
import { DayAndTimeLine } from './DayAndTimeLine';
import { Root } from '../Constants/types';

const LocationLogsCards = ({ items, image }: { items: Root; image: string }) => {
    console.log(items);

    // Determine the correct date based on the log type
    const formattedDate = items?.log?.type === 'Scouted' ? dayjs(items?.log.created_at).format('DD-MMM-YYYY - hh:mm A') : dayjs(items?.date).format('DD-MMM-YYYY - hh:mm A');

    // Determine the DayAndTimeLine component based on the log type
    const DayAndTimeForScout =
        items?.log?.type === 'Scouted' ? (
            <DayAndTimeLine CreatedDate={items?.log.created_at ? new Date(items?.log.created_at) : new Date()} />
        ) : (
            <DayAndTimeLine CreatedDate={items?.date ? new Date(items.date) : new Date()} />
        );

    return (
        <div className="">
            {DayAndTimeForScout}
            <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                <img src={`${image}`} className="absolute bottom-0 left-6 hidden md:block" alt="" />
                <div className="flex flex-col sm:flex-row justify-center sm:justify-between flex-wrap items-center">
                    <div className="flex flex-col justify-center sm:justify-start mb-3 sm:mb-0">
                        <div className="">
                            <span className="text-gray-500">{items?.log?.type} - </span>
                            <span className="text-[#F59927] font-black">{items?.log?.buildingType}</span>
                        </div>
                        <p className="font-black max-w-sm mx-auto sm:mx-0 mb-2">{items?.log?.message}</p>

                        {/* Example of conditional rendering using a ternary operator or logical AND */}
                        <div className="hidden sm:block">
                        {items?.log?.updates && (
                            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                {items.log.updates.map((ele, index) => (
                                    <li key={index}>
                                        Updated <strong>{ele.name}</strong> from <strong>{ele.oldValue}</strong> to <strong>{ele.newValue}</strong>.
                                    </li>
                                ))}
                            </ul>
                        )}
                        </div>

                        {/* Use formattedDate to display the correct date */}
                        {!items?.log?.updates && <small className="text-gray-500">{formattedDate}</small>}
                    </div>
                    <ScoutedByComponent item={items} />
                </div>
            </div>
        </div>
    );
};

const ScoutedByComponent = ({ item }: { item: Root }) => {
    if (item?.log?.type === 'SOP') {
        return null; // Return null instead of undefined
    }
    if (item?.log?.type === 'Updates') {
        return (
            <>
                <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-left">
                    <div className="flex justify-center">
                        <img src={item?.log?.updatedBy?.picture || '/assets/images/office-man.png'} className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                    </div>

                    <div className="ms-0 sm:ms-3">
                        <span className="text-gray-500">Scouted By</span>
                        <p className="text-[#F59927] font-black text-2xl">{item?.log?.updatedBy?.name}</p>
                        <small className="text-gray-500">{item?.log?.updatedBy?.department || 'Clipsal'}</small>
                    </div>
                </div>
            </>
        );
    }
    if (item?.log?.handShakeRequestedTo) {
        return (
            <>
                {item?.log?.handShakeRequestedTo?.length > 1 ? (
                    <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-left">
                        <div className="flex justify-center">
                            <span className="text-gray-500">Requested To</span>
                            <div className="mt-1 relative h-[40px] flex justify-center sm:justify-left">
                                {item?.log?.handShakeRequestedTo?.slice(0, 4)?.map((user: any, index: number) => {
                                    return (
                                        <img
                                            src={user?.picture || '/assets/images/office-man.png'}
                                            className="w-[40px] h-[40px] bottom-0 left-0 object-cover border-transparent rounded-full  border-2 border-[#CFCFCF]"
                                            alt=""
                                        />
                                    );
                                })}
                                {item?.log?.handShakeRequestedTo?.length > 4 && (
                                    <div className="absolute bottom-0 left-[75px] flex items-center justify-center w-[40px] h-[40px] bg-[#2E2E30] text-white font-black rounded-full border-2 border-[#CFCFCF]">
                                        {item?.log?.handShakeRequestedTo?.length - 4}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-left">
                        <div className="flex justify-center">
                            <img
                                src={item?.log?.handShakeRequestedTo[0]?.picture || '/assets/images/office-man.png'}
                                className="w-[70px] h-[70px] object-cover border-transparent rounded-full"
                                alt=""
                            />
                        </div>

                        <div className="ms-0 sm:ms-3">
                            <span className="text-gray-500">Alloted To</span>
                            <p className="text-[#F59927] font-black text-xl">{item?.log?.handShakeRequestedTo[0]?.name}</p>
                            <small className="text-gray-500">{item?.log?.handShakeRequestedTo[0]?.department || 'Clipsal'}</small>
                        </div>
                    </div>
                )}
            </>
        );
    } else if (item?.log?.allotedUsers) {
        return (
            <>
                {item?.log?.allotedUsers?.length > 1 ? (
                    <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-left">
                        <div className="">
                            <span className="text-gray-500">Alloted Members</span>
                            <div className="mt-1 relative h-[40px] flex justify-center sm:justify-left">
                                {item?.log?.allotedUsers?.slice(0, 4)?.map((user: any, index: number) => {
                                    return (
                                        <img
                                            src={user?.picture || '/assets/images/office-man.png'}
                                            className="w-[40px] h-[40px] bottom-0 left-0 object-cover border-transparent rounded-full  border-2 border-[#CFCFCF]"
                                            alt=""
                                        />
                                    );
                                })}
                                {item?.log?.allotedUsers?.length > 4 && (
                                    <div className="absolute bottom-0 left-[75px] flex items-center justify-center w-[40px] h-[40px] bg-[#2E2E30] text-white font-black rounded-full border-2 border-[#CFCFCF]">
                                        {item?.log?.allotedUsers?.length - 4}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-left">
                        <div className="flex justify-center">
                            <img src={item?.log?.allotedUsers[0]?.picture || '/assets/images/office-man.png'} className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                        </div>

                        <div className="ms-0 sm:ms-3">
                            <span className="text-gray-500">Alloted To</span>
                            <p className="text-[#F59927] font-black text-2xl">{item?.log?.allotedUsers[0]?.name}</p>
                            <small className="text-gray-500">{item?.log?.allotedUsers[0]?.department || 'Clipsal'}</small>
                        </div>
                    </div>
                )}
            </>
        );
    } else if (item?.log?.type === 'Meeting') {
        return (
            <>
                {item?.log?.meetingMembers?.length > 1 ? (
                    <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-left">
                        <div className="">
                            <span className="text-gray-500">Members</span>
                            <div className="mt-1 relative h-[40px] flex justify-center sm:justify-left">
                                {item?.log?.meetingMembers?.slice(0, 4)?.map((user: any, index: number) => {
                                    return (
                                        <img
                                            src={user?.picture || '/assets/images/office-man.png'}
                                            className="w-[40px] h-[40px] bottom-0 left-0 object-cover border-transparent rounded-full border-2 border-[#CFCFCF]"
                                            alt=""
                                        />
                                    );
                                })}
                                {item?.log?.meetingMembers?.length > 4 && (
                                    <div className="absolute bottom-0 left-[75px] flex items-center justify-center w-[40px] h-[40px] bg-[#2E2E30] text-white font-black rounded-full border-2 border-[#CFCFCF]">
                                        {item?.log?.meetingMembers?.length - 4}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-left">
                        <div className="flex justify-center">
                            <img src={item?.log?.meetingMembers[0]?.picture || '/assets/images/office-man.png'} className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                        </div>

                        <div className="ms-0 sm:ms-3">
                            <span className="text-gray-500">Alloted To</span>
                            <p className="text-[#F59927] font-black text-2xl">{item?.log?.meetingMembers[0]?.name}</p>
                            <small className="text-gray-500">{item?.log?.meetingMembers[0]?.department || 'Clipsal'}</small>
                        </div>
                    </div>
                )}
            </>
        );
    } else if (item?.log?.type === 'Scouted') {
        return (
            <>
                <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-left">
                    <div className="flex justify-center">
                        <img src={item?.log?.created_by?.picture || '/assets/images/office-man.png'} className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                    </div>

                    <div className="ms-0 sm:ms-3">
                        <span className="text-gray-500">Scouted By</span>
                        <p className="text-[#F59927] font-black text-2xl">{item?.log?.created_by?.name}</p>
                        <small className="text-gray-500">{item?.log?.created_by?.department || 'Clipsal'}</small>
                    </div>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default LocationLogsCards;

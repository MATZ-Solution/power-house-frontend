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
// import DatePicker from 'react-flatpickr';
import { set } from 'react-datepicker/dist/date_utils';
import IconXCircle from '../components/Icon/IconXCircle';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
// import DateRangePicker from './Forms/DateRangePicker';
import LocationLogsCards from '../components/LocationLogsCards';

const bannerData = {
    image: '/assets/images/mobile-banner.png',
    title: 'Residential Villa',
    titleColored: '',
    para: 'There is no better way to understand the benefits of electrical products than seeing them in action at a',
    paraBold: 'Powerhouse Display Centers.',
};

const LocationLogs = () => {
    const { id } = useParams();
    const [search, setSearch] = React.useState<string>('');
    const [toSearch, setToSearch] = React.useState<string>('');
    const [initalLoad, setInitialLoad] = React.useState<boolean>(true);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    // now we can use the id to fetch the data from the server
    // and display the data on the page
    const { isLoading, isError, data, error, isPending, isFetching } = useQuery({
        queryKey: ['getLocationLogsById', id, search, selectedDate],
        queryFn: () => {
            return getLocationLogsById(id, search, selectedDate);
        },

        refetchOnWindowFocus: false,
        retry: 1,
    });
    console.log(data);

    return (
        <>
            <Banner
                bannerData={{
                    ...bannerData,
                    title: data?.length >= 1 ? data[0]?.log?.buildingType : null,
                }}
            />
            <section>
                <div className="flex flex-wrap">
                    <form className="max-w-sm me-3">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    console.log(toSearch);
                                    setSearch(toSearch);
                                }}
                                className="absolute inset-y-0 start-0 flex items-center ps-3 "
                            >
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
                                value={toSearch}
                                // we should use debouncing here
                                onChange={(e) => {
                                    if (e.target.value.length === 0) {
                                        setSearch('');
                                        setToSearch(e.target.value);
                                    } else {
                                        setToSearch(e.target.value);
                                    }
                                }}
                            />
                        </div>
                    </form>

                    <div className="flex justify-between gap-2">
                        {/* <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Date</p> */}
                        <DatePicker
                            dateFormat="dd-MM-yyyy"
                            selected={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                console.log(date);
                            }}
                            className="p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            showTimeSelect={false} // Ensures only date is shown
                            placeholderText="Select a date" // Adds a placeholder text
                            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // Sets the maximum selectable date to one year in the future
                        />

                        {/* <DatePicker onChange={onChange} value={value} /> */}

                        {selectedDate !== null && selectedDate !== undefined && selectedDate !== new Date() && (
                            <button
                                type="button"
                                className="bg-transparent "
                                onClick={() => {
                                    setSelectedDate(null);
                                }}
                            >
                                {/* place icon */}
                                <IconXCircle className="w-6 h-6 text-gray-500" />
                            </button>
                        )}
                    </div>
                </div>
                {!isPending && data && data?.length >= 1 ? (
                    data.map((item: any, index: number) => {
                        if (item?.log?.type === 'Scouted') {
                            return <LocationLogsCards key={index} items={item} image="/assets/images/currect-lolipop.svg" />;
                        } else if (item?.log?.type === 'Alloted' || item?.log?.type === 'Assigned') {
                            return <LocationLogsCards key={index} items={item} image="/assets/images/currect-lolipop-green.svg" />;
                        } else if (item?.log?.type === 'SOP') {
                            return <LocationLogsCards key={index} items={item} image="/assets/images/currect-lolipop-green.svg" />;
                        } else if (item?.log?.type === 'Handshake') {
                            if (item?.log?.subType === 'Requested') {
                                return <LocationLogsCards key={index} items={item} image="/assets/images/currect-lolipop-hand-blue.svg" />;
                            } else {
                                return <LocationLogsCards key={index} items={item} image="/assets/images/currect-lolipop-hand-blue.svg" />;
                            }
                        } else if (item?.log?.type === 'Meeting') {
                            return <LocationLogsCards key={index} items={item} image="/assets/images/currect-lolipop-hand-dark-blue.svg" />;
                        } else if (item?.log?.type === 'Updates') {
                            return <LocationLogsCards key={index} items={item} image="/assets/images/currect-lolipop-setting.svg" />;
                        }
                    })
                ) : !isPending && data && data?.length == 0 ? (
                    <div className="flex items-center justify-center h-[50vh]">
                        <p className="text-gray-500">No Logs Found</p>
                    </div>
                ) : (
                    <ScreenLoader />
                )}
            </section>
        </>
    );
};

export default LocationLogs;

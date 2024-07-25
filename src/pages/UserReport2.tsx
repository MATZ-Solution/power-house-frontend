import { useQuery } from '@tanstack/react-query';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import 'tippy.js/dist/tippy.css';
import { getAllScouts, getScoutMember } from '../Fetcher/Api';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { DateConverter } from '../utils/DateConverter';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
function UserReport() {
    let [startDate, setStartDate] = useState<Date | null>(null);
    let [endDate, setEndDate] = useState<Date | null>(null);
    let [employee, setEmployee] = useState<String | null>(null);
    let [size, setsize] = useState<String | null>(null);


    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('User Report'));
    });
    const [errorHandle, setErrorHandle] = useState({
        error: false,
        message: '',
        serverError: false,
        isLoading: false,
    });

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isSelected ? (isDark ? 'white' : 'black') : isDark ? 'white' : 'black', // Set text color based on selection and theme
            backgroundColor: state.isSelected ? '' : isDark ? '#121E32' : 'white', // Background color for options based on theme
            cursor: 'pointer',
            ':hover': {
                backgroundColor: '#F59927', // Background color on hover
                color: 'white', // Text color on hover
            },
        }),

        control: (provided: any, state: any) => ({
            ...provided,
            minHeight: '45px',
            backgroundColor: isDark ? '#121E32' : 'white', // Set background color of the select box
            borderColor: isDark ? '#17263c' : '#e0e6ed', // Border color to match the background
            boxShadow: 'none',
            ':hover': {
                borderColor: '#F59927', // Border color on hover
            },
        }),

        indicatorSeparator: () => ({ display: 'none' }),

        singleValue: (provided: any) => ({
            ...provided,
            color: isDark ? 'white' : 'black', // Text color of the selected value based on theme
        }),

        placeholder: (provided: any) => ({
            ...provided,
            color: isDark ? 'white' : 'black', // Text color of the placeholder based on theme
        }),

        menu: (provided: any) => ({
            ...provided,
            backgroundColor: isDark ? '#121E32' : 'white', // Set background color of the dropdown menu
        }),
    };

    // GET USER DATA
    const {
        isLoading: scoutMemberIsLoading,
        isError: scoutMemberIsError,
        error: scoutMemberError,
        data: scoutMemberData,
    } = useQuery({
        queryKey: ['scoutMember'],
        queryFn: getScoutMember,
        refetchOnWindowFocus: false,
        retry: 1,
    });
    interface Option {
        value: string;
        label: string;
    }

    const scoutMemberOptions: Option[] = scoutMemberData?.map((data: any) => ({ value: data?.id, label: data?.name })) || [];
    // console.log(scoutAreasOptions);
    
    let { isLoading, isError, data, error } = useQuery({
        queryKey: ['getAllScout'],
        queryFn: getAllScouts,
        refetchOnWindowFocus: false,
        retry: 1,
    });
    

const scoutAreasOptions: Option[] = Array.from(
    new Set(data?.map((data: any) => data.size))
  ).sort((a:any, b:any) => b - a) // Sort in descending order
    .map((size: any) => ({ value: size, label: size })) || [];

  

    const handleDownloadReport = () => {
        const doc = new jsPDF();
        autoTable(doc, { html: '#report' });
        doc.save('scout-report.pdf');
    };
    // let filterData = data?.filter((data: any) => {
    //     const createdDate = new Date(data?.created_at);
    //     let endDateWithTime: Date | null = null;

    //     if (endDate !== null) {
    //         endDateWithTime = new Date(endDate);
    //         endDateWithTime.setHours(23, 59, 59, 999);
    //     }

    //     if (employee) {
    //         if (startDate && endDateWithTime) {
    //             return createdDate >= startDate && createdDate <= endDateWithTime && employee.includes(data?.scoutedBy);
    //         } else if (startDate) {
    //             return createdDate >= startDate && employee.includes(data?.scoutedBy);
    //         } else if (endDateWithTime) {
    //             return createdDate <= endDateWithTime && employee.includes(data?.scoutedBy);
    //         }
    //         return employee.includes(data?.scoutedBy);
    //     }

    //     if (startDate && endDateWithTime) {
    //         return createdDate >= startDate && createdDate <= endDateWithTime;
    //     } else if (startDate) {
    //         return createdDate >= startDate;
    //     } else if (endDateWithTime) {
    //         return createdDate <= endDateWithTime;
    //     }

    //     return true;
    // });







    let filterData = data?.filter((data: any) => {
        const createdDate = new Date(data?.created_at);
        let endDateWithTime: Date | null = null;
    
        if (endDate !== null) {
            endDateWithTime = new Date(endDate);
            endDateWithTime.setHours(23, 59, 59, 999);
        }
    
        const isWithinDateRange = () => {
            if (startDate && endDateWithTime) {
                return createdDate >= startDate && createdDate <= endDateWithTime;
            } else if (startDate) {
                return createdDate >= startDate;
            } else if (endDateWithTime) {
                return createdDate <= endDateWithTime;
            }
            return true;
        };
    
        const matchesEmployee = () => {
            if (employee) {
                return employee.includes(data?.scoutedBy);
            }
            return true;
        };
    
        const matchesSize = () => {
            if (size !== null) {
                return data?.size === size;
            }
            return true;
        };
    
        return isWithinDateRange() && matchesEmployee() && matchesSize();
    });









    const disableMinDate = () => {
        let datass = new Date(data[0]?.created_at);
        datass.setHours(0, 0, 0, 0);
        return datass;
    };

    const disableMaxDate = () => {
        let dates = new Date(data[data?.length - 1]?.created_at);
        dates.setHours(0, 0, 0, 0);
        return dates;
    };

    const onChangeStartDate = (date: any) => {
        // setEmployee(null);
        setStartDate(date);
    };

    const onChangeEndDate = (date: any) => {
        // setEmployee(null);
        setEndDate(date);
    };

    if (isLoading) {
        return <ScreenLoader />;
    }

    if (isError) {
        if (error?.message === 'Failed to fetch') {
            return <SomeThingWentWrong message="Server Cannot Respond" errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
        }
        return <SomeThingWentWrong message="Internal Server Error" errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
    }

    return (
        <div>
            
                <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Scout Report</p>
                </div>
                
            <div className="hidden sm:flex sm:flex-col sm:gap-1">
                <p className="mt-5 font-semibold ">Date</p>
                <div className="flex flex-col gap-2 mt-2 sm:flex-row ">
                    <div className="flex gap-3 items-center">
                        <div className="relative ">
                            <DatePicker
                                // maxDate={disableMaxDate()}
                                // minDate={disableMinDate()}
                                className={`cursor-pointer px-2 border-[1px] border-gray-300  text-black w-full h-11 rounded-md `}
                                placeholderText="Select a date"
                                selected={startDate}
                                onChange={onChangeStartDate}
                                dateFormat="dd/MM/yyyy"
                            />
                            {startDate && <CloseOutlinedIcon fontSize="small" className="text-black  absolute top-3 right-2" onClick={() => setStartDate(null)} />}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="font-semibold text-center"> To</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="relative ">
                            <DatePicker
                                // minDate={disableMinDate()}
                                // maxDate={disableMaxDate()}
                                className={`cursor-pointer px-2 border-[1px] border-gray-300 text-black w-full h-11 rounded-md `}
                                placeholderText="Select a date"
                                selected={endDate}
                                onChange={onChangeEndDate}
                                dateFormat="dd/MM/yyyy"
                            />
                            {endDate && <CloseOutlinedIcon onClick={() => setEndDate(null)} fontSize="small" className="text-black  absolute top-3 right-2" />}
                        </div>
                    </div>

                    <div className="flex gap-1 items-center">
                        <p className="font-semibold">Sort by User</p>
                        <Select
                            isClearable
                            className="w-52"
                            name="userIds"
                            placeholder="Select User"
                            options={scoutMemberOptions}
                            value={scoutMemberOptions.find((option) => option.label === employee) || null}
                            isSearchable={true}
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'transparent',
                                    primary: '#F59927',
                                },
                            })}
                            onChange={(selected: any) => {
                                if (selected) {
                                    setEmployee(selected.label);
                                    // setStartDate(null);
                                    // setEndDate(null);
                                } else {
                                    setEmployee(null);
                                }
                            }}
                        />
                        {/* ########################################## */}
                        <p className="font-semibold">Sort by Areas</p>
                        <Select
                            isClearable
                            className="w-52"
                            name="areaIds"
                            placeholder="Select Size"
                            options={scoutAreasOptions}
                            value={scoutAreasOptions.find((option) => option.label === size) || null}
                            isSearchable={true}
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'transparent',
                                    primary: '#F59927',
                                },
                            })}
                            onChange={(selected: any) => {
                                if (selected) {
                                    setsize(selected.label);
                                    // setStartDate(null);
                                    // setEndDate(null);
                                } else {
                                    setsize(null);
                                }
                            }}
                        />
                        {/* ########################################## */}
                    </div>
                    {filterData?.length > 0 && (
                        <div className="flex">
                            <button onClick={handleDownloadReport} type="button" className="btn btn-primary inline">
                                Download Report
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {filterData?.length === 0 ? (
                <p className="mt-7">No records to display.</p>
            ) : (
                <div className={`pt-5`}>
                    <div className="panel table-responsive mb-5 rounded-[20px]">
                        <table id="report">
                            <thead>
                                <tr className="border-b-[1px] border-[#e5e7eb]">
                                    {/* <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>ID</th> */}
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>ID</th>
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Project Type</th>
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Project Name</th>
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Project Size</th>
                                    <th className={`font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Address</th>
                                    <th className={`font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Scouted By</th>
                                    <th className={`font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Contractor Name</th>
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Contractor Number</th>
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Architectures</th>
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Builders</th>
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Electricians</th>
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Scouted Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterData?.map((data: any, index: any) => {
                                    return (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap">{data.refrenceId}</td>
                                            <td>
                                                <div
                                                    className={`whitespace-nowrap badge  ${data?.projectType === 'Market' ? 'bg-success' : data?.projectType === 'Project' ? ' bg-info' : ''
                                                        } flex justify-center`}
                                                >
                                                    {data?.projectType}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap ">{data?.projectName}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap ">{data?.size}</div>
                                            </td>
                                            <td>
                                                <div className="">{data?.address}</div>
                                            </td>
                                            <td>
                                                <div className="">{data?.scoutedBy}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.contractorName}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.contractorNumber}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.Architectures}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.Builders}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.Electricians}</div>
                                            </td>
                                           
                                            <td className="text-center">{DateConverter(data.created_at)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserReport;

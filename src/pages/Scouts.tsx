import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';

import 'tippy.js/dist/tippy.css';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import { getAllScouts } from '../Fetcher/Api';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';

function Scouts() {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Scouts'));
    });
    const [errorHandle, setErrorHandle] = useState({
        error: false,
        message: '',
        serverError: false,
        isLoading: false,
    });

    let { isLoading, isError, data, error } = useQuery({
        queryKey: ['getAllScout'],
        queryFn: getAllScouts,
        refetchOnWindowFocus: false,
        retry: 1,
    });

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
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Scouted-Location</p>
                </div>
                {/* <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Scouted-Location</span>
                </li> */}
            </ul>
            <div className={`pt-5 `}>
                <div className="panel table-responsive mb-5 rounded-[20px]">
                    <table>
                        <thead>
                            <tr className="border-b-[1px] border-[#e5e7eb]">
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>ID</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Project Type</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Project Name</th>
                                <th className={`font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Address</th>
                                <th className={`font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Scouted By</th>
                                <th className={`font-extrabold whitespace-nowrap  ${isDark ? 'text-white' : 'text-black'}`}>Contractor Name</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Contractor Phone Number</th>
                                {/* <th>Status</th> */}

                                {/* <th>Email</th>
                                <th>Status</th> */}
                                {/* <th className="text-center">Register</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((data: any) => {
                                return (
                                    <tr key={data.id}>
                                        <td className='whitespace-nowrap'>{data.refrenceId}</td>
                                        <td>
                                            <div
                                                className={`whitespace-nowrap badge  ${
                                                    data?.projectType === 'Market' ? 'bg-success' : data?.projectType === 'Project' ? ' bg-info' : ''
                                                } flex justify-center`}
                                            >
                                                {data?.projectType}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap ">{data?.projectName}</div>
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

                                        {/* <td>
                                            <span
                                                className={`badge whitespace-nowrap ${
                                                    data?.status === 'Success'
                                                        ? 'border-green-500 text-green-500'
                                                        : data.status === 'Pending'
                                                        ? 'border-yellow-500 text-yellow-500'
                                                        : // : data.status === 'In Progress'
                                                        // ? 'badge-outline-info'
                                                        data.status === 'Rejected'
                                                        ? 'badge-outline-danger'
                                                        : 'badge-outline-primary'
                                                }`}
                                            >
                                                {data.status}
                                            </span>
                                        </td> */}
                                        <td className="text-center">{data.register}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Scouts;

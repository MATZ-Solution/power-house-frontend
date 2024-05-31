import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import { getLocations } from '../Fetcher/Api';
import 'tippy.js/dist/tippy.css';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import { useQuery } from '@tanstack/react-query';
import {  useSelector } from 'react-redux';
import { IRootState } from '../store';

function Locations() {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Locations'));
    });
    const [errorHandle, setErrorHandle] = useState({
        error: false,
        message: '',
        serverError: false,
        isLoading: false,
    });

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['getLocations'],
        queryFn: getLocations,
        refetchOnWindowFocus : false,
        retry: 1
    });

    console.log("this is location data: ", data)
    if (isLoading) {
        return <ScreenLoader />;
    }

    if (isError) {
        if(error?.message === 'Failed to fetch'){
            return <SomeThingWentWrong message='Server Cannot Respond' errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
        }
        return <SomeThingWentWrong message='Internal Server Error' errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
    }
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Locations</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="table-responsive mb-5">
                    <table>
                        <thead >
                            <tr className='text-black '>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white': 'text-black'}`}>Project Name</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white': 'text-black'}`}>Building Type</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white': 'text-black'}`}>City</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white': 'text-black'}`}>Address</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white': 'text-black'}`}>Contractor Name</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white': 'text-black'}`}>Contractor Phone No.</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white': 'text-black'}`}>Scouted By</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white': 'text-black'}`}>Assigned To</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((data:any) => {
                                return (
                                    <tr key={data.id}>
                                        
                                        <td>
                                            <div className="whitespace-nowrap">{data?.projectName}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.buildingType}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.city}</div>
                                        </td>
                                        <td className=''>
                                            <div className="whitespace-nowrap">{data?.address}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.contractorName}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.contractorNumber}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.scouter}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.assignedToMember}</div>
                                        </td>

                                        
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

export default Locations;

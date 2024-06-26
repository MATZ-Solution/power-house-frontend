import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import { getAllotedLocations} from '../Fetcher/Api';
import 'tippy.js/dist/tippy.css';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import ModalAddScout from './Components/Modal';
import '../assets/css/scollbar.css';
import Modals from './Components/Modals';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { getScoutMember, ManuallyAddScoutMember } from '../Fetcher/Api';

function AllotedLocation() {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    let [open, setOpen] = useState<any>(false);
    let [projectID, setProjectID] = useState<any>('');

    function handleOpen(state: any, getProjectId: any) {
        setProjectID(getProjectId);
        setOpen(state);
    }

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
        queryKey: ['getAllotedLocations'],
        queryFn: getAllotedLocations,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    console.log('this is is loading: ', isLoading);
    console.log('this is isError: ', isError);

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
        <>
            <ModalAddScout open={open} handleOpen={handleOpen} projectID={projectID} />
            {/* <div>{open && <ModalAddScout handleOpen={handleOpen} projectID={projectID} />}</div> */}
            <div className="">
                {/* <div className="absolute top-0 left-0 " style={{zIndex: 3}}>{open && <ModalAddScout handleOpen={handleOpen} projectID={projectID} />}</div> */}

                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <div className="border-l-[5px] border-[#F59927] px-3 ">
                        <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Alloted Location</p>
                    </div>
                    {/* <li>
                        <Link to="#" className="text-primary hover:underline">
                            locations
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Alloted-Locations</span>
                    </li> */}
                </ul>
                {data?.length > 0 ? (
                    <div className="pt-5">
                        <div className="panel rounded-[20px] table-responsive mb-5">
                            <table>
                                <thead>
                                    <tr className="text-black border-b-[1px] border-[#e5e7eb]">
                                        <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>ID</th>
                                        <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Project Name</th>
                                        <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Building Type</th>
                                        <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>City</th>
                                        <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Address</th>
                                        <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Contractor Name</th>
                                        <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Contractor Phone No.</th>
                                        <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Scouted By</th>
                                        <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Assigned To</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((data: any, index: any) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="whitespace-nowrap">{data?.refrenceId}</div>
                                                </td>
                                                <td>
                                                    <div className="whitespace-nowrap">{data?.projectName}</div>
                                                </td>
                                                <td>
                                                    <div className="whitespace-nowrap">{data?.buildingType}</div>
                                                </td>
                                                <td>
                                                    <div className="whitespace-nowrap">{data?.city}</div>
                                                </td>
                                                <td className="">
                                                    <div className="whitespace-nowrap ">{data?.address}</div>
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
                                                    <div className="whitespace-wrap">
                                                        {!data?.assignedToMember ? (
                                                            <div>
                                                                <button type="button" className="btn btn-primary static" onClick={() => handleOpen(true, data?.id)}>
                                                                    Add Scoute User
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <p>{data?.assignedToMember}</p>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center mt-5 h-[70vh]">
                        <p className="text-black font-bold text-xl">No Allot Location are available. </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default AllotedLocation;

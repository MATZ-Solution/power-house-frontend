import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import { getMeetings, getScoutMember } from '../Fetcher/Api';
import 'tippy.js/dist/tippy.css';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import EditModalUser from './Components/EditUserModal';
import MeetingLogsModal from './Components/MeetingLogs.Modal';

function Meetings() {

    let [projectName, setProjectName] =  useState('')
    let [userID, setUserID] = useState<any>('');
    let [open, setOpen] = useState(false);
    function handleOpen(state: any, userID: any) {
        setUserID(userID);
        setOpen(state);
    }

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Scouts Member'));
    });
    const [errorHandle, setErrorHandle] = useState({
        error: false,
        message: '',
        serverError: false,
        isLoading: false,
    });

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['getMeetings'],
        queryFn: getMeetings,
        refetchOnWindowFocus: false,
        retry: 1,
        // staleTime: Infinity
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
            <MeetingLogsModal
                open={open}
                handleOpen={handleOpen}
                meetingID={userID}
                projectName = {projectName}
            />
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Meetings</p>
                </div>
                {/* <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>View User</span>
                </li> */}
            </ul>
            {data?.length === 0 ? (
                <div className="flex items-center justify-center mt-5 h-[70vh]">
                    <p className="text-black font-bold text-xl">No Meeting Found </p>
                </div>
            ) : (
                <div className="pt-5">
                    <div className="panel rounded-[20px] table-responsive mb-5">
                        <table>
                            <thead>
                                <tr className="text-black border-b-[1px] border-[#e5e7eb]">
                                    <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Project Name</th>
                                    <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Address</th>
                                    <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Assign To</th>
                                    <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>View Logs</th>

                                    {/* <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Email</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Address</th>
                                <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>User Role</th> */}
                                    {/* <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Actions</th> */}

                                    {/* <th>Email</th>
                                <th>Status</th> */}
                                    {/* <th className="text-center">Register</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((data: any) => {
                                    return (
                                        <tr key={data?.id}>
                                            <td>{data?.projectName}</td>
                                            <td>
                                                <div className="whitespace-wrap">{data?.address}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.assignedToMemberName}</div>
                                            </td>
                                            <td>
                                                {/* <a href={`/meetings-logs/${data?.id}`}>View Logs</a> */}
                                                <button
                                                    type="button"
                                                    className="btn btn-primary static whitespace-nowrap"
                                                    onClick={() => {
                                                        handleOpen(true, data?.id)
                                                        setProjectName(data?.projectName)
                                                    }}
                                                >
                                                    View Logs
                                                </button>
                                            </td>

                                            {/* <td>
                                            <div className="whitespace-nowrap">{data?.email}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.address}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.position}</div>
                                        </td> */}

                                            {/* <td className="text-center">{data.register}</td> */}

                                            {/* <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-primary static whitespace-nowrap"
                                                onClick={() => handleOpen(true, data?.id)}
                                            >
                                                Edit User
                                            </button>
                                        </td> */}
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

export default Meetings;

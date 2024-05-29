import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import { getScoutMember } from '../Fetcher/Api';
import 'tippy.js/dist/tippy.css';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import { useQuery } from '@tanstack/react-query';

function ScoutsMember() {
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
        queryKey: ['scoutMember'],
        queryFn: getScoutMember,
        refetchOnWindowFocus : false,
        retry: 1
    });

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
                    <span>Scouts Member</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="table-responsive mb-5">
                    <table>
                        <thead >
                            <tr className='text-[#F59927]'>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Designation</th>

                                {/* <th>Email</th>
                                <th>Status</th> */}
                                {/* <th className="text-center">Register</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((data:any) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.name}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.phoneNumber}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.email}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.address}</div>
                                        </td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.position}</div>
                                        </td>

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

export default ScoutsMember;

import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import { getScoutMember } from '../Fetcher/Api';
import 'tippy.js/dist/tippy.css';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import EditModalUser from './Components/EditUserModal';
import TableComponent from './Components/TableComponent';

function ScoutsMember() {
    let [userID, setUserID] = useState<any>('');
    let [open, setOpen] = useState(false);
    function handleOpen(state: any, userID: any) {
        setUserID(userID);
        setOpen(state);
    }

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const dispatch = useDispatch();
    // ##################################################################
   
    const [initialRecords, setInitialRecords] = useState([]);
    const [search, setSearch] = useState('');

   

    useEffect(() => {
        dispatch(setPageTitle('Scouts Member'));
    });
    const [errorHandle, setErrorHandle] = useState({
        error: false,
        message: '',
        serverError: false,
        isLoading: false,
    });
    const fetchAndFilterData = async () => {
        try {
            const data = await getScoutMember();

            // setInitialRecords(data);
            return data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const {
        isLoading: IsLoadingGetUser,
        isError: isErrorGetUser,
        error: errorGetUser,
        data: getUserData = [],
    } = useQuery({
        queryKey: ['getUserData'],
        queryFn: () => fetchAndFilterData(),
        refetchOnWindowFocus: false,
        retry: 1,
        // staleTime: Infinity
    });
    console.log(getUserData,"getUserData")
    useEffect(() => {
        if (getUserData.length > 0) {
            setInitialRecords(getUserData);
        }
    }, [getUserData]);

    if (IsLoadingGetUser) {
        return <ScreenLoader />;
    }

    if (isErrorGetUser) {
        if (errorGetUser?.message === 'Failed to fetch') {
            return <SomeThingWentWrong message="Server Cannot Respond" errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
        }
        return <SomeThingWentWrong message="Internal Server Error" errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
    }
    return (
        <div>
            <EditModalUser open={open} handleOpen={handleOpen} userID={userID} />
            <div className="border-l-[5px] border-[#F59927] px-3 ">
                <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>View User</p>
            </div>
            <br />
            <div className="panel">
                <TableComponent
                    getAreaData={getUserData || []}
                    initialRecords={initialRecords}
                    search={search}
                    setSearch={setSearch}
                    columns={[
                        // { accessor: 'id', title: 'ID' },

                        { accessor: 'name', title: 'Name' },
                        { accessor: 'phoneNumber', title: 'Phone Number' },
                        { accessor: 'email', title: 'Email' },
                        { accessor: 'address', title: 'Address' },
                        { accessor: 'position', title: 'Position' },
                    ]}
                    actions={(row: any) => (
                        <div className="text-center">
                            <button type="button" className="btn btn-primary static whitespace-nowrap" onClick={() => handleOpen(true, row.id)}>
                                Edit User
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default ScoutsMember;

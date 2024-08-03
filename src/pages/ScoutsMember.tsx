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

function ScoutsMember() {
    let [userID, setUserID] = useState<any>('');
    let [open, setOpen] = useState(false)
    function handleOpen(state: any, userID: any){
        setUserID(userID)
        setOpen(state)
    }

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const dispatch = useDispatch();
// ##################################################################
const PAGE_SIZES = [10, 20, 30, 50, 100];
    
        //Skin: Striped
        const [page, setPage] = useState(1);
        const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
        const [initialRecords, setInitialRecords] = useState([]);
        const [recordsData, setRecordsData] = useState(initialRecords);
        const [search, setSearch] = useState('');
    
    
        useEffect(() => {
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            setRecordsData([...initialRecords.slice(from, to)]);
        }, [page, pageSize, initialRecords]);
    
        useEffect(() => {
            const fetchAndFilterData = async () => {
                try {
                    const data = await getScoutMember();
        
                    const filteredData = await data.filter((item : any) => {
                        return (
                            item.name.toString().includes(search.toLowerCase()) ||
                            item.phoneNumber.toLowerCase().includes(search) ||
                            item.email.toLowerCase().includes(search.toLowerCase()) ||
                            item.address.toLowerCase().includes(search) ||
                            item.position.toLowerCase().includes(search.toLowerCase())
                            // item.register.includes(search) 
                        );
                    });
        
                    setInitialRecords(filteredData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
        
            fetchAndFilterData();
        }, [search]);
// ##################################################################

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
            <EditModalUser open={open} handleOpen={handleOpen} userID={userID}/>
                <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>View User</p>
                </div>
<br />
            <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        {/* <h5 className="font-semibold text-lg dark:text-white-light">Skin: Striped</h5> */}
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="datatables">
                        <DataTable
                            striped
                            className="whitespace-nowrap table-striped"
                            records={recordsData}
    
                            columns={[
                                // { accessor: 'id', title: 'ID' },
                               
                                
                                  
                                  { accessor: 'name', title: 'Name' },
                                { accessor: 'phoneNumber', title: 'Phone Number', },
                                { accessor: 'email', title: 'Email' },
                                { accessor: 'address', title: 'Address', },
                                { accessor: 'position', title: 'Position', },
                                // { accessor: 'register', title: 'Register', },
                                { accessor: '', title: 'Action',
                                render: ({ id }) => (
                                    <div className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-primary static whitespace-nowrap"
                                                onClick={() => handleOpen(true, id)}
                                            >
                                                Edit User
                                            </button>
                                        </div>
                                ),
                                 },
                            ]}
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            minHeight={100}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>
            
        </div>
    );
}

export default ScoutsMember;

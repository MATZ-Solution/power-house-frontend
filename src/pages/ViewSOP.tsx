
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setPageTitle } from '../../../store/themeConfigSlice';
import { setPageTitle } from '../store/themeConfigSlice';
import IconBell from '../components/Icon/IconBell';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { ViewSOPData } from './../Fetcher/Api'
import EditSopModal from './Components/EditSopModal';
import { useQuery } from '@tanstack/react-query';


const ViewSOP = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('View SOP'));
    }, [dispatch]);

    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState([]);
    const [sopId, setSopId] = useState<any>('');
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    function handleOpen(state: any, sopId: any) {
        setSopId(sopId);
        setOpen(state);
    }

    const fetchAndFilterData = async (searchTerm: string = '') => {
        try {
            const data = await ViewSOPData();
            const filteredData = data.filter((item: any) => {
                return (
                    item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.projectDomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.projectType.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
            setInitialRecords(filteredData);
            return filteredData;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const {
        isLoading: getSopIsLoading,
        isError: getSop,
        error: getSopError,
        data: getSopData,
    } = useQuery({
        queryKey: ['getAllSop', search],
        queryFn: () => fetchAndFilterData(search),
        refetchOnWindowFocus: false,
        retry: 1,
    });

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        fetchAndFilterData(search);
    }, [search]);

    return (
        <div>
            <EditSopModal open={open} handleOpen={handleOpen} sopId={sopId} />
            <div className="space-y-6">
                <div className="border-l-[5px] border-[#F59927] px-3">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>View SOP</p>
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <input
                            type="text"
                            className="form-input w-auto"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="datatables">
                        <DataTable
                            striped
                            className="whitespace-nowrap table-striped"
                            records={recordsData}
                            columns={[
                                { accessor: 'projectDomain', title: 'Project Domain' },
                                { accessor: 'projectType', title: 'Project Type' },
                                { accessor: 'city', title: 'City' },
                                { accessor: 'area', title: 'Area' },
                                { accessor: 'scoutMemberNames', title: 'Members' },
                                {
                                    accessor: '', title: 'Action',
                                    render: ({ id }) => (
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-primary static whitespace-nowrap"
                                                onClick={() => handleOpen(true, id)}
                                            >
                                                Edit SOP
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={setPage}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ViewSOP;

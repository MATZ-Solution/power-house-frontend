
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setPageTitle } from '../../../store/themeConfigSlice';
import { setPageTitle } from '../store/themeConfigSlice';
import IconBell from '../components/Icon/IconBell';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { ViewSOPData } from './../Fetcher/Api'


const ViewSOP = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('View SOP'));
    });
       
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];

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
                const data = await ViewSOPData();
    
                const filteredData = await data.filter((item : any) => {
                    return (
                        // item.id.toString().includes(search.toLowerCase()) ||
                        item.city.toLowerCase().includes(search.toLowerCase()) ||
                        item.area.toLowerCase().includes(search.toLowerCase()) ||
                        item.projectDomain.toLowerCase().includes(search.toLowerCase()) ||
                        item.projectType.toLowerCase().includes(search.toLowerCase())
                    );
                });
    
                setInitialRecords(filteredData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchAndFilterData();
    }, [search]);



 

    return (
        <div className="space-y-6">
            <div className="border-l-[5px] border-[#F59927] px-3 ">
    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>View SOP</p>
</div>  
            {/* Skin: Striped  */}
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
                            { accessor: 'projectDomain', title: 'Project Domain' },
                            { accessor: 'projectType', title: 'Project Type' },
                            { accessor: 'city', title: 'City' },
                            { accessor: 'area', title: 'Area' },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>

        </div>
    );
};

export default ViewSOP;

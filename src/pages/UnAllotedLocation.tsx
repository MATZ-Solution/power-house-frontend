import { DataTable } from 'mantine-datatable';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import { getUnAllotedLocations } from '../Fetcher/Api';
import 'tippy.js/dist/tippy.css';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import ModalAddScout from './Components/Modal';
import '../assets/css/scollbar.css';

function UnAllotedLocation() {
    // ####  Modal Preparation ###########33

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('UnAlloted Location'));
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
                    const data = await getUnAllotedLocations();
        
                    const filteredData = await data.filter((item : any) => {
                        return (
                            item.refrenceId.toString().includes(search) ||
                            item.projectName.toLowerCase().includes(search.toLowerCase()) ||
                            item.buildingType.toLowerCase().includes(search.toLowerCase()) ||
                            item.city.toLowerCase().includes(search.toLowerCase()) ||
                            item.address.toLowerCase().includes(search.toLowerCase()) ||
                            item.contractorName.toLowerCase().includes(search.toLowerCase()) ||
                            item.contractorNumber.toLowerCase().includes(search.toLowerCase()) ||
                            item.scouter.toLowerCase().includes(search.toLowerCase()) 
                            // item.assignedToMember.toLowerCase().includes(search) 
                        );
                    });
        
                    setInitialRecords(filteredData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
        
            fetchAndFilterData();
        }, [search]);




    // #### END ###########33
    let [open, setOpen] = useState<any>(false);
    let [projectID, setProjectID] = useState<any>('');

    function handleOpen(state: any, getProjectId: any) {
        setProjectID(getProjectId);
        setOpen(state);
    }

    


    return (
        <>
            <ModalAddScout open={open} handleOpen={handleOpen} projectID={projectID} />
            <div className="space-y-6">
            <div className="border-l-[5px] border-[#F59927] px-3 ">
        <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>UnAlloted Location</p>
    </div>  
                                {/* ################################################################################## */}
                                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="datatables">
                        <DataTable
                            striped
                            className="whitespace-nowrap table-striped"
                            records={recordsData}
    
                            columns={[
                               
                                {
                                    accessor: 'buildingType',
                                    title: 'Building Type',
                                    render: ({ buildingType }) => (
                                        <div
                                        className={`whitespace-nowrap badge ${
                                          buildingType === 'Commercial'
                                            ? 'bg-success'
                                            : buildingType === 'Residential'
                                              ? 'bg-info'
                                              : ''
                                        } flex justify-center word-wrap: break-word`}
                                      >
                                        {buildingType}
                                      </div>
                                    ),
                                  },
                                  
                
                                
                                  { accessor: 'refrenceId', title: 'Id' },
                                { accessor: 'projectName', title: 'project Name', },
                                { accessor: 'contractorName', title: 'Contractor Name' },
                                { accessor: 'contractorNumber', title: 'Contractor Number' },
                                { accessor: 'city', title: 'Address', },
                                { accessor: 'scouter', title: 'Scouter', },
                                { accessor: 'assignedToMember', title: 'Assigned Member', },
                                { accessor: 'address', title: 'Address', },
                                {
                                    accessor: '', title: 'Action',
                                    render: ({ id, assignedToMember }) => (
                                        <div className="whitespace-wrap">
                                            {!assignedToMember ? (
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary static whitespace-nowrap"
                                                        onClick={() => handleOpen(true, id)}
                                                    >
                                                        Add Scoute User
                                                    </button>
                                                </div>
                                            ) : (
                                                <p>{assignedToMember}</p>
                                            )}
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
                                {/* ################################################################################## */}
                                
            </div>
        </>
        );
}

export default UnAllotedLocation;

import { DataTable } from 'mantine-datatable';
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
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(setPageTitle('Alloted Location'));
        });

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
                    const data = await getAllotedLocations();

                    const filteredData = await data.filter((item : any) => {
                        return (
                            item.refrenceId.toString().includes(search.toLowerCase()) ||
                            item.projectName.toLowerCase().includes(search.toLowerCase()) ||
                            item.buildingType.toLowerCase().includes(search.toLowerCase()) ||
                            item.city.toLowerCase().includes(search.toLowerCase()) ||
                            item.address.toLowerCase().includes(search.toLowerCase()) ||
                            item.contractorName.toLowerCase().includes(search.toLowerCase()) ||
                            item.contractorNumber.toLowerCase().includes(search.toLowerCase()) ||
                            item.scouter.toLowerCase().includes(search.toLowerCase()) ||
                            item.assignedToMember.toLowerCase().includes(search.toLowerCase())
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
        <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Alloted Location</p>
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

                                {
                                    accessor: 'buildingType',
                                    title: 'Building Type',
                                    render: ({ buildingType }) => (
                                        <div
                                        className={`whitespace-nowrap badge ${
                                          buildingType === 'Commercial'
                                            ? 'bg-info'
                                            : buildingType === 'Residential'
                                              ? 'bg-primary'
                                              : ''
                                        } flex justify-center word-wrap: break-word`}
                                      >
                                        {buildingType}
                                      </div>
                                    ),
                                  },



                                  { accessor: 'refrenceId', title: 'Id' },
                                { accessor: 'projectName', title: 'project Name', },
                                { accessor: 'contractorName', title: 'Contractor Name',
                                    render: ({ contractorName }) => (
                                        // add N/A if contractorName is empty
                                        (contractorName && contractorName!=='undefined') ? contractorName : 'N/A'
                                    )
                                    },
                                    { accessor: 'contractorNumber', title: 'Contractor Number',
                                    render: ({ contractorNumber }) => (
                                        // add N/A if contractorNumber is empty
                                        (contractorNumber && contractorNumber=='undefined') ? contractorNumber : 'N/A'
                                    )
                                     },
                                { accessor: 'city', title: 'Address', },
                                { accessor: 'scouter', title: 'Scouter', },
                                { accessor: 'assignedToMember', title: 'Assigned Member', },
                                { accessor: 'address', title: 'Address', },
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

export default AllotedLocation;

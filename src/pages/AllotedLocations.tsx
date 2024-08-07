import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import { getAllotedLocations } from '../Fetcher/Api';
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
import TableComponent from './Components/TableComponent';

function AllotedLocation() {
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Alloted Location'));
    });

    //Skin: Striped
    const [initialRecords, setInitialRecords] = useState([]);
    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     const from = (page - 1) * pageSize;
    //     const to = from + pageSize;
    //     setRecordsData([...initialRecords.slice(from, to)]);
    // }, [page, pageSize, initialRecords]);

    const fetchAndFilterData = async () => {
        try {
            const data = await getAllotedLocations();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const {
        isLoading: isLoadingAllotedLocations,
        isError: isErrorAllotedLocations,
        error: AllotedLocationsError,
        data: AllotedLocationsData = [],
    } = useQuery({
        queryKey: ['getAllotedLocations'],
        queryFn: () => fetchAndFilterData(),
        refetchOnWindowFocus: false,
        retry: 1,
    });
    useEffect(() => {
        if (AllotedLocationsData.length > 0) {
            setInitialRecords(AllotedLocationsData);
        }
    }, [AllotedLocationsData]);

    const columns = [
        {
            accessor: 'buildingType',
            title: 'Building Type',
            render: ({ buildingType }: any) => (
                <div className={`whitespace-nowrap badge ${buildingType === 'Commercial' ? 'bg-info' : buildingType === 'Residential' ? 'bg-primary' : ''} flex justify-center word-wrap: break-word`}>
                    {buildingType}
                </div>
            ),
        },

        { accessor: 'refrenceId', title: 'Id' },
        { accessor: 'projectName', title: 'project Name' },
        {
            accessor: 'contractorName',
            title: 'Contractor Name',
            render: ({ contractorName }: any) =>
                // add N/A if contractorName is empty
                contractorName && contractorName !== 'undefined' ? contractorName : 'N/A',
        },
        {
            accessor: 'contractorNumber',
            title: 'Contractor Number',
            render: ({ contractorNumber }: any) =>
                // add N/A if contractorNumber is empty
                contractorNumber && contractorNumber == 'undefined' ? contractorNumber : 'N/A',
        },
        { accessor: 'city', title: 'Address' },
        { accessor: 'scouter', title: 'Scouter' },
        { accessor: 'assignedToMember', title: 'Assigned Member' },
        { accessor: 'address', title: 'Address' },
    ];
    return (
        <div className="space-y-6">
            <div className="border-l-[5px] border-[#F59927] px-3 ">
                <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Alloted Location</p>
            </div>
            <div className="panel">
                <TableComponent
                    getAreaData={AllotedLocationsData}
                    initialRecords={initialRecords}
                    search={search}
                    setSearch={setSearch}
                    columns={columns}
                    actions={(row: any) => (
                        <div className="text-center">
                            <button
                                type="button"
                                className="btn btn-primary static whitespace-nowrap"
                                onClick={() => {
                                    navigate(`/log/${row?.id}`);
                                }}
                            >
                                View Logs
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default AllotedLocation;

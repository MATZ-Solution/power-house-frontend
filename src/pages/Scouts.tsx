import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import { getAllScouts } from '../Fetcher/Api';
import { useQuery } from '@tanstack/react-query';
import { IRootState } from '../store';
import TableComponent from './Components/TableComponent';
import 'tippy.js/dist/tippy.css';

function Scouts() {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('All Locations'));
    }, [dispatch]);

    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [search, setSearch] = useState<string>('');

    const fetchAndFilterData = async () => {
        try {
            const data = await getAllScouts();
            return data; // Ensure to return the data
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // Return empty array in case of error
        }
    };

    const {
        isLoading: isLoadingGetScout,
        isError: isErrorGetScout,
        error: getScoutError,
        data: getScoutData = [], // Default to empty array if undefined
    } = useQuery({
        queryKey: ['getAllScout'],
        queryFn: () => fetchAndFilterData(),
        refetchOnWindowFocus: false,
        retry: 1,
    });

    useEffect(() => {
        if (getScoutData.length > 0) {
            setInitialRecords(getScoutData);
        }
    }, [getScoutData]);

    const columns = [
        {
            accessor: 'projectType',
            title: 'Project Type',
            render: ({ projectType }:any) => (
                <div
                    className={`whitespace-nowrap badge ${
                      projectType === 'Market'
                        ? 'bg-info'
                        : projectType === 'Project'
                          ? 'bg-success'
                          : ''
                    } flex justify-center`}
                >
                    {projectType}
                </div>
            ),
        },
        // { accessor: 'projectName', title: 'Project Name' },
        { accessor: 'scoutedBy', title: 'Scouted By' },
        {
            accessor: 'contractorName',
            title: 'Contractor Name',
            render: ({ contractorName }:any) => (contractorName && contractorName !== 'undefined') ? contractorName : 'N/A',
        },
        {
            accessor: 'contractorNumber',
            title: 'Contractor Number',
            render: ({ contractorNumber }:any) => (contractorNumber && contractorNumber !== 'undefined') ? contractorNumber : 'N/A',
        },
        { accessor: 'address', title: 'Address' },
    ];

    return (
        <div className="space-y-6">
            <div className="border-l-[5px] border-[#F59927] px-3 ">
                <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>All Locations</p>
            </div>
            <div className="panel">
               
                <TableComponent
                    getAreaData={getScoutData}
                    initialRecords={initialRecords}
                    search={search}
                    setSearch={setSearch}
                    columns={columns}
                    actions={(row: any) => (
                        <div className="text-center">
                            <button
                                type="button"
                                className="btn btn-primary static whitespace-nowrap"
                                onClick={() => {/* Handle action */}}
                            >
                                Action
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default Scouts;
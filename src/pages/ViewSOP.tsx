
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
import TableComponent from './Components/TableComponent';


const ViewSOP = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('View SOP'));
    }, [dispatch]);

 
    const [initialRecords, setInitialRecords] = useState([]);

    const [sopId, setSopId] = useState<any>('');
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    function handleOpen(state: any, sopId: any) {
        setSopId(sopId);
        setOpen(state);
    }

    const fetchAndFilterData = async () => {
        try {
            const data = await ViewSOPData();
            
            setInitialRecords(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const {
        isLoading: getSopIsLoading,
        isError: getSop,
        error: getSopError,
        data: getSopData=[],
    } = useQuery({
        queryKey: ['getAllSop'],
        queryFn: () => fetchAndFilterData(),
        refetchOnWindowFocus: false,
        retry: 1,
    });

    
    useEffect(() => {
        if (getSopData.length > 0) {
            setInitialRecords(getSopData);
        }
    }, [getSopData]);
    return (
        <div>
            <EditSopModal open={open} handleOpen={handleOpen} sopId={sopId} />
            <div className="space-y-6">
                <div className="border-l-[5px] border-[#F59927] px-3">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>View SOP</p>
                </div>
                <div className="panel">
                   
                    <TableComponent
                    getAreaData={getSopData || []}
                    initialRecords={initialRecords}
                    search={search}
                    setSearch={setSearch}
                    columns={[
                        { accessor: 'projectDomain', title: 'Project Domain' },
                        { accessor: 'projectType', title: 'Project Type' },
                        { accessor: 'city', title: 'City' },
                        { accessor: 'area', title: 'Area' },
                        { accessor: 'scoutMemberNames', title: 'Members' }
                    ]}
                    actions={(row: any) => (
                        <div className="text-center">
                            <button
                                type="button"
                                className="btn btn-primary static whitespace-nowrap"
                                onClick={() => handleOpen(true, row.id)}
                            >
                                Edit SOP
                            </button>
                        </div>
                    )}
                />
 
                </div>
            </div>
        </div>
    );
};


export default ViewSOP;

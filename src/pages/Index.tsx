import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllScouts, getScoutCount } from '../Fetcher/Api';
import '../assets/css/scollbar.css';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import ScoutChart from './../pages/Components/ScoutChart';
import ScoutTeamChart from './../pages/Components/ScoutTeamChart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { Paginator } from 'primereact/paginator';

const Finance = () => {
    const [filters, setFilters] = useState({});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Analytics'));
    });

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [loading] = useState(false);


    


    const [errorHandle, setErrorHandle] = useState({
        error: false,
        message: '',
        serverError: false,
        isLoading: false,
    });

    let { isLoading, isError, data, error } = useQuery({
        queryKey: ['scoutCount'],
        queryFn: getScoutCount,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    // tenstack query
    let {
        isLoading: isLoadingScouts,
        isError: isErrorScouts,
        data: ScoutsData,
        error: scoutsError,
    } = useQuery({
        queryKey: ['getAllScout1'],
        queryFn: getAllScouts,
        refetchOnWindowFocus: false,
        retry: 1,
    });


    if (isLoading || isLoadingScouts) {
        return <ScreenLoader />;
    }

    if (isError || isErrorScouts) {
        if (error?.message === 'Failed to fetch') {
            return <SomeThingWentWrong message="Server Cannot Respond" errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
        }
        return <SomeThingWentWrong message="Internal Server Error" errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
    }

    return (
        <div className="">
            {/* <ModalInfo message='Successfully add scouts'/> */}

            {/* <ScreenLoader/> */}
            <div className="border-l-[5px] border-[#F59927] px-3 ">
                <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Dashboard</p>
            </div>
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        {/* <div className="panel bg-[#ffffff]"> */}
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">Total Scouts</div>
                        </div>
                        <div className="flex items-center mt-5">
                            {/* <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {data[3]?.count} </div> */}
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data[0]?.total}</div>

                            {/* <div className="badge bg-white/30">+ 2.35% </div> */}
                        </div>
                    </div>

                    {/* Pending */}
                    <div className="panel  bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">Users</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data[0]?.user}</div>
                            {/* <div className="badge bg-white/30">- 2.35% </div> */}
                        </div>
                    </div>

                    {/*  Success */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">UnAlloted Location</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data[0]?.UnAllotedLocation}</div>
                            {/* <div className="badge bg-white/30">+ 1.35% </div> */}
                        </div>
                        {/* <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 37,894
                        </div> */}
                    </div>

                    {/* Reject */}
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">Alloted Location</div>
                            {/* <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">View Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div> */}
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data[0]?.AllotedLocation}</div>
                            {/* <div className="badge bg-white/30">- 0.35% </div> */}
                        </div>
                        {/* <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 50.01%
                        </div> */}
                    </div>
                </div>



                <div className=" px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Recent Scouts</p>
                </div>
{/* ########################################################################################### */}

    {/* <div className="flex flex-col md:flex-row h-screen"> */}
    <div className="flex flex-col md:flex-row ">
      <div className="w-full md:w-1/2 h-1/2 md:h-full p-4">
          <ScoutChart />
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full p-4">
          <ScoutTeamChart/>
        
      </div>
    </div>

{/* ########################################################################################### */}
                {ScoutsData?.length === 0 ? (
                    <div className="flex items-center justify-center mt-5 h-[70vh]">
                        <p className="text-black font-bold text-xl">No Recent Location are available. </p>
                    </div>
                ) : (
                    <div className={`mt-4 ${isDark ? 'custom-scrollbar-dark-mode' : 'custom-scrollbar'} w-full h-[80vh] overflow-y-scroll panel`}>
                        {/* <div className="mb-5 text-lg font-extrabold">Recent Scouts</div> */}
                        <div className="table-responsive ">
                        {/* <DataTable value={ScoutsData} header={header} footer={footer} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}> */}
                        
                        <DataTable 
                        value={ScoutsData}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        showGridlines
                        dataKey="id"
                        filters={filters}
                        globalFilterFields={[
                          'projectType',
                          'projectName',
                          'address',
                          'scoutedBy',
                          'contractorName',
                          'contractorNumber',
                        ]}
                        emptyMessage="No customers found."
        >



    <Column field="projectType" header="Project Type" sortable  />
    <Column field="projectName" header="Project Name" sortable style={{ minWidth: '12rem' }} />
    <Column field="address" header="Address" sortable filterField="country.name" ></Column>
    <Column field="scoutedBy" header="Scouted By" sortable style={{ width: '25%' }}></Column>
    <Column field="contractorName" header="Contractor Name" sortable style={{ width: '25%' }}></Column>
    <Column field="contractorNumber" header="Contractor Phone Number" sortable style={{ width: '25%' }}></Column>
</DataTable>
                            
                        </div>
                    </div>
                )}

                
               
            </div>
        </div>
    );
};

export default Finance;

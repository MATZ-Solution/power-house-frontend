import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllScouts, getMonthlyScout, getScoutCount, getTopScout } from '../Fetcher/Api';
import '../assets/css/scollbar.css';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import ScoutChart from './Components/ScoutChart';
import ScoutTeamChart from './Components/ScoutTeamChart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import DashboardMap from '../components/DashboardMap';
import '../assets/css/test.css';
import ReactApexChart from 'react-apexcharts';
import IconDollarSign from '../components/Icon/IconDollarSign';
import { Paginator } from 'primereact/paginator';
import CardComponents from './Components/CardComponents';

const Test = () => {
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
    let {
        isLoading: isLoadingCountScouts,
        isError: isErrorCountScouts,
        data: ScoutsCountData,
        error: scoutsCountError,
    } = useQuery({
        queryKey: ['getAllCountScout'],
        queryFn: getScoutCount,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    let {
        isLoading: isLoadingTopScouts,
        isError: isErrorTopScouts,
        data: TopScoutsData,
        error: TopscoutsError,
    } = useQuery({
        queryKey: ['getTopScout'],
        queryFn: getTopScout,
        // refetchOnWindowFocus: false,
        retry: 1,
    });
    let {
        isLoading: isLoadingMonthlyScouts,
        isError: isErrorMonthlyScouts,
        data: MonthlyScoutsData,
        error: MonthlycoutsError,
    } = useQuery({
        queryKey: ['getMonthlyScout'],
        queryFn: getMonthlyScout,
        // refetchOnWindowFocus: false,
        retry: 1,
    });

    console.log(MonthlyScoutsData)
  
    const currentMonthCounts = MonthlyScoutsData?.map((item:any) => item.current_month_count);
    const currentMonthName = MonthlyScoutsData?.map((item:any) => item.month_name);
    const lastWeekCounts = currentMonthCounts?.map((count:any, index:any) => {
        // Example: Assuming last week's count is 25% of the current month's count
        return Math.round(count * 0.25);
    });
    const getCurrentMonthData = (MonthlyScoutsData:any) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; 
        const currentYear = currentDate.getFullYear();
        const currentMonthString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
        
        return MonthlyScoutsData?.find((item:any)=> item.month === currentMonthString);
    };

    const currentMonthData = getCurrentMonthData(MonthlyScoutsData);
   
    const percentageChange = currentMonthData ? parseInt(currentMonthData.percentage_change, 10) : 'N/A';
    
   
    if (isLoading || isLoadingScouts || isLoadingCountScouts || isLoadingMonthlyScouts) {
        return <ScreenLoader />;
    }

    if (isError || isErrorScouts || isErrorMonthlyScouts || isErrorTopScouts) {
        if (error?.message === 'Failed to fetch') {
            return <SomeThingWentWrong message="Server Cannot Respond" errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
        }
        return <SomeThingWentWrong message="Internal Server Error" errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
    }
    // let res=
    //Sales By Category
    const salesByCategory: any = {
        series: [ScoutsCountData[0]?.Residential, ScoutsCountData[0]?.Commercial, ScoutsCountData[0]?.Project],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'plusJakarta, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '68%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '20px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '18px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Residential', 'Commercial', 'Projects'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };
    //Daily Sales
    const dailySales = {
        series: [
            {
                name: 'Scout',
                data: currentMonthCounts,
            },
            {
                name: 'Last Week',
                data: lastWeekCounts,
            },
        ],
        options: {
            chart: {
                height: 180,
                type: 'bar',
                fontFamily: 'plusJakarta, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: 0,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: true,
                },
                categories: currentMonthName,
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '30%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: -10,
                    right: 15,
                    bottom: -5,
                    left: 10,
                },
            },
        },
    };
    return (
        <div className="">
            {/* <ModalInfo message='Successfully add scouts'/> */}

            {/* <ScreenLoader/> */}
            <div className="romail">
                <section className="flex flex-col sm:flex-row items-center justify-between w-full dashboard-card-bg-img block w-full p-6 bg-white border border-gray-200 rounded-3xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-5">
                    <div className="w-full">
                        <h5 className="m-0 text-3xl font-bold tracking-tight text-gray-900 dark:text-black">
                            Welcome <span className="text-light-orange">Admin</span>
                        </h5>
                        <div className="flex">
                            <div className="divider"></div>
                            <div className="divider-small"></div>
                        </div>
                        <p className="font-normal dashboard-para">
                            There is no better way to understand the benefits of electrical products than seeing them in action at a <span className="font-black">Powerhouse Display Centers.</span>
                        </p>
                    </div>
                    <div className="margin-bottom-minus w-full sm:w-1/3 mt-4 sm:mt-0">
                        <img src="/assets/images/banner_dashboard.png" alt="Dashboard Banner" className="w-full h-auto object-cover" />
                    </div>
                </section>
                <section className="w-full mb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                        <CardComponents user="Total Scouts" count={ScoutsCountData[0]?.total_scouts} color="bg-card-blue" image="/assets/images/dashboard_data_1.png" month={ScoutsCountData[0]?.current_month_total} />
                        <CardComponents user="Active Users" count={ScoutsCountData[0]?.total_users} color="bg-card-orange" image="/assets/images/dashboard_data_2.png"  month={ScoutsCountData[0]?.current_month_users} />
                        <CardComponents user="Active Un-Alloted Locations" count={ScoutsCountData[0]?.UnAllotedLocation} color="bg-card-dark" image="/assets/images/dashboard_data_3.png"  month={ScoutsCountData[0]?.current_month_UnAllotedLocation} />
                        <CardComponents user="Alloted Locations" count={ScoutsCountData[0]?.AllotedLocation} color="bg-card-green" image="/assets/images/dashboard_data_4.png"  month={ScoutsCountData[0]?.current_month_AllotedLocation} />

                     
                    </div>
                </section>
                <section className="w-full mb-2">
                    <h5 className="m-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Scouted Locations</h5>
                    <div className="flex">
                        <div className="divider"></div>
                        <div className="divider-small"></div>
                    </div>
                </section>
                <section className="w-full mb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-10 xl:grid-cols-10 gap-4">
                        <div className="col-span-1 md:col-span-1 lg:col-span-7 border-orange dashboarMap">
                            <DashboardMap />
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-3">
                            <div className="block p-5 chart-img-dashboard border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
                                <form className="mx-auto mb-3">
                                    {/* <select
                                        id="countries"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected>Filter by Locations</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="FR">France</option>
                                        <option value="DE">Germany</option>
                                    </select> */}
                                </form>

                                <h5 className="mb-1 text-xl tracking-tight text-gray-900 text-black w-max">Total Scouts</h5>
                                <p className="mb-1 text-white text-5xl font-black text-light-orange mb-2">{ScoutsCountData[0]?.total}</p>
                                <div className=" bg-gray-chart-dashboard dark:bg-black rounded-lg overflow-hidden pb-4 pt-2">
                                    {loading ? (
                                        <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                            <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                        </div>
                                    ) : (
                                        <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} />
                                    )}
                                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                        <div className="flex flex-col items-center">
                                            <img src="/assets/images/chart_icon1.png" alt="" />
                                            <p className="text-sm tracking-tight text-gray-900 text-black dark:text-white">Commercial</p>
                                            <p className="text-blue-1 text-lg font-black">{ScoutsCountData[0]?.Commercial}</p>
                                        </div>
                                        <div className="flex flex-col items-center border-x">
                                            <img src="/assets/images/chart_icon3.png" alt="" />
                                            <p className="text-sm tracking-tight text-gray-900 text-black dark:text-white">Residential</p>
                                            <p className="text-light-orange text-lg font-black">{ScoutsCountData[0]?.Residential}</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src="/assets/images/chart_icon2.png" alt="" />
                                            <p className="text-sm tracking-tight text-gray-900 text-black dark:text-white">Projects</p>
                                            <p className="text-green-1 text-lg font-black">{ScoutsCountData[0]?.Project}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-10 xl:grid-cols-10 gap-4">
                        <div className="col-span-1 md:col-span-1 lg:col-span-7">
                            <ScoutChart />
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-3">
                            <div className="panel h-full">
                                <div className="flex flex-col mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light mb-3">Top Scout Members</h5>
                                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                                        {TopScoutsData && TopScoutsData.length > 0 ? (
                                            TopScoutsData.map((e:any) => (
                                                <div key={e.id} className="flex flex-col items-center">
                                                    <p className="text-light-orange text-xl font-black">{e.scout_count}</p>
                                                    <p className="text-xs tracking-tight text-gray-900 text-black dark:text-white">{e.name.split(' ')[0]}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No data available</p>
                                        )}
                                        {/* <div className="flex flex-col items-center">
                                            <p className="text-light-orange text-xl font-black">55</p>
                                            <p className="text-sm tracking-tight text-gray-900 text-black dark:text-white">Amir</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-light-orange text-xl font-black">33</p>
                                            <p className="text-sm tracking-tight text-gray-900 text-black dark:text-white">Talha</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-light-orange text-xl font-black">90</p>
                                            <p className="text-sm tracking-tight text-gray-900 text-black dark:text-white">Romail</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-light-orange text-xl font-black">26</p>
                                            <p className="text-sm tracking-tight text-gray-900 text-black dark:text-white">Ali</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-light-orange text-xl font-black">94</p>
                                            <p className="text-sm tracking-tight text-gray-900 text-black dark:text-white">Zawar</p>
                                        </div> */}
                                    </div>

                                    {/* <div className="ltr:ml-auto rtl:mr-auto relative">
                                    <div className="w-11 h-11 text-warning bg-[#ffeccb] dark:bg-warning dark:text-[#ffeccb] grid place-content-center rounded-full">
                                        <IconDollarSign />
                                    </div>
                                </div> */}
                                </div>
                                <div className="mb-2 ">
                                    <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                        {loading ? (
                                            <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                                <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                            </div>
                                        ) : (
                                            <ReactApexChart series={dailySales.series} options={dailySales.options} type="bar" height={160} />
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center mb-5">
                                    <p className="text-black text-xl font-black me-2 dark:text-white">{percentageChange !== 'N/A' ? `${percentageChange}%` : 'N/A'}</p>
                                    <span className="text-white-dark text-sm font-normal">Your Scouted performance compared to the last month {percentageChange !== 'N/A' ? `${percentageChange}%` : 'N/A'} </span>
                                </div>
                                <div className="flex justify-center">
                                    {/* <button type="button" className="text-light-orange light-bg-orange focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-20 py-2.5 mb-2">
                                        Details
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Test;

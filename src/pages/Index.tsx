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

const Finance = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Analytics'));
    });
    //bitcoinoption
    const bitcoin: any = {
        series: [
            {
                data: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //ethereumoption
    const ethereum: any = {
        series: [
            {
                data: [44, 25, 59, 41, 66, 25, 21, 9, 36, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //litecoinoption
    const litecoin: any = {
        series: [
            {
                data: [9, 21, 36, 12, 66, 25, 44, 25, 41, 59],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //binanceoption
    const binance: any = {
        series: [
            {
                data: [25, 44, 25, 59, 41, 21, 36, 12, 19, 9],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //tetheroption
    const tether: any = {
        series: [
            {
                data: [21, 59, 41, 44, 25, 66, 9, 36, 25, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //solanaoption
    const solana: any = {
        series: [
            {
                data: [21, -9, 36, -12, 44, 25, 59, -41, 66, -25],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [loading] = useState(false);

    const salesByCategory: any = {
        series: [985, 737, 270],
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
                        size: '65%',
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
                                fontSize: '26px',
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
                                fontSize: '29px',
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
            labels: ['Apparel', 'Sports', 'Others'],
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

    console.log('this is isLoadingScouts: ', isLoadingScouts);
    console.log('this is isLoading: ', isLoading);

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
                <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Analytics</p>
            </div>
            {/* <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Analytics</span>
                </li>
            </ul> */}
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    {/* <div className="panel bg-[#ffffff]"> */}
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">Total Scouts</div>
                            <div className="dropdown">
                                {/* <Dropdown
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
                                </Dropdown> */}
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            {/* <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {data[3]?.count} </div> */}
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data[0]?.total}</div>

                            {/* <div className="badge bg-white/30">+ 2.35% </div> */}
                        </div>
                        {/* <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 44,700
                        </div> */}
                    </div>

                    {/* Pending */}
                    <div className="panel  bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">Users</div>
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
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data[0]?.user}</div>
                            {/* <div className="badge bg-white/30">- 2.35% </div> */}
                        </div>
                        {/* <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 84,709
                        </div> */}
                    </div>

                    {/*  Success */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">UnAlloted Location</div>
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
                <div className={`mt-4 ${isDark ? 'custom-scrollbar-dark-mode' : 'custom-scrollbar'} w-full h-[80vh] overflow-y-scroll panel`}>
                    {/* <div className="mb-5 text-lg font-extrabold">Recent Scouts</div> */}
                    <div className="table-responsive ">
                        <table>
                            <thead>
                                <tr className="border-b-[1px] border-[#e5e7eb]">
                                    <th className={` font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>ID</th>
                                    <th className={` font-extrabold whitespace-nowrap ${isDark ? 'text-white' : 'text-black'}`}>Project Type</th>
                                    <th className={` font-extrabold whitespace-nowrap ${isDark ? 'text-white' : 'text-black'}`}>Project Name</th>
                                    <th className={` font-extrabold whitespace-nowrap ${isDark ? 'text-white' : 'text-black'}`}>Address</th>
                                    <th className={` font-extrabold whitespace-nowrap ${isDark ? 'text-white' : 'text-black'}`}>Contractor Name</th>
                                    <th className={` font-extrabold whitespace-nowrap ${isDark ? 'text-white' : 'text-black'}`}>Contractor Phone Number</th>
                                    {/* <th>Status</th> */}

                                    {/* <th>Email</th>
                                <th>Status</th> */}
                                    {/* <th className="text-center">Register</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {ScoutsData?.map((data: any) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.projectType}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.projectName}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap md:whitespace-normal">{data?.address}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.contractorName}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.contractorNumber}</div>
                                            </td>

                                            {/* <td>
                                            <span
                                                className={`badge whitespace-nowrap ${
                                                    data?.status === 'Success'
                                                        ? 'border-green-500 text-green-500'
                                                        : data.status === 'Pending'
                                                        ? 'border-yellow-500 text-yellow-500'
                                                        : // : data.status === 'In Progress'
                                                        // ? 'badge-outline-info'
                                                        data.status === 'Rejected'
                                                        ? 'badge-outline-danger'
                                                        : 'badge-outline-primary'
                                                }`}
                                            >
                                                {data.status}
                                            </span>
                                        </td> */}
                                            <td className="text-center">{data.register}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/*  Favorites  */}
                    {/* <div>
                        <div className="flex items-center mb-5 font-bold">
                            <span className="text-lg">Favorites</span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto text-primary hover:text-black dark:hover:text-white-dark">
                                See All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:mb-5">
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                        <IconBitcoin />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">BTC</h6>
                                        <p className="text-white-dark text-xs">Bitcoin</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={bitcoin.series} options={bitcoin.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $20,000 <span className="text-success font-normal text-sm">+0.25%</span>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 bg-warning rounded-full grid place-content-center p-2">
                                        <IconEthereum />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">ETH</h6>
                                        <p className="text-white-dark text-xs">Ethereum</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={ethereum.series} options={ethereum.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $21,000 <span className="text-danger font-normal text-sm">-1.25%</span>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                        <IconLitecoin />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">LTC</h6>
                                        <p className="text-white-dark text-xs">Litecoin</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={litecoin.series} options={litecoin.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $11,657 <span className="text-success font-normal text-sm">+0.25%</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/*  Prices  */}
                    {/* <div>
                        <div className="flex items-center mb-5 font-bold">
                            <span className="text-lg">Live Prices</span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto text-primary hover:text-black dark:hover:text-white-dark">
                                See All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                        <IconBinance />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">BNB</h6>
                                        <p className="text-white-dark text-xs">Binance</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={binance.series} options={binance.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $21,000 <span className="text-danger font-normal text-sm">-1.25%</span>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                        <IconTether />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">USDT</h6>
                                        <p className="text-white-dark text-xs">Tether</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={tether.series} options={tether.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $20,000 <span className="text-success font-normal text-sm">+0.25%</span>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 bg-warning rounded-full p-2 grid place-content-center">
                                        <IconSolana />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">SOL</h6>
                                        <p className="text-white-dark text-xs">Solana</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={solana.series} options={solana.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $21,000 <span className="text-danger font-normal text-sm">-1.25%</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="grid gap-6 xl:grid-flow-row">
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Previous Statement</div>
                                    <div className="text-success"> Paid on June 27, 2022 </div>
                                </div>
                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 5]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="hover:opacity-80"
                                        button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                    >
                                        <ul>
                                            <li>
                                                <button type="button">View Report</button>
                                            </li>
                                            <li>
                                                <button type="button">Edit Report</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconCircleCheck className="text-success opacity-20 w-full h-full" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-primary">Card Limit</div>
                                        <div className="mt-2 font-semibold text-2xl">$50,000.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Spent</div>
                                        <div className="mt-2 font-semibold text-2xl">$15,000.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Minimum</div>
                                        <div className="mt-2 font-semibold text-2xl">$2,500.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Current Statement</div>
                                    <div className="text-danger"> Must be paid before July 27, 2022 </div>
                                </div>
                                <div className="dropdown">
                                    <Dropdown offset={[0, 5]} placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}>
                                        <ul>
                                            <li>
                                                <button type="button">View Report</button>
                                            </li>
                                            <li>
                                                <button type="button">Edit Report</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconInfoCircle className="text-danger opacity-20 w-24 h-full" />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-primary">Card Limit</div>
                                        <div className="mt-2 font-semibold text-2xl">$50,000.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Spent</div>
                                        <div className="mt-2 font-semibold text-2xl">$30,500.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Minimum</div>
                                        <div className="mt-2 font-semibold text-2xl">$8,000.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="mb-5 text-lg font-bold">Recent Transactions</div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                        <th>DATE</th>
                                        <th>NAME</th>
                                        <th>AMOUNT</th>
                                        <th className="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">#01</td>
                                        <td className="whitespace-nowrap">Oct 08, 2021</td>
                                        <td className="whitespace-nowrap">Eric Page</td>
                                        <td>$1,358.75</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#02</td>
                                        <td className="whitespace-nowrap">Dec 18, 2021</td>
                                        <td className="whitespace-nowrap">Nita Parr</td>
                                        <td>-$1,042.82</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#03</td>
                                        <td className="whitespace-nowrap">Dec 25, 2021</td>
                                        <td className="whitespace-nowrap">Carl Bell</td>
                                        <td>$1,828.16</td>
                                        <td className="text-center">
                                            <span className="badge bg-danger/20 text-danger rounded-full hover:top-0">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#04</td>
                                        <td className="whitespace-nowrap">Nov 29, 2021</td>
                                        <td className="whitespace-nowrap">Dan Hart</td>
                                        <td>$1,647.55</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#05</td>
                                        <td className="whitespace-nowrap">Nov 24, 2021</td>
                                        <td className="whitespace-nowrap">Jake Ross</td>
                                        <td>$927.43</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#06</td>
                                        <td className="whitespace-nowrap">Jan 26, 2022</td>
                                        <td className="whitespace-nowrap">Anna Bell</td>
                                        <td>$250.00</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Finance;
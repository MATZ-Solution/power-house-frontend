import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { linearChartDashboard } from './../../Fetcher/Api';


const Charts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Charts'));
    }, [dispatch]);

    const [chartData, setChartData] = useState<{month : number[], count : number[]}>({month : [], count : []})


    useEffect(()=>{
        const getChartData = async ()=>{
            try{

                const pieChartData = await linearChartDashboard();
                const month = pieChartData.map((item : any) => item.month);
                console.log("2") 
                const count = pieChartData.map((item : any) => item.count); 
                setChartData({ month, count })
                console.log("3") 
            }catch(error){
                console.error("Error fetching pie chart data", error);
            }
        }
        getChartData();
    },[]);

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const areaChart: any = {
        series: [
            {
                name: 'Scout',
                // data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
                data: chartData.count,
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 300,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#805dca'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl,
                labels: {
                    offsetX: isRtl ? -40 : 0,
                },
            },
            // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: chartData.month,
            legend: {
                horizontalAlign: 'left',
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
        },
    };

    return (
        <>
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white">Scouts</h5>
                    </div>
                    <div className="mb-5">
                        <ReactApexChart series={areaChart.series} options={areaChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="area" height={300} />
                    </div>
                </div>
        </>
    );
};

export default Charts;

// import { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { useDispatch, useSelector } from 'react-redux';
// import CodeHighlight from '../../components/Highlight';
// import IconCode from '../../components/Icon/IconCode';
// import { IRootState } from '../../store';
// import { pieChartDashboard } from './../../Fetcher/Api';
// import { setPageTitle } from '../../store/themeConfigSlice';

// const ScoutTeamChart = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('Charts'));
//     });
//     const [codeArr, setCodeArr] = useState<string[]>([]);
//     const [chartData, setChartData] = useState<{series : number[], labels : string[]}>({series : [], labels : []})

//     const generateRandonColors = (numColor : number)=>{
//         const colors = [];
//         for(let i = 0; i < numColor; i++){
//             const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//             colors.push(color);
//         }
//         return colors;

//         // return color;
//     }
//     // Pie chart API integrage or get pie chart data 
//     useEffect(()=>{
//         const getChartData = async ()=>{
//             try{

//                 const pieChartData = await pieChartDashboard();
//                 console.log("series") 
//                 const series = pieChartData.map((item : any) => item.entry_count);
//                 console.log("2") 
//                 console.log(series) 
//                 const labels = pieChartData.map((item : any) => item.name); 
//                 setChartData({ series, labels })
//                 console.log("3") 
//             }catch(error){
//                 console.error("Error fetching pie chart data", error);
//             }
//         }
//         getChartData();
//     },[]);
//     // Pie chart API integrage or get pie chart data 


//     const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

//     // pieChartOptions
//     const pieChart: any = {
//         // series: [44, 55, 13, 43, 22],
//         series: chartData.series,
//         options: {
//             chart: {
//                 height: 300,
//                 type: 'pie',
//                 zoom: {
//                     enabled: false,
//                 },
//                 toolbar: {
//                     show: false,
//                 },
//             },
//             // labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
//             labels: chartData.labels,
//             colors: generateRandonColors(chartData.labels.length),
//             // colors: ['#F59927', '#805dca', '#00ab55', '#e7515a', '#e2a03f'],
//             responsive: [
//                 {
//                     breakpoint: 480,
//                     options: {
//                         chart: {
//                             width: 200,
//                         },
//                     },
//                 },
//             ],
//             stroke: {
//                 show: false,
//             },
//             legend: {
//                 position: 'bottom',
//             },
//         },
//     };


//     return (
//         <>

//                 <div className="panel">
//                     <div className="mb-5 flex items-center justify-between">
//                         <h5 className="text-lg font-semibold dark:text-white">Scout Team</h5>
//                     </div>
//                     <br />
//                     <div className="mb-5">
//                         <ReactApexChart series={pieChart.series} options={pieChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="pie" height={300} />
//                     </div>
//                 </div>
//         </>
//     );
// };

// export default ScoutTeamChart;



















































import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { pieChartDashboard } from './../../Fetcher/Api';
import { setPageTitle } from '../../store/themeConfigSlice';

const TopScoutMember = () => {
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Charts'));

        const fetchData = async () => {
            try {
                const data = await pieChartDashboard();
                setTableData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="panel">
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Top Scout Members</h5>
            </div>
            <div className="table-responsive mb-5">
                <table className="table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number of Scouts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data : any) => (
                            <tr key={data.name}>
                                <td>
                                    <div className="whitespace-nowrap">{data.name}</div>
                                </td>
                                <td>{data.entry_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopScoutMember;

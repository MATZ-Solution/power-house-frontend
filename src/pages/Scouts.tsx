import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import 'tippy.js/dist/tippy.css';
import ScreenLoader from './Elements/ScreenLoader';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import { getAllScouts } from '../Fetcher/Api';
import { useQuery } from '@tanstack/react-query';
import { IRootState } from '../store';
import ReactPaginate from 'react-paginate';
import './../assets/css/pagination.css'; // Import your CSS file here

function Scouts() {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Scouts'));
    }, [dispatch]);

    const [errorHandle, setErrorHandle] = useState({
        error: false,
        message: '',
        serverError: false,
        isLoading: false,
    });

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['getAllScout'],
        queryFn: getAllScouts,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const handlePageClick = (event:any) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = data?.slice(offset, offset + itemsPerPage) || [];
    const pageCount = Math.ceil((data?.length || 0) / itemsPerPage);

    if (isLoading) {
        return <ScreenLoader />;
    }

    if (isError) {
        const errorMessage = error?.message === 'Failed to fetch' ? 'Server Cannot Respond' : 'Internal Server Error';
        return <SomeThingWentWrong message={errorMessage} errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Scouted-Locations</p>
                </div>
            </ul>
            {currentItems.length === 0 ? (
                <div className="flex items-center justify-center mt-5 h-[70vh]">
                    <p className="text-black font-bold text-xl">No Scout Location available.</p>
                </div>
            ) : (
                <div className={`pt-5`}>
                    <div className="panel table-responsive mb-5 rounded-[20px]">
                        <table>
                            <thead>
                                <tr className="border-b-[1px] border-[#e5e7eb]">
                                    <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>ID</th>
                                    <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Project Type</th>
                                    <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Project Name</th>
                                    <th className={`font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Address</th>
                                    <th className={`font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Scouted By</th>
                                    <th className={`font-extrabold whitespace-nowrap ${isDark ? 'text-white' : 'text-black'}`}>Contractor Name</th>
                                    <th className={`whitespace-nowrap font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Contractor Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item:any) => (
                                    <tr key={item.id}>
                                        <td className="whitespace-nowrap">{item.refrenceId}</td>
                                        <td>
                                            <div
                                                className={`whitespace-nowrap badge ${
                                                    item.projectType === 'Market' ? 'bg-success' : item.projectType === 'Project' ? 'bg-info' : ''
                                                } flex justify-center`}
                                            >
                                                {item.projectType}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap">{item.projectName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.scoutedBy}</td>
                                        <td className="whitespace-nowrap">{item.contractorName}</td>
                                        <td className="whitespace-nowrap">{item.contractorNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                        disabledClassName={'disabled'}
                    />
                </div>
            )}
        </div>
    );
}

export default Scouts;

import React from 'react';
import Banner from '../components/Banner';
// import '../assets/css/test.css';

const ViewLog = () => {
    return (
        <>
            <Banner />
            <section className="">
                <div className="block bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="p-6">
                        <form className="max-w-md">
                            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search Anything..."
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <div className="">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
                                <thead className="text-xs text-black uppercase bg-[#FDF2F2] dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                        Project Type
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        Project Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        Scouted By
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        Contractor name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        Contractor Number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button type="button" className="text-white bg-[#F9C74F] font-medium rounded-full text-sm px-5 py-2 text-center">Market</button>
                                        </th>
                                        <td className="px-6 py-4 font-bold">Residential Villa</td>
                                        <td className="px-6 py-4"><div className="font-bold">Amir Iqbal</div><span>(201) 987-4567</span></td>
                                        <td className="px-6 py-4 font-bold">Amir Iqbal</td>
                                        <td className="px-6 py-4 font-bold">(201) 987-4567</td>
                                        <td className="px-6 py-4"><div className="font-bold">Land No. 612</div><span>Khor Fakkan / Sharjah</span></td>
                                        <td className="px-6 py-4"><button type="button" className="text-white bg-[#F59927] font-medium rounded-lg text-sm px-10 py-2">View Logs</button></td>  
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button type="button" className="text-white bg-[#6FCF97] font-medium rounded-full text-sm px-5 py-2 text-center">Commercial</button>
                                        </th>
                                        <td className="px-6 py-4 font-bold">Residential Villa</td>
                                        <td className="px-6 py-4"><div className="font-bold">Amir Iqbal</div><span>(201) 987-4567</span></td>
                                        <td className="px-6 py-4 font-bold">Amir Iqbal</td>
                                        <td className="px-6 py-4 font-bold">(201) 987-4567</td>
                                        <td className="px-6 py-4"><div className="font-bold">Land No. 612</div><span>Khor Fakkan / Sharjah</span></td>
                                        <td className="px-6 py-4"><button type="button" className="text-white bg-[#F59927] font-medium rounded-lg text-sm px-10 py-2">View Logs</button></td>  
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button type="button" className="text-white bg-[#1F3C88] font-medium rounded-full text-sm px-5 py-2 text-center">Residential</button>
                                        </th>
                                        <td className="px-6 py-4 font-bold">Residential Villa</td>
                                        <td className="px-6 py-4"><div className="font-bold">Amir Iqbal</div><span>(201) 987-4567</span></td>
                                        <td className="px-6 py-4 font-bold">Amir Iqbal</td>
                                        <td className="px-6 py-4 font-bold">(201) 987-4567</td>
                                        <td className="px-6 py-4"><div className="font-bold">Land No. 612</div><span>Khor Fakkan / Sharjah</span></td>
                                        <td className="px-6 py-4"><button type="button" className="text-white bg-[#F59927] font-medium rounded-lg text-sm px-10 py-2">View Logs</button></td>  
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ViewLog;

import React from 'react';
import Banner from '../components/Banner';
import '../assets/css/test.css';

const bannerData = {
    image: "/assets/images/mobile-banner.png",
    title: "Residential Villa",
    titleColored: "",
    para: "There is no better way to understand the benefits of electrical products than seeing them in action at a",
    paraBold: "Powerhouse Display Centers."
}

const AllLocations = () => {
    return (
        <>
            <Banner bannerData={bannerData} />
            <section>
                <div className="flex flex-wrap">
                    <form className="max-w-sm me-3">
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
                                className="mb-2 md:mb-0 block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Logs..."
                                required
                            />
                        </div>
                    </form>
                    <div className="">
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-white bg-[#F59927] rounded-lg text-sm px-3 py-3.5 text-center inline-flex items-center"
                            type="button"
                        >
                            <img src="/assets/images/filter-icon.svg" alt="" width={15} />
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Earnings
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                        <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">12-June-2024 - 3:30 PM </span>
                    </div>

                    <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                        <img src="/assets/images/currect-lolipop.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                        <div className="flex justify-between flex-wrap">
                            <div className="">
                                <span className="text-gray-500">Scouted - </span>
                                <span className="text-[#F59927] font-black">Residential</span>
                                <p className="font-black">Location Scouted at Land No. 612 Khor Fakkan / Sharjah </p>
                                <small className="text-gray-500">12-07-2024 - 3:30 PM</small>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-left">
                                <div className="">
                                    <img src="/assets/images/office-man.png" className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                </div>
                                <div className="ms-3">
                                    <span className="text-gray-500">Scouted By</span>
                                    <p className="text-[#F59927] font-black text-2xl">Amir Iqbal</p>
                                    <small className="text-gray-500">Electrical Department</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                        <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">12-June-2024 - 3:30 PM </span>
                    </div>

                    <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                        <img src="/assets/images/currect-lolipop-green.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                        <div className="flex justify-between flex-wrap">
                            <div className="">
                                <span className="text-gray-500">Scouted - </span>
                                <span className="text-[#F59927] font-black">Residential</span>
                                <p className="font-black">Location Scouted at Land No. 612 Khor Fakkan / Sharjah </p>
                                <small className="text-gray-500">12-07-2024 - 3:30 PM</small>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-left">
                                <div className="">
                                    <img src="/assets/images/office-man.png" className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                </div>
                                <div className="ms-3">
                                    <span className="text-gray-500">Scouted By</span>
                                    <p className="text-[#F59927] font-black text-2xl">Amir Iqbal</p>
                                    <small className="text-gray-500">Electrical Department</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                        <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">12-June-2024 - 3:30 PM </span>
                    </div>

                    <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                        <img src="/assets/images/currect-lolipop-hand.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                        <div className="flex justify-between flex-wrap">
                            <div className="">
                                <span className="text-gray-500">Scouted - </span>
                                <span className="text-[#F59927] font-black">Residential</span>
                                <p className="font-black">Location Scouted at Land No. 612 Khor Fakkan / Sharjah </p>
                                <small className="text-gray-500">12-07-2024 - 3:30 PM</small>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-left">
                                <div className="">
                                    <img src="/assets/images/office-man.png" className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                </div>
                                <div className="ms-3">
                                    <span className="text-gray-500">Scouted By</span>
                                    <p className="text-[#F59927] font-black text-2xl">Amir Iqbal</p>
                                    <small className="text-gray-500">Electrical Department</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                        <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">12-June-2024 - 3:30 PM </span>
                    </div>

                    <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center md:text-left">
                        <img src="/assets/images/currect-lolipop-hand-blue.svg" className="absolute bottom-0 left-6 hidden md:block" alt="" />
                        <div className="flex justify-center md:justify-between flex-wrap">
                            <div className="">
                                <span className="text-gray-500">Scouted - </span>
                                <span className="text-[#F59927] font-black">Residential</span>
                                <p className="">
                                    Handshake request initiated on <span className="font-black">CLIFTON BLOCK 9</span> project by <span className="font-black">IMRAN YOUSAF</span>
                                </p>
                                <small className="text-gray-500">12-07-2024 - 3:30 PM</small>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-left">
                                <div className="">
                                    <span className="text-gray-500">Requested Members</span>
                                    <div className="mt-1 relative h-[40px]">
                                        <img
                                            src="/assets/images/office-man.png"
                                            className="w-[40px] h-[40px] bottom-0 left-0 object-cover border-transparent rounded-full absolute border-2 border-[#CFCFCF]"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/office-man.png"
                                            className="w-[40px] h-[40px] bottom-0 left-[25px] object-cover border-transparent rounded-full absolute border-2 border-[#CFCFCF]"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/office-man.png"
                                            className="w-[40px] h-[40px] bottom-0 left-[50px] object-cover border-transparent rounded-full absolute border-2 border-[#CFCFCF]"
                                            alt=""
                                        />
                                        <div className="absolute bottom-0 left-[75px] flex items-center justify-center w-[40px] h-[40px] bg-[#2E2E30] text-white font-black rounded-full border-2 border-[#CFCFCF]">+3</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-[#D7D7D7] border-0" />
                        <span className="absolute px-3 w-max text-black bg-[#eee9] -translate-x-1/2 left-1/2 font-black">12-June-2024 - 3:30 PM </span>
                    </div>

                    <div className="relative block py-4 px-10 padding-start bg-[#F9F9F9] border border-gray-200 rounded-lg shadow text-center sm:text-left">
                        <img src="/assets/images/currect-lolipop-hand-dark-blue.svg" className="absolute bottom-0 left-6 hidden sm:block" alt="" />
                        <div className="flex justify-between flex-wrap">
                            <div className="">
                                <span className="text-gray-500">Scouted - </span>
                                <span className="text-[#F59927] font-black">Residential</span>
                                <p className="font-black">Location Scouted at Land No. 612 Khor Fakkan / Sharjah </p>
                                <small className="text-gray-500">12-07-2024 - 3:30 PM</small>
                            </div>
                            <div className="flex flex-wrap justify-center sm:justify-left">
                                <div className="">
                                    <img src="/assets/images/office-man.png" className="w-[70px] h-[70px] object-cover border-transparent rounded-full" alt="" />
                                </div>
                                <div className="ms-3">
                                    <span className="text-gray-500">Scouted By</span>
                                    <p className="text-[#F59927] font-black text-2xl">Amir Iqbal</p>
                                    <small className="text-gray-500">Electrical Department</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AllLocations;

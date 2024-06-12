import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconCircleCheck from './Icon/IconCircleCheck';
import IconServer from './Icon/IconServer';
import IconInfoCircle from './Icon/IconInfoCircle';
function ModalInfo({ message, success }: any) {
    return (
        <div className="px-2 sm:px-0 w-full h-[100vh] fixed z-50 top-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
                {/* <div className="flex justify-between items-center h-28 border-b border-gray-200"> */}
                {/* <h2 className="text-xl font-semibold">{title}</h2> */}
                {/* <button className="text-gray-500 hover:text-gray-700 focus:outline-none" 
                    onClick={onClose}
                    > */}
                {/* <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button> */}
                {/* </div> */}
                {success ? (
                    <div className="h-24 relative  flex items-center border sm:p-3.5 rounded text-success bg-success-light border-success ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light">
                        <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                            <IconCircleCheck className="w-8 h-8" />
                        </span>
                        <span className="ltr:pr-2 rtl:pl-2">
                            <strong className="ltr:mr-1 rtl:ml-1 sm:text-lg">{message}</strong>.
                        </span>
                    </div>
                ) : (
                    <div className="h-24 relative flex items-center border p-3.5 rounded text-[#e75151] bg-[#f1cfcf] border-[#e75151] ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light">
                        <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                            <IconInfoCircle className="w-8 h-8" />
                        </span>
                        <span className="ltr:pr-2 rtl:pl-2">
                            <strong className="ltr:mr-1 rtl:ml-1 sm:text-lg">{message}</strong>.
                        </span>
                    </div>
                )}

                {/* <div className="h-32 p-4 flex items-center justify-center gap-3">
                    {success ? (
                        <CheckCircleOutlineIcon className="text-green-700 w-10 h-10" style={{ strokeWidth: 4 }} />
                    ) : (
                        <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    )}
                    <p className={`inline leading-6  text-wrap text-left text-lg ${success ? 'text-green-700' : 'text-red-600'} text-base font-bold`}>{message}</p>
                </div> */}

                {/* <div className="p-4 border-t border-gray-200 text-right">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                     onClick={handleModal}
                     >
                        Close
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default ModalInfo;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
function ModalInfo({ message, success }: any) {
    // console.log('this is success from info modal', success)
    return (
        <div className="w-full h-[100vh] fixed z-30 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
                <div className="h-32 p-4 flex items-center justify-center gap-3">
                    {success ? (
                         <CheckCircleOutlineIcon className="text-green-700 w-10 h-10" style={{ strokeWidth: 4 }} />
                    //    <CheckCircleOutlineIcon style={{strokeWidth: 4}} className='text-green-700 w-10 h-10'/>
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
                </div>

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

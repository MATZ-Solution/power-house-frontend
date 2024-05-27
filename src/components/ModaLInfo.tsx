import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

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
                <div className="h-32 p-4 flex items-center justify-center">
                    {/* <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-4 rounded-md" /> */}
                   <p className={`${success ? 'text-green-700': 'text-red-700'} text-base font-bold`}>{message}</p> 
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

import React from 'react';

const ScoutMembersComponent = ({img,count,col}:any) => {
    return (
        <div className="flex flex-col items-center border-x">
            <img src={img} alt="" />
            <p className="text-sm tracking-tight text-gray-900  dark:text-white">Residential</p>
            <p className={`${col} text-lg font-black`}>{count}</p>
        </div>
    );
};

export default ScoutMembersComponent;

import Select, { SingleValue } from 'react-select';
import React from 'react'
const myStyleCommercial = {
    color: 'blue',
    // margin: '10px'
};
const myStyleResidential = {
    color: '#F7A100',
    // margin: '10px'
};
const myStyleProject = {
    color:'green' ,
    // margin: '10px'
};
const AreaSelect = ({
    uniqueAreas,
    handleAreaChange,
    commercialCount,
    residentialCount,
    projectCount
}:{
    uniqueAreas: any,
    handleAreaChange: (value: SingleValue<{ value: string, label: string }>) => void,
    commercialCount: number,
    residentialCount: number,
    projectCount: number
}) => {
  return (
    <>
<div className='
md:flex md:justify-between md:items-center mb-4
'>
                <div className="w-full px-2">
                    <Select
                        options={[
                            { value: 'All', label: 'All' },
                            ...uniqueAreas.map((area:any) => ({ value: area, label: area }))
                        ]}
                        onChange={handleAreaChange}
                        defaultValue={{ value: 'All', label: 'All' }}
                        // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    />
                </div>
                <div className="w-full flex px-2 justify-evenly items-center">
                   <b> <h1 style={myStyleCommercial}>Commercial: {commercialCount}</h1></b>
                   <b> <h1 style={myStyleResidential}>Residential: {residentialCount}</h1></b>
                   <b> <h1 style={myStyleProject}>Project: {projectCount}</h1></b>
                </div>
            </div>
    </>
  )
}

export default AreaSelect

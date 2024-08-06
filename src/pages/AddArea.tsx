// AddArea.tsx

import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AddAreaCSVfile, AddAreas, getAllAreas, getCity } from '../Fetcher/Api';
import { IRootState } from '../store';
import { alertFail, alertSuccess, alertInfo } from './Components/Alert';
import TableComponent from './Components/TableComponent';

function AddArea() {
    // ################ VARIABLES ################
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const dispatch = useDispatch();

    let [cityValues, setCityValues] = useState('');
    let queryClient: any = useQueryClient();
    const fileInputRef = useRef<any>(null);
    let [wrongFile, setWrongFile] = useState(false);
    let [csvFileMessage, setCSVfileMessage] = useState('');
    let [values, setValues] = useState({
        cityId: '',
        cityError: false,
        areaName: '',
        areaError: false,
    });
    const [search, setSearch] = useState('');
    const [initialRecords, setInitialRecords] = useState<any[]>([]);

    // ################ MUTATION AND USE QUERY ################

    const mutationAreaCSVfile = useMutation({
        mutationKey: ['AddAreaCSVfile'],
        mutationFn: AddAreaCSVfile,
        onSuccess: () => {
            alertSuccess('Successfully add CSV file');
        },
        onError: () => {
            alertFail('Failed To add CSV file');
        },
    });

    let { isError, data } = useQuery({
        queryKey: ['getCities'],
        queryFn: getCity,
        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const mutation = useMutation({
        mutationKey: ['addArea'],
        mutationFn: AddAreas,
        onSuccess: () => {
            queryClient.invalidateQueries(['getAreas']);
            setValues({ ...values, areaName: '' });
            setCityValues('');
        },
    });

    // ################ USE EFFECT ################

    useEffect(() => {
        dispatch(setPageTitle('Add Area'));
    });

    useEffect(() => {
        setTimeout(() => {
            setWrongFile(false);
        }, 3000);
    }, [wrongFile]);

    const {
        isLoading: getAreaIsLoading,
        isError: getAreaIsError,
        error: getAreaError,
        data: getAreaData = [],
    } = useQuery({
        queryKey: ['getArea'],
        queryFn: getAllAreas,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    useEffect(() => {
        if (getAreaData.length > 0) {
            setInitialRecords(getAreaData);
        }
    }, [getAreaData]);

    // ################ FUNCTIONS ################

    function handleArea() {
        setValues({ ...values, cityError: false, areaError: false });
        if (!values.cityId) {
            return setValues({ ...values, cityError: true });
        }
        if (!values.areaName) {
            return setValues({ ...values, areaError: true });
        }
        mutation.mutate(values, {
            onSuccess: () => {
                mutation.reset();
                alertSuccess('Successfully added Area');
            },
            onError: (err) => {
                mutation.reset();
                alertFail(err.message);
            },
        });
    }

    const onSubmitAreaCSVfile = (e: any) => {
        let file = e.target.files[0];
        let form = new FormData();
        form.append('file', file);
        form.append('cityId', values.cityId);
        if (!file?.name?.toLowerCase().endsWith('.csv')) {
            fileInputRef.current.value = null;
            setCSVfileMessage('Please Select a CSV File');
            return setWrongFile(true);
        }

        if (!values.cityId) {
            fileInputRef.current.value = null;
            setCSVfileMessage('Please Select City First');
            return setWrongFile(true);
        }
        mutationAreaCSVfile.mutate(form, {
            onSuccess: () => {
                mutationAreaCSVfile.reset();
            },
            onError: () => {
                mutationAreaCSVfile.reset();
            },
        });
        fileInputRef.current.value = null;
    };

    function handleCity(e: any) {
        setCityValues(e.target.value);
        setValues({ ...values, cityId: e.target.value });
    }
    const columns = [
        { accessor: 'cityName', title: 'City' },
        { accessor: 'AreaName', title: 'Area' },
    ];

    return (
        <>
            {wrongFile && alertInfo(csvFileMessage)}
            <div className='flex flex-col gap-6'>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Add Areas</p>
                </div>
            </ul>
            <div className={` p-5 ${isDark ? 'bg-[#0e1726]' : 'bg-white'} rounded-[20px]`}>
                <div className={`flex flex-col gap-5 `}>
                    <div>
                        <div className="font-semibold mb-1.5">Select City</div>

                        <select
                            value={cityValues}
                            onChange={handleCity}
                            className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                        >
                            <option value="">Not Selected</option>
                            {isError ? (
                                <option className="text-red-700">Falied To Get Cities</option>
                            ) : (
                                <>
                                    {data?.map((city: any, index: any) => {
                                        return (
                                            <option key={index} value={city?.id}>
                                                {city.cityName}
                                            </option>
                                        );
                                    })}
                                </>
                            )}
                        </select>
                        {values.cityError && <p className="mt-4 text-red-800">Please Select City</p>}
                    </div>
                    <div>
                        <div className="font-semibold mb-1.5">Add Area</div>
                        <div className="w-full flex gap-2 ">
                            <div className="w-full">
                                <input
                                    value={values.areaName}
                                    type="text"
                                    onChange={(e) => setValues({ ...values, areaName: e.target.value })}
                                    placeholder="Add Area"
                                    className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                />
                            </div>
                            <div className="">
                                <button disabled={mutation.isPending} type="button" className=" btn btn-primary rounded-full px-10 py-3" onClick={handleArea}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    {values.areaError && <p className=" text-red-800">Please Select Area</p>}
                </div>
                <div className="mt-4 flex flex-col gap-3">
                    <h1 className="font-bold text-medium">Add A CSV File To Add Area</h1>
                    <div>
                        <input ref={fileInputRef} type="file" onChange={onSubmitAreaCSVfile} />
                    </div>
                </div>
                <div className="w-auto">
                    <a href="/Area.csv" className="inline-block" download>
                        <button type="button" className="mt-4 btn btn-primary rounded-full h-11">
                            Download Sample CSV File
                        </button>
                    </a>
                </div>
            </div>
            <div className={` rounded-[20px]`}><ul className="flex space-x-2 rtl:space-x-reverse mb-5">
                <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Areas</p>
                </div>
            </ul><TableComponent getAreaData={getAreaData} initialRecords={initialRecords} search={search} setSearch={setSearch} columns={columns} /></div>


            </div>
        </>
    );
}

export default AddArea;

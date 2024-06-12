import React, { Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IRootState } from '../store';
// const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AddSubAreas } from '../Fetcher/Api';
import ModalInfo from '../components/ModaLInfo';
import { getAreas, getCity, AddSubAreaCSVfile } from '../Fetcher/Api';

function AddSubArea() {
    // ################ VARIABLES ################
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const dispatch = useDispatch();
    const fileInputRef = useRef<any>(null);

    let [cityValues, setCityValues] = useState('');
    let [areaValues, setAreaValues] = useState('');
    let [wrongFile, setWrongFile] = useState(false);
    let [csvFileMessage, setCSVfileMessage] = useState('');

    let [values, setValues] = useState({
        cityId: '',
        cityError: false,
        areaId: '',
        areaError: false,
        subAreaName: '',
        subAreaError: false,
    });

    // ################ MUTATION AND USE QUERY ################

    const mutationSubAreaCSVfile = useMutation({
        mutationKey: ['AddSubAreaCSVfile'],
        mutationFn: AddSubAreaCSVfile,
        onSuccess: () => {
            setTimeout(() => {
                mutationSubAreaCSVfile.reset();
            }, 3000);
        },
        onError: () => {
            setTimeout(() => {
                mutationSubAreaCSVfile.reset();
            }, 3000);
        },
    });

    let {
        isError,
        data: cityData,
        isLoading: cityLoading,
    } = useQuery({
        queryKey: ['getCity'],
        queryFn: getCity,
        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    let {
        isError: areaIsError,
        isLoading: areaLoading,
        data: areaData,
        error: areaError,
    } = useQuery({
        queryKey: ['getAreas', values?.cityId],
        queryFn: () => getAreas(values?.cityId),
        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const mutation = useMutation({
        mutationKey: ['addSubArea'],
        mutationFn: () => AddSubAreas(values.areaId, values.subAreaName),
        onSuccess: () => {
            setCityValues('');
            setAreaValues('');
            setValues({ ...values, cityError: false, areaError: false, subAreaError: false, subAreaName: '' });
            setTimeout(() => {
                mutation.reset();
            }, 3000);
        },
        onError: () => {
            setTimeout(() => {
                mutation.reset();
            }, 3000);
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

    // ################ FUNCTIONS ################

    function handleCity(e: any) {
        setCityValues(e.target.value);
        setValues({ ...values, cityId: e.target.value });
    }

    function handleArea(e: any) {
        setAreaValues(e.target.value);
        setValues({ ...values, areaId: e.target.value });
    }

    function handleSubArea() {
        // setValues({ ...values, cityError: false,areaError: false, subAreaError: false });
        if (!values.cityId) {
            return setValues({ ...values, cityError: true });
        }
        if (!values.areaId) {
            return setValues({ ...values, areaError: true });
        }
        if (!values.subAreaName) {
            return setValues({ ...values, subAreaError: true });
        }
        mutation.mutate();
    }

    const onSubmitSubAreaCSVfile = (e: any) => {
        let file = e.target.files[0];
        let form = new FormData();
        form.append('file', file);
        form.append('areaId', values.areaId);
        if (!file?.name?.toLowerCase().endsWith('.csv')) {
            fileInputRef.current.value = null;
            setCSVfileMessage('Please Select a CSV File');
            return setWrongFile(true);
        }

        if (!values.areaId) {
            fileInputRef.current.value = null;
            setCSVfileMessage('Please Select Area First');
            return setWrongFile(true);
        }

        mutationSubAreaCSVfile.mutate(form);
        fileInputRef.current.value = null;
    };

    return (
        <div>
            {mutation.isSuccess && <ModalInfo message="Successfully added Sub Area" success={mutation.isSuccess} />}
            {mutation.isError && <ModalInfo message={mutation.error.message} success={mutation.isSuccess} />}
            {mutationSubAreaCSVfile.isSuccess && <ModalInfo message="Successfully add CSV file " success={mutationSubAreaCSVfile.isSuccess} />}
            {mutationSubAreaCSVfile.isError && <ModalInfo message={mutationSubAreaCSVfile.error?.message} success={mutationSubAreaCSVfile.isSuccess} />}
            {wrongFile && <ModalInfo message={csvFileMessage} success={false} />}
            <ul className="flex space-x-2 rtl:space-x-reverse">
            <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Add Sub-Areas</p>
                </div>
                {/* <li>
                    <Link to="#" className="text-primary hover:underline">
                        SetUp Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Sub-Area</span>
                </li> */}
            </ul>
            <div className={`mt-5 p-5 ${isDark ? 'bg-[#0e1726]' : 'bg-white'} rounded-[20px] `}>
                <div className="flex flex-col gap-5">
                    <div>
                        <div className="font-semibold mb-1.5">Select City</div>
                        <select
                            value={cityValues}
                            onChange={handleCity}
                            className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                        >
                            {/* <option value="">Not Selected</option> */}
                            {cityLoading ? (
                                <option value="">Loading..</option>
                            ) : isError ? (
                                <p className="text-red-700">Falied To Get Cities</p>
                            ) : (
                                <>
                                    {cityData?.map((city: any, index: any) => {
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
                        <div className="font-semibold mb-1.5">Select Area</div>

                        <select
                            value={areaValues}
                            onChange={handleArea}
                            className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                        >
                            {!values.cityId ? (
                                <option value="" className="text-red-700">
                                    Please Select City First
                                </option>
                            ) : areaLoading ? (
                                <option value="" className="text-red-700">
                                    Loading...
                                </option>
                            ) : areaIsError ? (
                                <option value="" className="text-red-700">
                                    {areaError?.message}
                                </option>
                            ) : (
                                <>
                                    <option value="">Select Area </option>
                                    {areaData?.map((area: any, index: any) => {
                                        return (
                                            <option key={index} value={area?.id}>
                                                {area?.AreaName}
                                            </option>
                                        );
                                    })}
                                </>
                            )}
                        </select>
                        {values.areaError && <p className="mt-4 text-red-800">Please Select Area</p>}
                    </div>
                    <div>
                        <div className="font-semibold mb-1.5">Add Sub Area</div>
                        <div className="w-full flex gap-2">
                            <div className="w-full">
                                <input
                                    value={values.subAreaName}
                                    type="text"
                                    onChange={(e) => setValues({ ...values, subAreaName: e.target.value })}
                                    placeholder="Add Sub Area"
                                    className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                />
                            </div>
                            <div className="">
                                <button type="button" className=" btn btn-primary rounded-full px-10 py-3" onClick={handleSubArea}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    {values.subAreaError && <p className=" text-red-800">Please Select Sub-Area Name</p>}
                </div>
                <div className="mt-4 flex flex-col gap-3">
                    <h1 className="font-bold text-medium">Add A CSV File</h1>
                    <div>
                        <input ref={fileInputRef} type="file" onChange={onSubmitSubAreaCSVfile} />
                    </div>
                </div>
                <div className="w-auto">
                    <a href="/subArea.csv" className="inline-block" download>
                        <button type="button" className="mt-4 btn btn-primary rounded-full h-11">
                            Download Sample CSV File
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AddSubArea;

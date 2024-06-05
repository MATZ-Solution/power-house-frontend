import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddCity, AddCityCSVfile } from '../Fetcher/Api';
import ModalInfo from '../components/ModaLInfo';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';

function SetupCities() {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    let [city, setCity] = useState('');
    let queryClient: any = useQueryClient();
    // let [file, setFile] = useState(null);
    let [wrongFile, setWrongFile] = useState(false);
    const fileInputRef = useRef<any>(null);
    const mutation = useMutation({
        mutationKey: ['AddCity'],
        mutationFn: AddCity,
        onSuccess: () => {
            queryClient.invalidateQueries(['getCities']);
            setCity('');
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

    const onSubmitCity = (e: any) => {
        mutation.mutate(city);
    };

    const mutationCityCSVfile = useMutation({
        mutationKey: ['AddCityCSVfile'],
        mutationFn: AddCityCSVfile,
        onSuccess: () => {
            queryClient.invalidateQueries(['getCities']);
            setCity('');
            setTimeout(() => {
                mutationCityCSVfile.reset();
            }, 3000);
        },
        onError: () => {
            setTimeout(() => {
                mutationCityCSVfile.reset();
            }, 3000);
        },
    });

    const onSubmitCityCSVfile = (e: any) => {
        let file = e.target.files[0];
        let form = new FormData();
        form.append('file', file);
        console.log('file', file);
        if (!file?.name?.toLowerCase().endsWith('.csv')) {
            fileInputRef.current.value = null;
            return setWrongFile(true);
        }
        mutationCityCSVfile.mutate(form);
        fileInputRef.current.value = null;
    };

    useEffect(() => {
        setTimeout(() => {
            mutationCityCSVfile.reset();
        }, 3000);
    }, [mutationCityCSVfile.isSuccess, mutationCityCSVfile.isError]);

    useEffect(() => {
        setTimeout(() => {
            setWrongFile(false);
        }, 3000);
    }, [wrongFile]);

    return (
        <>
            {mutation.isSuccess && <ModalInfo message="Successfully add City" success={mutation.isSuccess} />}
            {mutation.isError && <ModalInfo message={mutation.error?.message} success={mutation.isSuccess} />}
            {mutationCityCSVfile.isSuccess && <ModalInfo message="Successfully add CSV file " success={mutationCityCSVfile.isSuccess} />}
            {mutationCityCSVfile.isError && <ModalInfo message={mutationCityCSVfile.error?.message} success={mutationCityCSVfile.isSuccess} />}
            {wrongFile && <ModalInfo message="Please Select a CSV File" success={false} />}

            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Add Cities</p>
                </div>
                    {/* <li>
                        <Link to="#" className="text-primary hover:underline">
                            SetUp Forms
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Add Cities</span>
                    </li> */}
                </ul>
                <div className={`mt-5 p-5 ${isDark ? 'bg-[#0e1726]' : 'bg-white'} rounded-[20px]`}>
                    <div className="flex flex-col gap-2">
                        {/* <Form className="w-full flex gap-2" onSubmit={mutation.mutate}> */}
                        <div className="w-full flex gap-2 ">
                            <div className="w-full">
                                <input
                                    value={city}
                                    type="text"
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Add Cities"
                                    className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                />
                            </div>
                            <div className="">
                                <button type="button" className=" btn btn-primary rounded-full px-10 py-3" onClick={onSubmitCity}>
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                            <h1 className="font-bold text-medium">Add A CSV File</h1>
                            <div>
                                <input ref={fileInputRef} type="file" onChange={onSubmitCityCSVfile} />
                            </div>
                        </div>
                        <div className="w-auto">
                            <a href="/City.csv" className="inline-block" download>
                                <button type="button" className="mt-4 btn btn-primary rounded-full h-11">
                                    Download Sample CSV File
                                </button>
                            </a>
                        </div>

                        {/* </Form> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SetupCities;

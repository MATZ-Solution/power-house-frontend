import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
// const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { AddAreaCSVfile, AddAreas, getCity } from '../Fetcher/Api';
import ModalInfo from '../components/ModaLInfo';

function AddArea() {
    // ################ VARIABLES ################

    const dispatch = useDispatch();

    let [cityValues, setCityValues] = useState('');
    let queryClient: any = useQueryClient();

    // const fileInputRef = useRef(null);
    const fileInputRef = useRef<any>(null);

    let [wrongFile, setWrongFile] = useState(false);
    let [csvFileMessage, setCSVfileMessage] = useState('');

    let [values, setValues] = useState({
        cityId: '',
        cityError: false,
        areaName: '',
        areaError: false,
    });

    // ################ MUTATION AND USE QUERY ################

    const mutationAreaCSVfile = useMutation({
        mutationKey: ['AddAreaCSVfile'],
        mutationFn: AddAreaCSVfile,
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

    // useEffect(() => {
    //     setTimeout(() => {
    //         mutationAreaCSVfile.reset();
    //     }, 3000);
    // }, [mutationAreaCSVfile.isSuccess, mutationAreaCSVfile.isError]);

    useEffect(() => {
        setTimeout(() => {
            setWrongFile(false);
        }, 3000);
    }, [wrongFile]);

    // ################ FUNCTIONS ################

    function handleArea() {
        setValues({ ...values, cityError: false, areaError: false });
        if (!values.cityId) {
            return setValues({ ...values, cityError: true });
        }
        if (!values.areaName) {
            return setValues({ ...values, areaError: true });
        }
        mutation.mutate(values,{
            onSuccess: ()=>{
                setTimeout(() => {
                    mutation.reset();
                }, 3000)
            },
            onError: ()=>{
                setTimeout(() => {
                    mutation.reset();
                }, 3000)
            }
        });
    }

    const onSubmitAreaCSVfile = (e: any) => {
        let file = e.target.files[0];
        let form = new FormData();
        form.append('file', file);
        form.append('cityId', values.cityId);
        console.log('file', file);
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

        mutationAreaCSVfile.mutate(form,{
            onSuccess: ()=>{
                setTimeout(() => {
                    mutationAreaCSVfile.reset();
                }, 3000);
            },
            onError: ()=>{
                setTimeout(() => {
                    mutationAreaCSVfile.reset();
                }, 3000);
            }
        });
        fileInputRef.current.value = null;
    };

    function handleCity(e: any) {
        setCityValues(e.target.value);
        setValues({ ...values, cityId: e.target.value });
    }

    return (
        <div>
            {mutation.isSuccess && <ModalInfo message="Successfully added Area" success={mutation.isSuccess} />}
            {mutation.isError && <ModalInfo message={mutation.error.message} success={mutation.isSuccess} />}
            {mutationAreaCSVfile.isSuccess && <ModalInfo message="Successfully add CSV file " success={mutationAreaCSVfile.isSuccess} />}
            {mutationAreaCSVfile.isError && <ModalInfo message={mutationAreaCSVfile.error?.message} success={mutationAreaCSVfile.isSuccess} />}
            {wrongFile && <ModalInfo message={csvFileMessage} success={false} />}
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                    SetUp Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Area</span>
                </li>
            </ul>
            <div className="pt-5 flex flex-col gap-5">
                <div>
                    <div className="font-semibold mb-1.5">Select City</div>

                    <select
                        value={cityValues}
                        onChange={handleCity}
                        className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                    >
                        <option value="">Not Selected</option>
                        {isError ? (
                            <p className="text-red-700">Falied To Get Cities</p>
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
                            <button type="button" className=" btn btn-primary rounded-full px-10 py-3" onClick={handleArea}>
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
    );
}

export default AddArea;

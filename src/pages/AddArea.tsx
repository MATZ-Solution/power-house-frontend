import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
// const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { AddAreaCSVfile, AddAreas, getAllAreas, getCity } from '../Fetcher/Api';
import ModalInfo from '../components/ModaLInfo';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { alertFail, alertSuccess, alertInfo } from './Components/Alert';
import { DataTable } from 'mantine-datatable';

function AddArea() {
    // ################ VARIABLES ################
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

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
    const [search, setSearch] = useState('');
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>([]);
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
    const {
        isLoading: getAreaIsLoading,
        isError: getAreaIsError,
        error: getAreaError,
        data: getAreaData= [],
    } = useQuery({
        queryKey: ['getArea'],
        queryFn: getAllAreas,
        refetchOnWindowFocus: false,
        retry: 1,
    });
    // console.log(getAreaData,"getArea")
    useEffect(() => {
        if (getAreaData.length > 0) {
            setInitialRecords(getAreaData);
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            setRecordsData([...getAreaData.slice(from, to)]);
        }
    }, [page, pageSize, getAreaData]);
    useEffect(() => {
        if (search) {
            const filteredData = initialRecords.filter((item: any) =>
                item.AreaName.toLowerCase().includes(search.toLowerCase()) ||
                item.cityName.toLowerCase().includes(search.toLowerCase())
            );
            setRecordsData(filteredData.slice(0, pageSize));
        } else {
            setRecordsData(initialRecords.slice(0, pageSize));
        }
    }, [search, initialRecords, pageSize]);

    // console.log(getAreaData,"getAreaData")

    return (
        <>
            {/* {mutation.isSuccess && <ModalInfo message="Successfully added Area" success={mutation.isSuccess} />}
            {mutation.isError && <ModalInfo message={mutation.error.message} success={mutation.isSuccess} />} */}
            {/* {mutationAreaCSVfile.isSuccess && <ModalInfo message="Successfully add CSV file " success={mutationAreaCSVfile.isSuccess} />}
            {mutationAreaCSVfile.isError && <ModalInfo message={mutationAreaCSVfile.error?.message} success={mutationAreaCSVfile.isSuccess} />} */}
            {/* {wrongFile && <ModalInfo message={csvFileMessage} success={false} />} */}
            {wrongFile && alertInfo(csvFileMessage)}

            <ul className="flex space-x-2 rtl:space-x-reverse">
                <div className="border-l-[5px] border-[#F59927] px-3 ">
                    <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Add Areas</p>
                </div>
                {/* <li>
                    <Link to="#" className="text-primary hover:underline">
                        SetUp Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Area</span>
                </li> */}
            </ul>
            <div className={`mt-5 p-5 ${isDark ? 'bg-[#0e1726]' : 'bg-white'} rounded-[20px]`}>
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
                <div className="space-y-6">
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <input
                                    type="text"
                                    className="form-input w-auto"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="datatables">
                                <DataTable
                                    striped
                                    className="whitespace-nowrap table-striped"
                                    records={recordsData}
                                    columns={[
                                        { accessor: 'cityName', title: 'City' },
                                        { accessor: 'AreaName', title: 'Area' },
                                    ]}
                                    totalRecords={getAreaData.length}
                                    recordsPerPage={pageSize}
                                    page={page}
                                    onPageChange={setPage}
                                    recordsPerPageOptions={PAGE_SIZES}
                                    onRecordsPerPageChange={setPageSize}
                                    minHeight={200}
                                    paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                                />
                            </div>
                        </div>
                    </div>
            </div>
        </>
    );
}

export default AddArea;

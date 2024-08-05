import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddCity, AddCityCSVfile, getCity } from '../Fetcher/Api';
import ModalInfo from '../components/ModaLInfo';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { alertFail, alertSuccess, alertInfo } from './Components/Alert';
import { DataTable } from 'mantine-datatable';

function SetupCities(): JSX.Element {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const [city, setCity] = useState('');
    const [cityMessage, setCityMessage] = useState('');
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>([]);
    const [wrongFile, setWrongFile] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        
        mutationKey: ['AddCity'],
        mutationFn: AddCity,
        onSuccess: () => {
           
queryClient.invalidateQueries({queryKey: ['getCities']});
            setCity('');
            mutation.reset(); 
            alertSuccess("Successfully add City");
        },
        onError: (err: any) => {
            mutation.reset();
            alertFail(err.message);
        },
    });

    const onSubmitCity = (e: any) => {
        e.preventDefault();
        if (!city) {
            return setCityMessage('Please Add city first');
        }
        setCityMessage('');
        mutation.mutate(city);
    };

    const mutationCityCSVfile = useMutation({
        mutationKey: ['AddCityCSVfile'],
        mutationFn: AddCityCSVfile,
        onSuccess: () => {
           
queryClient.invalidateQueries({queryKey: ['getCities']});
            setCity('');
            mutationCityCSVfile.reset();
            alertSuccess("Successfully add CSV file");
        },
        onError: (err: any) => {
            mutationCityCSVfile.reset();
            alertFail(err.message);
        },
    });

    const onSubmitCityCSVfile = (e: any) => {
        const file = e.target.files[0];
        const form = new FormData();
        form.append('file', file);
        if (!file?.name?.toLowerCase().endsWith('.csv')) {
            fileInputRef.current!.value = '';
            return setWrongFile(true);
        }
        mutationCityCSVfile.mutate(form);
        fileInputRef.current!.value = '';
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            mutationCityCSVfile.reset();
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [mutationCityCSVfile.isSuccess, mutationCityCSVfile.isError]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setWrongFile(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [wrongFile]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    const {
        isError,
        data: cityData = [],
        isLoading: cityLoading,
    } = useQuery({
        queryKey: ['getCity'],
        queryFn: getCity,
        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    useEffect(() => {
        if (cityData.length > 0) {
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            setInitialRecords(cityData);
            setRecordsData([...cityData.slice(from, to)]);
        }
    }, [page, pageSize, cityData]);

    useEffect(() => {
        if (search) {
            const filteredData = cityData.filter((item: any) => item.cityName.toLowerCase().includes(search.toLowerCase()));
            setInitialRecords(filteredData);
        } else {
            setInitialRecords(cityData);
        }
    }, [search, cityData]);

    return (
        <>
            {wrongFile && alertInfo('Please Add CSV File')}
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <div className="border-l-[5px] border-[#F59927] px-3">
                        <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Add Cities</p>
                    </div>
                </ul>
                <div className={`mt-5 p-5 ${isDark ? 'bg-[#0e1726]' : 'bg-white'} rounded-[20px]`}>
                    <div className="flex flex-col gap-2">
                        <div className="w-full flex gap-2">
                            <div className="w-full">
                                <input
                                    value={city}
                                    type="text"
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Add Cities"
                                    className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                />
                                {cityMessage && <p className="mt-4 text-red-800">Please Select City</p>}
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary rounded-full px-10 py-3" onClick={onSubmitCity}>
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
                                    ]}
                                    totalRecords={cityData.length}
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
            </div>
        </>
    );
}

export default SetupCities;

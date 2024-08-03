import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddBuilder, AddBuilderCSVfile, GetAllBuilder } from '../Fetcher/Api';
import ModalInfo from '../components/ModaLInfo';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { alertFail, alertSuccess, alertInfo } from './Components/Alert';
import { DataTable } from 'mantine-datatable';

function SetupBuilder(): any {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    let [builderName, setBuilderName] = useState('');
    let [builderPhoneNumber, setBuilderPhoneNumber] = useState('');
    let [builderMessage, setBuilderMessage] = useState('');
    let queryClient: any = useQueryClient();
    let [wrongFile, setWrongFile] = useState(false);
    const fileInputRef = useRef<any>(null);
    const [search, setSearch] = useState('');
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>([]);
    const mutation = useMutation({
        mutationKey: ['AddBuilder'],
        mutationFn: AddBuilder,
        onSuccess: () => {
            queryClient.invalidateQueries(['getBuilder']);
            setBuilderName('');
            setBuilderPhoneNumber('');
            mutation.reset(); 
            alertSuccess("Successfully added Builder");
        },
        onError: (err) => {
            mutation.reset();
            alertFail(err.message);
        },
    });
    
    const onSubmitBuilder = (e: any) => {
        if (!builderName || !builderPhoneNumber ) {
            return setBuilderMessage('Please add all required fields');
        }
        setBuilderMessage('');
        mutation.mutate({ builderName, builderPhoneNumber });
    };

    const mutationBuilderCSVfile = useMutation({
        mutationKey: ['AddBuilderCSVfile'],
        mutationFn: AddBuilderCSVfile,
        onSuccess: () => {
            queryClient.invalidateQueries(['getBuilder']);
            setBuilderName('');
            setBuilderPhoneNumber('');
            mutationBuilderCSVfile.reset();
            alertSuccess("Successfully added CSV file");
        },
        onError: (err) => {
            mutationBuilderCSVfile.reset();
            alertFail(err.message);
        },
    });

    const onSubmitBuilderCSVfile = (e: any) => {
        let file = e.target.files[0];
        let form = new FormData();
        form.append('file', file);
        if (!file?.name?.toLowerCase().endsWith('.csv')) {
            fileInputRef.current.value = null;
            return setWrongFile(true);
        }
        mutationBuilderCSVfile.mutate(form);
        fileInputRef.current.value = null;
    };

    useEffect(() => {
        setTimeout(() => {
            mutationBuilderCSVfile.reset();
        }, 3000);
    }, [mutationBuilderCSVfile.isSuccess, mutationBuilderCSVfile.isError]);

    useEffect(() => {
        setTimeout(() => {
            setWrongFile(false);
        }, 3000);
    }, [wrongFile]);
    const {
        isLoading: getBuilderIsLoading,
        isError: getBuilderIsError,
        error: getBuilderError,
        data: getBuilderData= [],
    } = useQuery({
        queryKey: ['getBuilder'],
        queryFn: GetAllBuilder,
        refetchOnWindowFocus: false,
        retry: 1,
    });
    useEffect(() => {
        if (getBuilderData.length > 0) {
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            setInitialRecords(getBuilderData);
            setRecordsData([...getBuilderData.slice(from, to)]);
        }
    }, [page, pageSize, getBuilderData]);
    useEffect(() => {
        if (search) {
            const filteredData = getBuilderData.filter((item: any) => item.builderName.toLowerCase().includes(search.toLowerCase()));
            setInitialRecords(filteredData);
        } else {
            setInitialRecords(getBuilderData);
        }
    }, [search, getBuilderData]);

    console.log(getBuilderData,"getBuilderData")

    return (
        <>
            {wrongFile && alertInfo('Please add a CSV file')}
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <div className="border-l-[5px] border-[#F59927] px-3">
                        <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Add Builder</p>
                    </div>
                </ul>
                <div className={`mt-5 p-5 ${isDark ? 'bg-[#0e1726]' : 'bg-white'} rounded-[20px]`}>
                    <div className="flex flex-col gap-2">
                        <div className="w-full flex gap-2">
                            <div className="w-full">
                                <input
                                    value={builderName}
                                    type="text"
                                    onChange={(e) => setBuilderName(e.target.value)}
                                    placeholder="Enter Builder Name"
                                    className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                />
                                {builderMessage && <p className="mt-4 text-red-800">Please Enter Builder Name</p>}
                            </div>
                            <div className="w-full">
                                <input
                                    value={builderPhoneNumber}
                                    type="text"
                                    onChange={(e) => setBuilderPhoneNumber(e.target.value)}
                                    placeholder="Enter Architecture Phone Number"
                                    className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                />
                                {builderMessage && <p className="mt-4 text-red-800">Please Enter Builder Phone Number</p>}
                            </div>
                          
                            <div className="">
                                <button type="button" className="btn btn-primary rounded-full px-10 py-3" onClick={onSubmitBuilder}>
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-3">
                            <h1 className="font-bold text-medium">Add A CSV File</h1>
                            <div>
                                <input ref={fileInputRef} type="file" onChange={onSubmitBuilderCSVfile} />
                            </div>
                        </div>
                        <div className="w-auto">
                            <a href="/builder.csv" className="inline-block" download>
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
                                        { accessor: 'builderName', title: 'Builder Name' },
                                        { accessor: 'builderNumber', title: 'Builder Number' },
                                    ]}
                                    totalRecords={getBuilderData.length}
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
            </div>
        </>
    );
}

export default SetupBuilder;

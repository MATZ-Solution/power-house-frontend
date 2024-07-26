import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddArchitecture, AddArchitectureCSVfile } from '../Fetcher/Api';
import ModalInfo from '../components/ModaLInfo';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { alertFail, alertSuccess, alertInfo } from './Components/Alert';

function SetupArchitecture(): any {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    let [architectureName, setArchitectureName] = useState('');
    let [architecturePhoneNumber, setArchitecturePhoneNumber] = useState('');
    let [architectureMessage, setArchitectureMessage] = useState('');
    let queryClient: any = useQueryClient();
    let [wrongFile, setWrongFile] = useState(false);
    const fileInputRef = useRef<any>(null);

    const mutation = useMutation({
        mutationKey: ['AddArchitecture'],
        mutationFn: AddArchitecture,
        onSuccess: () => {
            queryClient.invalidateQueries(['getArchitecture']);
            setArchitectureName('');
            setArchitecturePhoneNumber('');
            mutation.reset(); 
            alertSuccess("Successfully added Architecture");
        },
        onError: (err) => {
            mutation.reset();
            alertFail(err.message);
        },
    });

    const onSubmitArchitecture = (e: any) => {
        if (!architectureName || !architecturePhoneNumber ) {
            return setArchitectureMessage('Please add all required fields');
        }
        setArchitectureMessage('');
        mutation.mutate({ architectureName, architecturePhoneNumber });
    };

    const mutationArchitectureCSVfile = useMutation({
        mutationKey: ['AddArchitectureCSVfile'],
        mutationFn: AddArchitectureCSVfile,
        onSuccess: () => {
            queryClient.invalidateQueries(['getArchitecture']);
            setArchitectureName('');
            setArchitecturePhoneNumber('');
            mutationArchitectureCSVfile.reset();
            alertSuccess("Successfully added CSV file");
        },
        onError: (err) => {
            mutationArchitectureCSVfile.reset();
            alertFail(err.message);
        },
    });

    const onSubmitArchitectureCSVfile = (e: any) => {
        let file = e.target.files[0];
        let form = new FormData();
        form.append('file', file);
        if (!file?.name?.toLowerCase().endsWith('.csv')) {
            fileInputRef.current.value = null;
            return setWrongFile(true);
        }
        mutationArchitectureCSVfile.mutate(form);
        fileInputRef.current.value = null;
    };

    useEffect(() => {
        setTimeout(() => {
            mutationArchitectureCSVfile.reset();
        }, 3000);
    }, [mutationArchitectureCSVfile.isSuccess, mutationArchitectureCSVfile.isError]);

    useEffect(() => {
        setTimeout(() => {
            setWrongFile(false);
        }, 3000);
    }, [wrongFile]);

    return (
        <>
            {wrongFile && alertInfo('Please add a CSV file')}
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <div className="border-l-[5px] border-[#F59927] px-3">
                        <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Add Architecture</p>
                    </div>
                </ul>
                <div className={`mt-5 p-5 ${isDark ? 'bg-[#0e1726]' : 'bg-white'} rounded-[20px]`}>
                    <div className="flex flex-col gap-2">
                        <div className="w-full flex gap-2">
                            <div className="w-full">
                                <input
                                    value={architectureName}
                                    type="text"
                                    onChange={(e) => setArchitectureName(e.target.value)}
                                    placeholder="Enter Architecture Name"
                                    className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                />
                                {architectureMessage && <p className="mt-4 text-red-800">Please Enter Architecture Name</p>}
                            </div>
                            <div className="w-full">
                                <input
                                    value={architecturePhoneNumber}
                                    type="text"
                                    onChange={(e) => setArchitecturePhoneNumber(e.target.value)}
                                    placeholder="Enter Architecture Phone Number"
                                    className="w-full form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                />
                                {architectureMessage && <p className="mt-4 text-red-800">Please Enter Architecture Phone Number</p>}
                            </div>
                          
                            <div className="">
                                <button type="button" className="btn btn-primary rounded-full px-10 py-3" onClick={onSubmitArchitecture}>
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-3">
                            <h1 className="font-bold text-medium">Add A CSV File</h1>
                            <div>
                                <input ref={fileInputRef} type="file" onChange={onSubmitArchitectureCSVfile} />
                            </div>
                        </div>
                        <div className="w-auto">
                            <a href="/architecture.csv" className="inline-block" download>
                                <button type="button" className="mt-4 btn btn-primary rounded-full h-11">
                                    Download Sample CSV File
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SetupArchitecture;

import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getScoutMember, ManuallyAddScoutMember } from '../../Fetcher/Api';
import Select from 'react-select';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { alertSuccess } from './Alert';
import { alertFail } from './Alert';

function ModalAddScout({ open, handleOpen, projectID }: any): any {
    let [user, setUser] = useState('');
    let queryClient = useQueryClient();

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: '#F59927',
                color: 'white',
            },
        }),

        control: (provided: any, state: any) => ({
            ...provided,
            minHeight: '45px',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
    };

    interface Option {
        value: string;
        label: string;
    }

    const {
        isLoading: scoutMemberIsLoading,
        isError: scoutMemberIsError,
        error: scoutMemberError,
        data: scoutMemberData,
    } = useQuery({
        queryKey: ['scoutMember'],
        queryFn: getScoutMember,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const mutation = useMutation({
        mutationKey: ['manuallyAddScoutMember'],
        mutationFn: ManuallyAddScoutMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getLocations'] });
            handleOpen(false);
        },
    });

    const scoutMemberOptions: Option[] = scoutMemberData?.map((data: any) => ({ value: data?.id, label: data?.name })) || [];

    function handleChangeUser(selected: any) {
        setUser(selected ? selected.map((data: any) => data.value) : []);
    }

    const add = () => {
        mutation.mutate({ projectID: projectID, scoutID: user },{
            onSuccess: ()=>{
                alertSuccess("Successfully Add Scouter")
            }
        });
    };
    return (
        <div className="mb-5">
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" open={open} onClose={() => handleOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0  rounded-3xl  w-full max-w-lg my-8 text-black dark:text-white-dark h-auto ">
                                    <div className="bg-gray-200  rounded-t-3xl flex justify-between px-6 py-3 text-black ">
                                        <h1 className="font-extrabold">Add Scouter</h1>
                                        <CloseOutlinedIcon
                                            className="cursor-pointer"
                                            // onClose={()=>handleOpen(false)}
                                            onClick={() => handleOpen(false)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 px-6 mt-3">
                                        <h1 className="font-semibold">Scout Members</h1>
                                        <Select
                                            name="userIds"
                                            placeholder="Select an option"
                                            options={scoutMemberOptions}
                                            // value={scoutMemberOptions?.map((option: any) => user.map((data : object)=> data === option.value))}
                                            isMulti
                                            isSearchable={false}
                                            styles={customStyles}
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: 'transparent',
                                                    primary: '#F59927',
                                                },
                                            })}
                                            onChange={handleChangeUser}
                                            components={{
                                                NoOptionsMessage: () => (
                                                    <div style={{ padding: 10 }}>{scoutMemberIsLoading ? <p>Loading...</p> : scoutMemberError ? <p>{scoutMemberError?.message}</p> : ''}</div>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-end items-center px-4 py-3 mt-8">
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleOpen(false)}>
                                            Cancel
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={add}>
                                            Add
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        // <div
        //     className="flex items-center justify-center  bg-gray-900  bg-opacity-50 w-full h-[100vh] px-6 sm:px-0"

        // >
        //     <div className="bg-white w-[35rem] rounded-3xl">
        //         <div className="bg-[#F8F8F8] px-6 py-3 rounded-t-3xl flex justify-between">
        //             <h1 className="font-semibold">Add Scouter</h1>
        //             <CloseOutlinedIcon className="cursor-pointer" onClick={() => handleOpen(false)} />
        //         </div>
        //         <div className="flex flex-col gap-3 px-6 mt-3">
        //             <h1 className="font-semibold">Scout Members</h1>
        //             <Select
        //                 name="userIds"
        //                 placeholder="Select an option"
        //                 options={scoutMemberOptions}
        //                 // value={scoutMemberOptions?.map((option: any) => user.map((data : object)=> data === option.value))}
        //                 isMulti
        //                 isSearchable={false}
        //                 styles={customStyles}
        //                 theme={(theme) => ({
        //                     ...theme,
        //                     colors: {
        //                         ...theme.colors,
        //                         primary25: 'transparent',
        //                         primary: '#F59927',
        //                     },
        //                 })}
        //                 onChange={handleChangeUser}
        //                 components={{
        //                     NoOptionsMessage: () => <div style={{ padding: 10 }}>{scoutMemberIsLoading ? <p>Loading...</p> : scoutMemberError ? <p>{scoutMemberError?.message}</p> : ''}</div>,
        //                 }}
        //             />
        //         </div>

        //         <div className="flex gap-2 justify-end p-4 mt-6">
        //             <button className="text-black font-semibold border[#D9D9D9] border-[1px] rounded-full pl-6 pr-6 pt-2 pb-2 " onClick={() => handleOpen(false)}>
        //                 Cancel
        //             </button>
        //             <button className=" bg-[#F59927] rounded-full pl-6 pr-6 pt-2 pb-2 text-white" onClick={add}>
        //                 Add
        //             </button>
        //         </div>
        //     </div>
        // </div>
    );
}

export default ModalAddScout;

import React, { useState, useEffect } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SomeThingWentWrong from '../Pages/SomethingWentWrong';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getScoutMember, getSingleSop, ManuallyAddScoutMember, updateScoutMember, updateSop } from '../../Fetcher/Api';
import Select from 'react-select';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { alertFail, alertSuccess } from './Alert';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { getSingleScoutMember } from '../../Fetcher/Api';
import ScreenLoader from '../Elements/ScreenLoader';
import { log } from 'console';


function EditSopModal({ open, handleOpen, sopId }: any): any {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    let [userData, setUserData] = useState<any>(null);
    let queryClient = useQueryClient();

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isSelected ? (isDark ? 'white' : 'black') : (isDark ? 'white' : 'black'),
            backgroundColor: state.isSelected ? '' : (isDark ? '#121E32' : 'white'),
            cursor: 'pointer',
            ':hover': {
                backgroundColor: '#F59927',
                color: 'white',
            },
        }),
        control: (provided: any, state: any) => ({
            ...provided,
            minHeight: '45px',
            width: '470px',
            backgroundColor: isDark ? '#121E32' : 'white',
            borderColor: isDark ? '#17263c' : '#e0e6ed',
            boxShadow: 'none',
            ':hover': {
                borderColor: '#F59927',
            },
        }),
        indicatorSeparator: () => ({ display: 'none' }),
        singleValue: (provided: any) => ({
            ...provided,
            color: isDark ? 'white' : 'black',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: isDark ? 'white' : 'black',
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: isDark ? '#121E32' : 'white',
        }),
    };

    const {
        isLoading: getSopIsLoading,
        isError: getSopIsError,
        error: getSopError,
        data: getSopData,
    } = useQuery({
        queryKey: ['getSingleSop', [sopId]],
        queryFn: () => getSingleSop(sopId),
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: !!sopId,
    });

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
        mutationKey: ['updateSopMember'],
        mutationFn: updateSop,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAllSop'] });
            
            queryClient.invalidateQueries({ queryKey: ['getSingleSop'] });
            handleOpen(false);
        },
    });

    const scoutMemberOptions = scoutMemberData?.map((data: any) => ({ value: data.id, label: data.name })) || [];

    if (getSopIsError) {
        if (getSopError?.message === 'Failed to fetch') {
            return <SomeThingWentWrong message="Server Cannot Respond" />;
        }
        return <SomeThingWentWrong message="Internal Server Error" />;
    }

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
                            <Dialog.Panel as="div" className="panel border-0 p-0 rounded-3xl w-full max-w-lg my-8 text-black dark:text-white-dark h-auto">
                                {getSopIsLoading ? (
                                    <div className="bg-[#fffdfd] flex items-center justify-center rounded-lg px-28 py-8">
                                        <p className="font-semibold text-[#F59927] ">Loading...</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="bg-gray-200 rounded-t-3xl flex justify-between px-6 py-3 text-black">
                                            <h1 className="font-extrabold">Edit SOP</h1>
                                            <CloseOutlinedIcon
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    handleOpen(false);
                                                    setUserData(null);
                                                }}
                                            />
                                        </div>
                                        <div className={`mt-3 px-5 rounded-[20px] ${isDark ? 'bg-[#0e1726]' : 'bg-white'}`}>
                                            <Formik
                                                initialValues={{
                                                    projectType: getSopData?.projectType || '',
                                                    projectDomain: getSopData?.projectDomain || '',
                                                    city: getSopData?.city || '',
                                                    area: getSopData?.area || '',
                                                    scoutMemberNames: getSopData?.scoutMemberID ? getSopData.scoutMemberID.split(',').map(Number) : [],
                                                }}

                                                onSubmit={(values, { resetForm }) => {
                                                    mutation.mutate({...values, sopId:sopId}
                                                        , {
                                                        onSuccess: () => {
                                                            resetForm();
                                                                mutation.reset();
                                                                alertSuccess('User Updated Successfully')
                                                        },
                                                        onError: () => {
                                                                mutation.reset();
                                                                alertFail('Failed to update User')
                                                        },
                                                    }
                                                );
                                                }}
                                            >
                                                
                                                {({ errors, touched, values, setFieldValue }) => (
                                                    <Form className="space-y-4">
                                                        <label className="text-[#F59927] text-lg font-extrabold">Details:</label>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <label htmlFor="gridprojectDomain">Project Domain*</label>
                                                                <Field name="projectDomain" id="gridprojectDomain" type="text" placeholder="Enter Project Domain" className="form-input" disabled />
                                                                {errors.projectDomain && touched.projectDomain ? <div className="text-red-600 mt-2">{errors.projectDomain as string}</div> : null}
                                                            </div>
                                                            <div>
                                                                <label htmlFor="gridprojectType">Project Type*</label>
                                                                <Field name="projectType" id="gridprojectType" type="text" placeholder="Enter Project Type" className="form-input" disabled />
                                                                {errors.projectType && touched.projectType ? <div className="text-red-600 mt-2">{errors.projectType as string}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <label htmlFor="gridAddress1">City</label>
                                                                <Field name="city" id="gridAddress1" type="text" placeholder="Enter City" className="form-input" disabled/>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="gridAddress1">Area</label>
                                                                <Field name="area" id="gridarea" type="text" placeholder="Enter Area" className="form-input" disabled />
                                                                {errors.area && touched.area ? <div className="text-red-600 mt-2">{errors.area as string}</div> : null}
                                                            </div>
                                                            <div>
                                                                <label htmlFor="gridName">Users</label>
                                                                <Select
                                                                    name="scoutMemberNames"
                                                                    placeholder="Select an option"
                                                                    options={scoutMemberOptions}
                                                                    value={scoutMemberOptions.filter((option:any) => values.scoutMemberNames.includes(option.value))}
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
                                                                    onChange={(selected) => {
                                                                        setFieldValue('scoutMemberNames', selected ? selected.map((data) => data.value) : []);
                                                                    }}
                                                                />
                                                                {errors.scoutMemberNames && touched.scoutMemberNames ? <div className="text-red-600 mt-2">{errors.scoutMemberNames as string}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end items-center px-4 py-3 mt-8">
                                                    <button
                                                        type="button"
                                                        className="btn btn btn-primary ltr:ml-4 rtl:mr-4"
                                                        onClick={() => {
                                                            handleOpen(false);
                                                            setUserData(null);
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" 
                                                    disabled = {mutation.isPending}
                                                    // onClick={add}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                )}
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

export default EditSopModal;

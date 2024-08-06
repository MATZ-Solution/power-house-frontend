import React, { useState, useEffect } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SomeThingWentWrong from '../Pages/SomethingWentWrong';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getScoutMember, ManuallyAddScoutMember, updateScoutMember } from '../../Fetcher/Api';
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


function EditModalUser({ open, handleOpen, userID }: any): any {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    let [userData, setUserData] = useState<any>(null);
    let queryClient = useQueryClient();

    let userRoleOption = [
        { value: 'scout', label: 'scout' },
        { value: 'manager', label: 'manager' },
        { value: 'sales person', label: 'sales person' },
        { value: 'admin', label: 'admin' },
    ];

    const {
        isLoading: getUserIsLoading,
        isError: getUserIsError,
        error: getUserError,
        data: getUserData,
    } = useQuery({
        queryKey: ['getSingleScoutUser', [userID]],
        queryFn: () => getSingleScoutMember(userID),
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: !userID ? false : true,
    });

    const customStyles1 = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isSelected ? (isDark ? 'white' : 'black') : isDark ? 'white' : 'black', // Set text color based on selection and theme
            backgroundColor: state.isSelected ? '' : isDark ? '#121E32' : 'white', // Background color for options based on theme
            cursor: 'pointer',
            ':hover': {
                backgroundColor: '#F59927', // Background color on hover
                color: 'white', // Text color on hover
            },
        }),

        control: (provided: any, state: any) => ({
            ...provided,
            minHeight: '45px',
            backgroundColor: isDark ? '#121E32' : 'white', // Set background color of the select box
            borderColor: isDark ? '#17263c' : '#e0e6ed', // Border color to match the background
            boxShadow: 'none',
            ':hover': {
                borderColor: '#F59927', // Border color on hover
            },
        }),

        indicatorSeparator: () => ({ display: 'none' }),

        singleValue: (provided: any) => ({
            ...provided,
            color: isDark ? 'white' : 'black', // Text color of the selected value based on theme
        }),

        placeholder: (provided: any) => ({
            ...provided,
            color: isDark ? 'white' : 'black', // Text color of the placeholder based on theme
        }),

        menu: (provided: any) => ({
            ...provided,
            backgroundColor: isDark ? '#121E32' : 'white', // Set background color of the dropdown menu
        }),
    };

    const AddScoutUserSchema = Yup.object().shape({
        Name: Yup.string(),
        // .required('Please Enter Name'),
        email: Yup.string().email('Invalid email').required('Please Enter Email'),
        password: Yup.string()
            // .min(8, 'Password is too short - should be 8 chars minimum.')
            // .required('Please enter a password.')
            .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
                'Password must contain at least one uppercase letter, one number, and one special character.'
            ),
        phoneNumber: Yup.string()
            .matches(/^\d+$/, 'Phone number must be a number')
            .max(11, 'Phone Number lenght should be 11')
            .min(11, 'Phone Number lenght should be 11')
            .required('Please Enter Phone Number'),
        address: Yup.string(),
        // .required('Please Enter Address'),
        position: Yup.string().required('Please Enter User Roles'),
    });

    const mutation = useMutation({
        mutationKey: ['updateScoutMember'],
        mutationFn: updateScoutMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUserData'] });
            queryClient.invalidateQueries({ queryKey: ['getSingleScoutUser'] });
            handleOpen(false);
        },
    });

    if (getUserIsError) {
        if (getUserError?.message === 'Failed to fetch') {
            return <SomeThingWentWrong message="Server Cannot Respond"  />;
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
                                <Dialog.Panel as="div" className="panel border-0 p-0  rounded-3xl  w-full max-w-lg my-8 text-black dark:text-white-dark h-auto ">
                                    {getUserIsLoading ? (
                                        <div className="bg-[#fffdfd] flex items-center justify-center rounded-lg px-28 py-8">
                                            <p className="font-semibold text-[#F59927] ">Loading...</p>
                                        </div>
                                    ) : (
                                            <div>
                                                <div className="bg-gray-200  rounded-t-3xl flex justify-between px-6 py-3 text-black ">
                                                    <h1 className="font-extrabold">Edit User</h1>
                                                    <CloseOutlinedIcon
                                                        className="cursor-pointer"
                                                        // onClose={()=>handleOpen(false)}
                                                        onClick={() => {
                                                            handleOpen(false);
                                                            setUserData(null);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`mt-3 px-5 rounded-[20px] ${isDark ? 'bg-[#0e1726]' : 'bg-white'}`}>
                                                    <Formik
                                                        initialValues={{
                                                            Name: getUserData?.name || '',
                                                            email: getUserData?.email || '',
                                                            password: '',
                                                            phoneNumber: getUserData?.phoneNumber || '',
                                                            address: getUserData?.address || '',
                                                            position: getUserData?.position
                                                        }}
                                                        validationSchema={AddScoutUserSchema}
                                                        onSubmit={(values, { resetForm }) => {
                                                            mutation.mutate({...values, userID:userID}
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
                                                                <label className="text-[#F59927] text-lg font-extrabold">Credentials:</label>

                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                    <div>
                                                                        <label htmlFor="gridEmail">Email*</label>
                                                                        <Field name="email" id="gridEmail" type="email" placeholder="Enter Email" className="form-input" />

                                                                        {errors.email && touched.email ? <div className="text-red-600 mt-2">{errors.email as string}</div> : null}
                                                                    </div>
                                                                    {/* <div>
                                                                        <label htmlFor="gridPassword">Password*</label>
                                                                        <div className="relative justify-center ">
                                                                            <Field name="password" type="text" placeholder="Enter Password" className="form-input" />
                                                                        </div>
                                                                        {errors.password && touched.password ? <div className="text-red-600 mt-2">{errors.password}</div> : null}
                                                                    </div> */}
                                                                </div>

                                                                <label className="text-[#F59927] text-lg font-extrabold">Details:</label>

                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                    <div>
                                                                        <label htmlFor="gridName">Name</label>
                                                                        <Field name="Name" id="gridName" type="text" placeholder="Enter Name" className="form-input" />
                                                                        {errors.Name && touched.Name ? <div className="text-red-600 mt-2">{errors.Name as string}</div> : null}
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="gridPhoneNumber">Phone Number*</label>
                                                                        <Field name="phoneNumber" id="gridPhoneNumber" type="text" placeholder="Enter Phone Number" className="form-input" />
                                                                        {errors.phoneNumber && touched.phoneNumber ? <div className="text-red-600 mt-2">{errors.phoneNumber as string}</div> : null}
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                    <div>
                                                                        <label htmlFor="gridAddress1">Address</label>
                                                                        <Field name="address" id="gridAddress1" type="text" placeholder="Enter Address" className="form-input" />
                                                                        {errors.address && touched.address ? <div className="text-red-600 mt-2">{errors.address as string}</div> : null}
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="gridPosition">User Role*</label>

                                                                        <Select
                                                                            className="border-none"
                                                                            name="position"
                                                                            placeholder="Select User Roles"
                                                                            options={userRoleOption}
                                                                            value= {userRoleOption.find((option) => option.value === values.position)}
                                                                            isSearchable={false}
                                                                            styles={customStyles1}
                                                                            theme={(theme) => ({
                                                                                ...theme,
                                                                                colors: {
                                                                                    ...theme.colors,
                                                                                    primary25: 'transparent',
                                                                                    primary: '#F59927',
                                                                                },
                                                                            })}
                                                                            onChange={(selected: any) => {
                                                                                setFieldValue('position', selected.value);
                                                                            }}
                                                                        />
                                                                        {errors.position && touched.position ? <div className="text-red-600 mt-2">{errors.position as string}</div> : null}
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

export default EditModalUser;

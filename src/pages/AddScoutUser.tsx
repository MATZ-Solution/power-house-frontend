import { Field, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import ModalInfo from '../components/ModaLInfo';
import { setPageTitle } from '../store/themeConfigSlice';
import SomeThingWentWrong from './Pages/SomethingWentWrong';
import { useMutation } from '@tanstack/react-query';
import { AddScoutMember } from '../Fetcher/Api';
import Select from 'react-select';

function AddScoutUser() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Add Scout User'));
    });

    let userRoleOption = [
        { value: 'scout', label: 'scout' },
        { value: 'manager', label: 'manager' },
        { value: 'sales person', label: 'sales person' },
        { value: 'admin', label: 'admin' },
    ];

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

    let [success, setSuccess] = useState(false);
    const [errorHandle, setErrorHandle] = useState({
        message: '',
        serverError: false,
        flag: false,
    });
    const AddScoutUserSchema = Yup.object().shape({
        Name: Yup.string(),
        // .required('Please Enter Name'),
        email: Yup.string().email('Invalid email').required('Please Enter Email'),
        password: Yup.string().min(5, 'Too Short!').required('Please Enter Password'),
        phoneNumber: Yup.string()
            .matches(/^\d+$/, 'Phone number must be a number')
            .max(11, 'Phone Number lenght should be 11')
            .min(11, 'Phone Number lenght should be 11')
            .required('Please Enter Phone Number'),
        address: Yup.string(),
        // .required('Please Enter Address'),
        position: Yup.string()
        .required('Please Enter User Roles'),
    });

    const mutation = useMutation({
        mutationKey: ['addScoutMember'],
        mutationFn: AddScoutMember,
    });

    return (
        <div>
            {mutation.isSuccess && <ModalInfo message="Successfully added Scout Member" success={mutation.isSuccess} />}
            {mutation.isError && <ModalInfo message={mutation?.error?.message} success={mutation.isSuccess} />}
            <>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link to="#" className="text-primary hover:underline">
                            Dashboard
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Create User</span>
                    </li>
                </ul>
                <div className="pt-5">
                    <Formik
                        initialValues={{
                            Name: '',
                            email: '',
                            password: '',
                            phoneNumber: '',
                            address: '',
                            position: '',
                        }}
                        validationSchema={AddScoutUserSchema}
                        onSubmit={(values, { resetForm }) => {
                            mutation.mutate(values, {
                                onSuccess: () => {
                                    resetForm();
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
                        }}
                    >
                        {({ errors, touched, values, setFieldValue }) => (
                            <Form className="space-y-5">
                                <label className='text-[#F59927] text-lg font-extrabold'>Credentials:</label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="gridEmail">Email*</label>
                                        <Field name="email" id="gridEmail" type="email" placeholder="Enter Email" className="form-input" />
                                        {errors.email && touched.email ? <div className="text-red-600 mt-2">{errors.email}</div> : null}
                                    </div>
                                    <div>
                                        <label htmlFor="gridPassword">Password*</label>
                                        <div className="relative justify-center ">
                                            <Field name="password" type="text" placeholder="Enter Password" className="form-input" />
                                        </div>
                                        {errors.password && touched.password ? <div className="text-red-600 mt-2">{errors.password}</div> : null}
                                    </div>
                                </div>

                                <label className='text-[#F59927] text-lg font-extrabold'>Details:</label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="gridName">Name</label>
                                        <Field name="Name" id="gridName" type="text" placeholder="Enter Name" className="form-input" />
                                        {errors.Name && touched.Name ? <div className="text-red-600 mt-2">{errors.Name}</div> : null}
                                    </div>
                                    <div>
                                        <label htmlFor="gridPhoneNumber">Phone Number</label>
                                        <Field name="phoneNumber" id="gridPhoneNumber" type="text" placeholder="Enter Phone Number" className="form-input" />
                                        {errors.phoneNumber && touched.phoneNumber ? <div className="text-red-600 mt-2">{errors.phoneNumber}</div> : null}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div>
                                    <label htmlFor="gridAddress1">Address</label>
                                    <Field name="address" id="gridAddress1" type="text" placeholder="Enter Address" className="form-input" />
                                    {errors.address && touched.address ? <div className="text-red-600 mt-2">{errors.address}</div> : null}
                                </div>
                                <div>
                                    <label htmlFor="gridPosition">User Role*</label>

                                    <Select
                                        className="border-none"
                                        name="position"
                                        placeholder="Select User Roles"
                                        options={userRoleOption}
                                        value={userRoleOption.filter((option) => option.value === values.position)}
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
                                        onChange={(selected: any) => {
                                            setFieldValue('position', selected.value);
                                        }}
                                    />
                                    {errors.position && touched.position ? <div className="text-red-600 mt-2">{errors.position}</div> : null}
                                </div>

                                </div>


                                {/* <div>
                                    <label htmlFor="gridPosition">Designation</label>
                                    <Field name="position" id="gridPosition" type="text" placeholder="Enter Designation" className="form-input" />
                                    {errors.position && touched.position ? <div className="text-red-600 mt-2">{errors.position}</div> : null}
                                </div> */}


                                {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                       <div className="md:col-span-2">
                                           <label htmlFor="gridCity">City</label>
                                           <input id="gridCity" type="text" placeholder="Enter City" className="form-input" />
                                       </div>
                                       <div>
                                           <label htmlFor="gridState">State</label>
                                           <select id="gridState" className="form-select text-white-dark">
                                               <option>Choose...</option>
                                               <option>...</option>
                                           </select>
                                       </div>
                                       <div>
                                           <label htmlFor="gridZip">Zip</label>
                                           <input id="gridZip" type="text" placeholder="Enter Zip" className="form-input" />
                                       </div>
                                   </div> */}
                                {/* <div>
                                       <label className="flex items-center mt-1 cursor-pointer">
                                           <input type="checkbox" className="form-checkbox" />
                                           <span className="text-white-dark">Check me out</span>
                                       </label>
                                   </div> */}
                                <button type="submit" className="btn btn-primary !mt-6">
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </>
        </div>
    );
}

export default AddScoutUser;

import { useMutation, useQuery } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import * as Yup from 'yup';
import { AddMeetingMember, getAreas, getCity, getSubAreas } from '../Fetcher/Api';
import ModalInfo from '../components/ModaLInfo';
import { setPageTitle } from '../store/themeConfigSlice';

function CreateMeetingMember() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Create Meeting Member'));
    });

    // let getCityIds: any;
    let [getCityIDs, setGetCityIds] = useState([]);
    let [getAreaIDs, setGetAreaIds] = useState([]);
    let [getSubAreaIDs, setGetSubAreaIDs] = useState([]);

    // GET CITY DATA
    let {
        isError: cityIsError,
        data: cityData,
        error: cityError,
    } = useQuery({
        queryKey: ['getCity'],
        queryFn: getCity,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    // GET AREA DATA
    let getCityIdString = getCityIDs.join('')
    let {
        isError: areaIsError,
        data: areaData,
        error: areaError,
    } = useQuery({
        queryKey: ['getAreas', getCityIdString],
        queryFn: () => getAreas(getCityIDs),
        refetchOnWindowFocus: false,
        retry: 1,
    });

    console.log('this is area data', areaData);

        // GET SUB AREA DATA
        let getsubAreasIdString = getAreaIDs.join('')
        let {
            isError: subAreaIsError,
            data: subAreaData,
            error: subAreaError,
        } = useQuery({
            queryKey: ['getSubAreas', getsubAreasIdString],
            queryFn: () => getSubAreas(getAreaIDs),
            refetchOnWindowFocus: false,
            retry: 1
        });
    
        console.log('this is sub Area Data data', subAreaData);


    const mutation = useMutation({
        mutationKey: ['addMeetingMember'],
        mutationFn: AddMeetingMember,
    });

    useEffect(() => {
        setTimeout(() => {
            mutation.reset();
        }, 3000);
    }, [mutation.isSuccess, mutation.isError]);

    interface Option {
        value: string;
        label: string;
      }

      interface FormValues {
        Name: string;
        email: string;
        phoneNumber: string;
        address: string;
        position: string;
        cityId: string[];
        areasId: string[];
        subareasId: string[];
      }

      const initialValues: FormValues = {
        Name: '',
        email: '',
        phoneNumber: '',
        address: '',
        position: '',
        cityId: [],
        areasId: [],
        subareasId: [],
      };

    const cityOptions: Option[] = cityData?.map((data: any) => ({ value: data?.id, label: data?.cityName})) || [];
    const areaOptions: Option[]  = areaData?.map((data: any) => ({ value: data?.id, label: data?.AreaName })) || [];
    const subAreaOptions: Option[] = subAreaData?.map((data: any) => ({ value: data?.id, label: data?.subAreaName })) || [];


    const CreateMeetingMemberSchema = Yup.object().shape({
        Name: Yup.string().required('Please Enter Name'),
        email: Yup.string().email('Invalid email').required('Please Enter Email'),
        phoneNumber: Yup.string()
            .matches(/^\d+$/, 'Phone number must be a number')
            .max(11, 'Phone Number lenght should be 11')
            .min(11, 'Phone Number lenght should be 11')
            .required('Please Enter Phone Number'),
        address: Yup.string().required('Please Enter Address'),
        position: Yup.string().required('Please Enter position'),
        cityId: Yup.array().of(Yup.string()).min(1, 'At least one city must be selected').required('Required'),
        areasId: Yup.array().of(Yup.string()).min(1, 'At least one area must be selected').required('Required'),
        subareasId: Yup.array().of(Yup.string()).min(1, 'At least one sub area must be selected').required('Required'),
    });

    return (
        <div>
            {mutation.isSuccess && <ModalInfo message="Successfully added Meeting Member" success={mutation.isSuccess} />}
            {mutation.isError && <ModalInfo message={mutation.error.message} success={mutation.isSuccess} />}
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create Meeting Member</span>
                </li>
            </ul>
            <div className="pt-5">
                <Formik
                   initialValues={initialValues}
                    validationSchema={CreateMeetingMemberSchema}
                    onSubmit={ (values, {resetForm}) => {
                        console.log("this is values", values)
                        mutation.mutate(values, {
                            onSuccess: () => {
                                resetForm();
                            }
                        });
                    }}
                >
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridName">Name</label>
                                    <Field name="Name" id="gridName" type="text" placeholder="Enter Name" className="form-input" />
                                    {errors.Name && touched.Name ? <div className="text-red-600 mt-2">{errors.Name}</div> : null}
                                </div>
                                <div>
                                    <label htmlFor="gridEmail">Email</label>
                                    <Field name="email" id="gridEmail" type="email" placeholder="Enter Email" className="form-input" />
                                    {errors.email && touched.email ? <div className="text-red-600 mt-2">{errors.email}</div> : null}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridPhoneNumber">Phone Number</label>
                                    <Field name="phoneNumber" id="gridPhoneNumber" type="text" placeholder="Enter Phone Number" className="form-input" />
                                    {errors.phoneNumber && touched.phoneNumber ? <div className="text-red-600 mt-2">{errors.phoneNumber}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="gridAddress1">Address</label>
                                    <Field name="address" id="gridAddress1" type="text" placeholder="Enter Address" className="form-input" />
                                    {errors.address && touched.address ? <div className="text-red-600 mt-2">{errors.address}</div> : null}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridPosition">Position</label>
                                    <Field name="position" id="gridPosition" type="text" placeholder="Enter Position" className="form-input" />
                                    {errors.position && touched.position ? <div className="text-red-600 mt-2">{errors.position}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="gridName">City</label>
                                    <Select
                                        name="cityId"
                                        placeholder="Select an option"
                                        options={cityOptions}
                                        value={cityOptions?.filter((option :Option) => values?.cityId?.includes(option.value))}
                                        isMulti
                                        isSearchable={false}
                                        onChange={(selected: any) => {
                                            let selectedids = selected ? selected.map((data: any) => data.value) : [];
                                            setFieldValue('cityId', selectedids);
                                            setGetCityIds(selectedids);
                                        }}
                                    />
                                    {errors.cityId && touched.cityId ? <div className="text-red-600 mt-2">{errors.cityId}</div> : null}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridName">Area</label>
                                    <Select
                                        name="areasId"
                                        placeholder="Select an option"
                                        options={areaOptions}
                                        value={areaOptions?.filter((option: any) => values?.areasId?.includes(option.value))}
                                        isMulti
                                        isSearchable={false}
                                        onChange={(selected: any) => {
                                            let selectedids = selected ? selected.map((data: any) => data.value) : [];
                                            setFieldValue('areasId', selectedids);
                                            setGetAreaIds(selectedids);
                                        }}
                                    />
                                    {errors.areasId && touched.areasId ? <div className="text-red-600 mt-2">{errors.areasId}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="gridName">Sub Area</label>
                                    <Select
                                        name="subareasId"
                                        placeholder="Select an option"
                                        options={subAreaOptions}
                                        // noOptionsMessage={() => 
                                        //     cityIsError ? 'Failed to load sub area data'
                                        //     : areaData.length === 0 ?
                                        //     'No '
                                        //     : 'Please select area first to get sub areas' }
                                        isMulti
                                        isSearchable={false}
                                        value={subAreaOptions?.filter((option: any) => values?.subareasId?.includes(option.value))}
                                        onChange={(selected: any) => {
                                            let selectedids = selected ? selected.map((data: any) => data.value) : [];
                                            setFieldValue('subareasId', selectedids);
                                            setGetSubAreaIDs(selectedids);
                                        }}
                                    />
                                    {errors.subareasId && touched.subareasId ? <div className="text-red-600 mt-2">{errors.subareasId}</div> : null}
                                </div>
                                {/* <div>
                                            <label htmlFor="gridName">Areas</label>
                                            <AreaSelect areaOption={areaData} />
                                            {errors.Name && touched.Name ? <div className="text-red-600 mt-2">{errors.Name}</div> : null}
                                        </div> */}
                                {/* <div>
                                            <label htmlFor="gridAddress1">Sub Area</label>
                                            <Select placeholder="Select an option" isMulti isSearchable={false} />
                                            {errors.address && touched.address ? <div className="text-red-600 mt-2">{errors.address}</div> : null}
                                        </div> */}
                            </div>

                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreateMeetingMember;

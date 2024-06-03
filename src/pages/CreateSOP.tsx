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
import { getScoutMember, createSOP } from '../Fetcher/Api';

function CreateSOP() {
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

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Create SOP'));
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
    // let getCityIdString = getCityIDs.join('');
    let {
        isError: areaIsError,
        data: areaData,
        error: areaError,
        isLoading: areaLoading,
    } = useQuery({
        queryKey: ['getAreas', getCityIDs],
        queryFn: () => getAreas(getCityIDs),
        refetchOnWindowFocus: false,
        retry: 1,
    });

    // GET Scout Member
    // let getsubAreasIdString = getAreaIDs.join('');
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
        mutationKey: ['createSOP'],
        mutationFn: createSOP,
    });

    // useEffect(() => {
    //     setTimeout(() => {
    //         mutation.reset();
    //     }, 3000);
    // }, [mutation.isSuccess, mutation.isError]);

    interface Option {
        value: string;
        label: string;
    }

    interface FormValues {
        userIds: string[];
        projectType: string;
        projectDomain: string;
        cityId: string;
        areasId: string[];
    }

    const initialValues: FormValues = {
        userIds: [],
        projectType: '',
        cityId: '',
        areasId: [],
        projectDomain: '',
    };

    const projectTypeData = [
        {
            value: '1',
            label: 'Market',
        },
        {
            value: '2',
            label: 'Project',
        },
    ];

    const projectDomainData = [
        {
            value: '1',
            label: 'Residential',
        },
        {
            value: '2',
            label: 'Commercial',
        },
    ];

    const cityOptions: Option[] = cityData?.map((data: any) => ({ value: data?.id, label: data?.cityName })) || [];
    const areaOptions: Option[] = areaData?.map((data: any) => ({ value: data?.id, label: data?.AreaName })) || [];
    const scoutMemberOptions: Option[] = scoutMemberData?.map((data: any) => ({ value: data?.id, label: data?.name })) || [];
    const projectTypeOptions: Option[] = projectTypeData?.map((data: any) => ({ value: data?.value, label: data?.label })) || [];
    const projectDomainOption: Option[] = projectDomainData?.map((data: any) => ({ value: data?.value, label: data?.label })) || [];

    const CreateMeetingMemberSchema = Yup.object().shape({
        userIds: Yup.array().of(Yup.string()).min(1, 'At least one city must be selected').required('Required'),
        projectType: Yup.string().required('Required'),
        cityId: Yup.string().required('Required'),
        areasId: Yup.array().of(Yup.string()).min(1, 'At least one area must be selected').required('Required'),
    });

    return (
        <div>
            {/* <ModalInfo message="Successfully add SOP" success={mutation.isSuccess}/> */}

            {mutation.isSuccess && <ModalInfo message="Successfully add SOP" success={mutation.isSuccess} />}
            {mutation.isError && <ModalInfo message={mutation.error.message} success={mutation.isSuccess} />}
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create SOP</span>
                </li>
            </ul>
            <div className="pt-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={CreateMeetingMemberSchema}
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridName">City</label>
                                    <Select
                                        className="border-none"
                                        name="cityId"
                                        placeholder="Select City"
                                        options={cityOptions}
                                        value={cityOptions.filter((option) => option.label === values.cityId)}
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
                                            setFieldValue('cityId', selected ? selected.label : '');
                                            setGetCityIds(selected.value);
                                        }}
                                    />
                                    {errors.cityId && touched.cityId ? <div className="text-red-600 mt-2">{errors.cityId}</div> : null}
                                </div>
                                <div>
                                    <label htmlFor="gridName">Area</label>
                                    <Select
                                        name="areasId"
                                        placeholder="Select an option"
                                        options={areaOptions}
                                        value={areaOptions?.filter((option: any) => values?.areasId?.includes(option.label))}
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
                                        onChange={(selected: any) => {
                                            let selectedids = selected ? selected.map((data: any) => data.label) : [];
                                            setFieldValue('areasId', selectedids);
                                            setGetAreaIds(selectedids);
                                        }}
                                        components={{
                                            NoOptionsMessage: () => <div style={{ padding: 10 }}>
                                                {
                                                !values.cityId ? 
                                                <p>Please Select City First</p> : 
                                                areaLoading ? <p>Loading...</p> : 
                                                areaError ? <p>{areaError?.message}</p> :
                                                ''}
                                                </div>,
                                        }}
                                    />
                                    {errors.areasId && touched.areasId ? <div className="text-red-600 mt-2">{errors.areasId}</div> : null}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridName">Users</label>
                                    <Select
                                        name="userIds"
                                        placeholder="Select an option"
                                        options={scoutMemberOptions}
                                        value={scoutMemberOptions?.filter((option: any) => values?.userIds?.includes(option.value))}
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
                                        onChange={(selected: any) => {
                                            setFieldValue('userIds', selected ? selected.map((data: any) => data.value) : []);
                                        }}
                                    />
                                    {errors.userIds && touched.userIds ? <div className="text-red-600 mt-2">{errors.userIds}</div> : null}
                                </div>
                                <div>
                                    <label htmlFor="gridName">Project Type</label>
                                    <Select
                                        name="projectType"
                                        placeholder="Select an option"
                                        options={projectTypeOptions}
                                        value={projectTypeOptions.filter((option) => option.label === values.projectType)}
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
                                            setFieldValue('projectType', selected.label);
                                        }}
                                    />
                                    {errors.projectType && touched.projectType ? <div className="text-red-600 mt-2">{errors.projectType}</div> : null}
                                </div>
                            </div>
                            {values.projectType && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="gridName">Project Domain</label>
                                        <Select
                                            name="projectDomain"
                                            placeholder="Select an option"
                                            options={projectDomainOption}
                                            isSearchable={false}
                                            styles={customStyles}
                                            value={projectDomainOption.filter((option) => option.label === values.projectDomain)}
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: 'transparent',
                                                    primary: '#F59927',
                                                },
                                            })}
                                            onChange={(selected: any) => {
                                                setFieldValue('projectDomain', selected.label);
                                            }}
                                        />
                                        {errors.projectDomain && touched.projectDomain ? <div className="text-red-600 mt-2">{errors.projectDomain}</div> : null}
                                    </div>
                                </div>
                            )}
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

export default CreateSOP;

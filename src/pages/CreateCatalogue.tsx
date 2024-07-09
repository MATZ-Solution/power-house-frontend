import { useMutation } from '@tanstack/react-query';
import { Formik, Field, Form } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { setPageTitle } from '../store/themeConfigSlice';
import { ADDCatalogue } from '../Fetcher/Api';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { alertSuccess, alertFail } from './Components/Alert';

function CreateCatalogue() {
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Create Catalogue'));
    }, [dispatch]);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        document: Yup.mixed().required('Document is required'),
    });

    const mutation = useMutation<any, Error, FormData>({
        mutationFn: (formData: FormData) => ADDCatalogue(formData),
        onSuccess: () => {
            alertSuccess('Catalogue created successfully!');
            // navigate('/view-catalog'); 
        },
        onError: (error: any) => {
            alertFail(error.message);
        },
    });


    return (
        <div>
            <div className="border-l-[5px] border-[#F59927] px-3 ">
                <p className={`${isDark ? 'text-white' : 'text-black'} font-bold text-xl`}>Create Catalogue</p>
            </div>
            <div className={`mt-5 p-5 ${isDark ? 'bg-[#0e1726]' : 'bg-white'} rounded-[20px]`}>
                <Formik
                    initialValues={{ title: '', document: null }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const formData = new FormData();
                        formData.append('title', values.title);
                        if (values.document) {
                            formData.append('document', values.document);
                        }
                        mutation.mutate(formData);
                        setSubmitting(false);
                        
                        // resetForm();
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <Field name="title" type="text" placeholder="Enter Title" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="document">Document</label>
                                    <input
                                        id="document"
                                        name="document"
                                        type="file"
                                        onChange={(event) => {
                                            if (event.currentTarget.files && event.currentTarget.files[0]) {
                                                setFieldValue('document', event.currentTarget.files[0]);
                                            }
                                        }}
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary !mt-6">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreateCatalogue;

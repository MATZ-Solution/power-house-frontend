import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SomeThingWentWrong from '../Pages/SomethingWentWrong';
// import Modal from '../../components/Modals';
import Modals from '../Components/Modals';
import { addAdminDetails } from '../../store/adminDetails';
import Maintenence from '../Pages/Maintenence';
import { BASE_URL } from '../../Constants/Constant';
import { error } from 'console';
const LoginBoxed = () => {
    const dispatch = useDispatch();

    const [errorHandle, setErrorHandle] = useState({
        error: false,
        message: '',
        serverError: false,
        isLoading: false,
    });

    const login = async (data: object) => {
        setErrorHandle({ ...errorHandle, isLoading: true });
        localStorage.removeItem('token');
        try {
            const loginRequest = await fetch(`${BASE_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!loginRequest.ok) {
                const response = await loginRequest.json();
                const statusCode = loginRequest.status;
                if (statusCode === 500) {
                    return setErrorHandle({ ...errorHandle, error: true, message: response.message });
                }
                return setErrorHandle({ ...errorHandle, message: response.message });
            }
            const response = await loginRequest.json();
            localStorage.setItem('token', response.token);
            setErrorHandle({ ...errorHandle, isLoading: false });
            navigate('/dashboard');
            dispatch(addAdminDetails(response?.data));
        } catch (err) {
            console.log(err);
            setErrorHandle({ ...errorHandle, error: true, message: 'Server Cannot Respond' });
        }
    };

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Please Enter Email'),
        password: Yup.string().min(5, 'Too Short!').required('Please Enter Password'),
    });

    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const submitForm = (values: any) => {
        navigate('/dashboard');
    };

    // if (errorHandle.message === 'Internal Server Error' || errorHandle.serverError) {
    //     return <SomeThingWentWrong message={errorHandle.message} errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
    // }

    if (errorHandle.error) {
        return <SomeThingWentWrong message={errorHandle.message} errorHandle={errorHandle} setErrorHandle={setErrorHandle} />;
    }

    return (
        <div>
            {/* <Modals/> */}
            {/* <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div> */}

            <div className="relative flex min-h-screen items-center justify-center  bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                {/* <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" /> */}
                {/* <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" /> */}
                {/* <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" /> */}
                {/* <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" /> */}
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-[#ffffff] backdrop-blur-lg dark:bg-black/50 px-6  py-20">
                        {/* lg:min-h-[758px] */}
                        <div className="absolute top-6 end-6">
                            {/* <div className="dropdown">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{flag}</div>
                                            <span className="shrink-0">
                                                <IconCaretDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code);
                                                            // setFlag(item.code);
                                                            setLocale(item.code);
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div> */}
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="flex items-center justify-center">
                                <img className="w-12 h-13 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />
                                <span className="text-4xl font-extrabold text-black ltr:ml-1.5 rtl:mr-1.5 align-middle lg:inline dark:text-white-light">Power House</span>
                            </div>
                            <div className="mb-5 mt-3">
                                <h1 className="text-3xl font-extrabold text-[#F59927]">Sign in</h1>
                                <p className="text-base font-extrabold leading-normal text-black">Enter your email and password to login</p>
                            </div>
                            {(errorHandle.message === 'Email not found' || errorHandle.message === 'Incorrect Password') && (
                                <div className="flex items-center bg-red-200 h-8 px-2 pb-6 pt-6 rounded">
                                    <p className="text-red-700">{errorHandle.message}</p>
                                </div>
                            )}

                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={(values) => {
                                    login(values);
                                    // navigate('/dashboard');
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form className=" space-y-5 dark:text-white">
                                        <div>
                                            <label htmlFor="Email" className="font-extrabold">
                                                Email*
                                            </label>
                                            <div className="relative text-white-dark">
                                                <Field name="email" id="Email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconMail fill={true} />
                                                </span>
                                            </div>
                                            {errors.email && touched.email ? <div className="text-red-600 mt-2">{errors.email}</div> : null}
                                        </div>
                                        <div>
                                            <label htmlFor="Password" className="font-extrabold">
                                                Password*
                                            </label>
                                            <div className="relative text-white-dark">
                                                <Field name="password" id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconLockDots fill={true} />
                                                </span>
                                            </div>
                                            {errors.password && touched.password ? <div className="text-red-600 mt-2">{errors.password}</div> : null}
                                        </div>
                                        {/* <div>
                                            <label className="flex cursor-pointer items-center">
                                                <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                                <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                            </label>
                                        </div> */}
                                        <button type="submit" className="btn !mt-6 w-full border-0 uppercase bg-[#F59927] text-white" disabled={errorHandle.isLoading}>
                                            {errorHandle.isLoading ? 'Signing in...' : 'Sign in'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>

                            {/* <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div> */}
                            {/* <div className="mb-10 md:mb-[60px]">
                                <ul className="flex justify-center gap-3.5 text-white">
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconInstagram />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconFacebookCircle />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconTwitter fill={true} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconGoogle />
                                        </Link>
                                    </li>
                                </ul>
                            </div> */}
                            {/* <div className="text-center dark:text-white mt-5">
                                Don't have an account ?&nbsp;
                                <Link to="/auth/boxed-signup" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;

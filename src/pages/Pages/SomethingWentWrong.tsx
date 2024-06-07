import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';

const SomeThingWentWrong = ({ message, errorHandle, setErrorHandle }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        // dispatch(setPageTitle('Error 404'));
        dispatch(setPageTitle('Error'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    function home() {
        if (location.pathname === '/') {
            setErrorHandle({ ...errorHandle, error: false });
        } else {
            navigate('/');
        }
    }
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#F59927_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
                <div className="relative">
                    <img
                        src={isDark ? '/assets/images/error/404-dark.png' : '/assets/images/error/404-dark.png'}
                        alt="404"
                        className="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl bg-transparent"
                    />
                    <p className="mt-5 text-base dark:text-white">{message}</p>
                    {/* <div onClick={home} className="btn bg-[#F59927] text-white mx-auto !mt-7 w-max border-0 uppercase shadow-none">
                        Home
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default SomeThingWentWrong;

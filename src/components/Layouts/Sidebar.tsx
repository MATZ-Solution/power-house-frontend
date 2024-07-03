import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconUser from '../Icon/IconUser';
import IconMapPin from '../Icon/IconMapPin';
import LocationSVG from '../Icon/location.svg'
import SOP from '../Icon/IconStar'
import mapIcon from './../Icon/mapIcon.svg'
import IconUserPlus from './../Icon/IconUserPlus'
import SummarizeSharpIcon from '@mui/icons-material/SummarizeSharp';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const [menu, setMenu] = useState({
        setupForms: false,
    });
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        // <div className={semidark ? 'dark' : ''}>
        <div className={semidark ? '' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-7 h-9 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />
                            <span className="text-xl font-extrabold text-black ltr:ml-1.5 rtl:mr-1.5 align-middle lg:inline dark:text-white-light">{t('Power House')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="text-[#F59927]  m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">

                        {/* <NavLink to="/dashboard">{t('Analytics')}</NavLink> */}




                        {/* Dashboard */}
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <NavLink to="/dashboard">
                                    <div className="flex items-center">
                                        <IconMenuDashboard />
                                        {/* <img src={mapIcon}  className="group-hover:!text-primary shrink-0 w-5 h-5"></img> */}
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dashboard')}</span>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>


                        {/* map */}
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <NavLink to="/maps-scout-location">
                                    {/* <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}> */}
                                    <div className="flex items-center">
                                        <img src={mapIcon} className="group-hover:!text-primary shrink-0 w-5 h-5"></img>

                                        {/* <IconUser fill={true} className="group-hover:!text-primary shrink-0" /> */}
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Maps')}</span>
                                    </div>

                                    {/* </button> */}
                                </NavLink>
                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>

                                </AnimateHeight>
                            </li>


                        </ul>

                        {/* Meeting */}
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <NavLink to="/meetings">
                                    <div className="flex items-center">
                                        <IconUserPlus />
                                        {/* <img src={mapIcon}  className="group-hover:!text-primary shrink-0 w-5 h-5"></img> */}
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Meetings')}</span>
                                    </div>
                                </NavLink>
                                <AnimateHeight duration={300} height={currentMenu === 'meetings' ? 'auto' : 0}>
                                </AnimateHeight>
                            </li>
                        </ul>


                        {/* Create SOP */}
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                {/* <button type="button" className={`${currentMenu === 'locations' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('locations')}> */}
                                <button type="button" className={`${currentMenu === 'create-sop' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('create-sop')}>
                                    <div className="flex items-center">
                                        <SOP />
                                        {/* <img src={SOP}  className="group-hover:!text-primary shrink-0 w-5 h-5"></img> */}
                                        {/* <IconMapPin fill={true} className="group-hover:!text-primary shrink-0 "/> */}
                                        {/* <IconMenuNotes className="group-hover:!text-primary shrink-0" /> */}
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('SOP')}</span>
                                    </div>
                                    <div className={currentMenu !== 'create-sop' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'create-sop' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/create-sop">{t('Create SOP')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/view-sops">{t('View SOPs')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>

                        {/* Scout Locations */}
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                {/* <button type="button" className={`${currentMenu === 'locations' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('locations')}> */}
                                <button type="button" className={`${currentMenu === 'scouted-location' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('scouted-location')}>
                                    <div className="flex items-center">
                                        <img src={LocationSVG} className="group-hover:!text-primary shrink-0 w-5 h-5"></img>
                                        {/* <IconMapPin fill={true} className="group-hover:!text-primary shrink-0 "/> */}
                                        {/* <IconMenuNotes className="group-hover:!text-primary shrink-0" /> */}
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Scout Locations')}</span>
                                    </div>
                                    <div className={currentMenu !== 'scouted-location' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'scouted-location' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/scouted-location">{t('All Locations')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/alloted-location">{t('Alloted Locations')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/unalloted-location">{t('Unalloted Locations')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>

                        {/* create User */}
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
                                    <div className="flex items-center">
                                        <IconUser fill={true} className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Users')}</span>
                                    </div>
                                    <div className={currentMenu !== 'users' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/create-user">{t('Create User')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/view-user">{t('View User')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>


                        </ul>

                        {/* Reports */}
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'ScoutReports' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('ScoutReports')}>
                                    <div className="flex items-center">
                                        <SummarizeSharpIcon />
                                        {/* <img src={LocationSVG}  className="group-hover:!text-primary shrink-0 w-5 h-5"></img> */}
                                        {/* <IconMapPin fill={true} className="group-hover:!text-primary shrink-0 "/> */}
                                        {/* <IconMenuNotes className="group-hover:!text-primary shrink-0" /> */}
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Reports')}</span>
                                    </div>
                                    <div className={currentMenu !== 'ScoutReports' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'ScoutReports' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/scout-report">{t('Scout Reports')}</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/unalloted-location">{t('Unalloted Locations')}</NavLink>
                                        </li> */}
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>

                        {/* SetUp Forms */}
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'setUpForms' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('setUpForms')}>
                                    <div className="flex items-center">
                                        <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                        {/* <IconMenuDashboard className="group-hover:!text-primary shrink-0" /> */}
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('SetUp Forms')}</span>
                                    </div>
                                    <div className={currentMenu !== 'setUpForms' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight
                                    duration={300}
                                    // height={'auto'}
                                    height={currentMenu === 'setUpForms' ? 'auto' : 0}
                                >
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/add-cities">{t('Add Cities')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/add-area">{t('Add Area')}</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/add-sub-area">{t('Add Sub Area')}</NavLink>
                                        </li> */}
                                        {/* <li>
                                            <NavLink to="/addScoutsUser">{t('Add Scout User')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/scouts">{t('Scouts')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/scouts-member">{t('Scouts Member')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/add-area">{t('Add Area')}</NavLink>
                                        </li> */}
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>

                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;

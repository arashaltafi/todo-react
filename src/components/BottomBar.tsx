import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

interface BottomBarProps {
    showBottomBar: boolean
}

const BottomBar = (props: BottomBarProps) => {
    const isDarkMode = useSelector((state: any) => state.appSetting.isDarkMode);
    const isPersian = useSelector((state: any) => state.appSetting.isPersian);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setPage(0);
                break;
            case "/pronunciation":
                setPage(1);
                break;
            case "/dictionary":
                setPage(2);
                break;
            case "/setting":
                setPage(3);
                break;
            default:
                setPage(0);
                break;
        }
    }, [location.pathname]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(event)
        }
        setPage(newValue);
        switch (newValue) {
            case 0:
                navigate("/");
                break;
            case 1:
                navigate("/pronunciation");
                break;
            case 2:
                navigate("/dictionary");
                break;
            case 3:
                navigate("/setting");
                break;
            default:
                navigate("/");
                break;
        }
    };

    const [bottomAction, setBottomAction] = useState<{
        label: string;
        value: number;
        icon: JSX.Element;
    }[]>();

    useEffect(() => {
        setBottomAction(
            [
                {
                    label: "آموزش",
                    value: 0,
                    icon: <LibraryBooksOutlinedIcon />
                }, {
                    label: "تلفظ انگلیسی",
                    value: 1,
                    icon: <LocalLibraryOutlinedIcon />
                }, {
                    label: "دیکشنری",
                    value: 2,
                    icon: <LanguageOutlinedIcon />
                },
                {
                    label: "تنظیمات",
                    value: 3,
                    icon: <SettingsOutlinedIcon />
                }
            ]
        );
    }, []);

    return (
        <BottomNavigation
            dir={isPersian ? "ltr" : "ltr"}
            showLabels
            className='py-4 sm:py-6 md:py-8 px-8 sm:px-12 md:px-16 bg-slate-300 dark:bg-slate-700 fixed bottom-0 w-full mx-auto border-t-[1px] border-solid border-sky-500 zIndex50'
            sx={{
                display: `${props.showBottomBar ? '' : 'none'}`,
                "& button": {
                    color: isDarkMode ? "#D1D5DB" : "#334155"
                },
                "& .MuiSvgIcon-root": {
                    width: '5rem'
                },
                '@media (max-width: 480px)': {
                    "& .MuiSvgIcon-root": {
                        width: '4rem'
                    },
                    "& .MuiBottomNavigationAction-label": {
                        width: '4rem',
                        fontSize: '12px'
                    }
                },
                "& .Mui-selected ": {
                    color: '#0EA5E9'
                },
                "& .MuiBottomNavigationAction-label": {
                    width: '5rem',
                    fontFamily: isPersian
                        ? "vazir-normal, vazir-medium, vazir-bold, Cambria, Cochin, Georgia, Times, serif, sans-serif, monospace"
                        : "Cambria, Cochin, Georgia, Times, Times New Roman, Lucida Sans, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif, vazir-normal, vazir-medium, vazir-bold"
                }
            }}
            value={page}
            onChange={handleChange}>
            {
                bottomAction?.map((action, index) => (
                    <BottomNavigationAction
                        key={index}
                        label={action.label}
                        value={action.value}
                        icon={action.icon}
                    />
                ))
            }
        </BottomNavigation>
    )
}

export default BottomBar
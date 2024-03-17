import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';
import Snackbar from '@mui/material/Snackbar'
import { ComponentType, ReactElement, useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';

const SnackBar = () => {
    const snackbarSetting = useSelector((state: any) => state.snackbar.snackbarSetting);

    const [state, setState] = useState<{
        open: boolean;
        Transition: ComponentType<
            TransitionProps & {
                children: ReactElement<any, any>;
            }
        >;
        vertical: "top" | "bottom",
        horizontal: "center" | "left" | "right",
    }>({
        open: snackbarSetting.isOpen,
        Transition: Fade,
        vertical: "top",
        horizontal: "center",
    });

    useEffect(() => {
        setState({
            ...state,
            open: snackbarSetting.isOpen,
            vertical: snackbarSetting?.anchorOrigin?.vertical || 'top',
            horizontal: snackbarSetting?.anchorOrigin?.horizontal || 'center',
        });
    }, [snackbarSetting])

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    return (
        <>
            <Snackbar
                className='mt-16 opacity-95'
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                message=""
                key={state.Transition.name}
                autoHideDuration={snackbarSetting?.duration || 3000}
                anchorOrigin={{
                    vertical: state.vertical,
                    horizontal: state.horizontal
                }}
                sx={{
                    '.MuiAlert-message': {
                        width: '100%',
                        direction: 'rtl'
                    }
                }}
            >
                <Alert
                    className='w-full text-right font-vazir'
                    onClose={handleClose}
                    severity={snackbarSetting.type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarSetting.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SnackBar
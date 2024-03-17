import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type snackbarSettingType = {
    isOpen: boolean,
    message: string,
    duration?: number,
    type?: 'success' | 'error' | 'warning' | 'info',
    anchorOrigin?: {
        vertical: 'top' | 'bottom',
        horizontal: 'center' | 'left' | 'right'
    }
}

interface NumberState {
    snackbarSetting: snackbarSettingType
}

const initialState: NumberState = {
    snackbarSetting: {
        isOpen: false,
        message: '',
        duration: 3000,
        type: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
        }
    }
}

const snackBarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        setSnackBar: (state, action: PayloadAction<snackbarSettingType>) => {
            state.snackbarSetting = action.payload
        },
    }
});

export default snackBarSlice
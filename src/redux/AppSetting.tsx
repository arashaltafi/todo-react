import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface NumberState {
    isDarkMode: boolean,
    isPersian: boolean,
    is404: boolean
}

const initialState: NumberState = {
    isDarkMode: true,
    isPersian: true,
    is404: false
}

const AppSettingSlice = createSlice({
    name: 'appSetting',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload
        },
        setLangPersian: (state, action: PayloadAction<boolean>) => {
            state.isPersian = action.payload
        },
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
        toggleLang: (state) => {
            state.isPersian = !state.isPersian;
        },
        setIs404: (state, action: PayloadAction<boolean>) => {
            state.is404 = action.payload
        }
    },
})

export default AppSettingSlice
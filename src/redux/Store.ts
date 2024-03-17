import { configureStore } from '@reduxjs/toolkit'
import AppSetting from './AppSetting'
import snackBarSlice from './snackBarSlice'

export const store = configureStore({
    reducer: {
        appSetting: AppSetting.reducer,
        snackbar: snackBarSlice.reducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})
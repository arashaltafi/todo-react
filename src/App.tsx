import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AppSettingSlice from './redux/AppSetting';
import './localiztion/i18nextSetting';
import { useTranslation } from "react-i18next";
import MyRoute from './route/MyRoute';
import NotFound from './pages/NotFound';

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const is404 = useSelector((state: any) => state.appSetting.is404);

  useEffect(() => {
    //handle theme
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      dispatch(AppSettingSlice.actions.setDarkMode(true));
    } else if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.remove('dark')
      dispatch(AppSettingSlice.actions.setDarkMode(false));
    } else {
      try {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
          const newColorScheme = event.matches ? "dark" : "light";
          if (newColorScheme == "dark") {
            document.documentElement.classList.add('dark');
            dispatch(AppSettingSlice.actions.setDarkMode(true));
          } else {
            document.documentElement.classList.remove('dark');
            dispatch(AppSettingSlice.actions.setDarkMode(false));
          }
        });
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
          dispatch(AppSettingSlice.actions.setDarkMode(true));
        } else {
          document.documentElement.classList.remove('dark');
          dispatch(AppSettingSlice.actions.setDarkMode(false));
        }
      } catch (error: any) {
        document.documentElement.classList.add('dark');
        dispatch(AppSettingSlice.actions.setDarkMode(true));
      }
    }

    //handle language
    i18n.changeLanguage(localStorage.getItem('lang') || 'fa');
    if (localStorage.getItem('lang') === 'fa') {
      document.body.classList.remove('font-serif')
      document.body.classList.add('font-vazir')
      dispatch(AppSettingSlice.actions.setLangPersian(true));
    } else if (localStorage.getItem('lang') === 'en') {
      document.body.classList.remove('font-vazir')
      document.body.classList.add('font-serif')
      dispatch(AppSettingSlice.actions.setLangPersian(false));
    } else {
      document.body.classList.remove('font-serif')
      document.body.classList.add('font-vazir')
      dispatch(AppSettingSlice.actions.setLangPersian(true));
    }
  }, [])

  return (
    <div className='flex items-center justify-center flex-col select-none'>
      {
        is404 ? <NotFound /> :
          <div
            className={`flex items-center justify-center w-full mx-auto overflow-x-hidden ios-padding`}>
            <MyRoute />
          </div>
      }
    </div>
  )
}

export default App

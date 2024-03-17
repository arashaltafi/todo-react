import NotFound from '../pages/NotFound';
import Loading from '../components/Loading';
import { Route, Routes } from 'react-router';
import React, { Suspense } from 'react';
import SnackBar from '../components/SnackBar';


const MyRoute = () => {
    const HomeLayout = React.lazy(
        () => import("../pages/Home")
    );

    return (
        <div className='w-full'>
            <Suspense fallback={<Loading position='center' />}>
                <SnackBar />
                <Routes>
                    <Route path="/" element={<HomeLayout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default MyRoute
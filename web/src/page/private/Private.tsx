import { Loading, Navbar, RoutesWithNotFound } from '@/components';
import { privateRoutes } from '@/models';
import { modifyDevice } from '@/redux/state';
import { lazy, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const Home = lazy(() => import('./home/Home').then(module => ({ default: module.Home })));

export const Private = () => {
    const dispatch = useDispatch();

    const [loading] = useState(false);

    const eventListenerResize = () => {
        let isMovile = false;
        if (window.innerWidth >= 320 && window.innerWidth <= 768) isMovile = true;
        dispatch(modifyDevice(isMovile));
    };

    useEffect(() => {
        window.addEventListener('resize', eventListenerResize);
        return () => window.removeEventListener('resize', eventListenerResize);
    }, []);

    return (
        <div className='flex flex-column vh-100'>
            <Navbar />
            <div className='flex-1'>
                {loading ? (
                    <Loading />
                ) : (
                    <RoutesWithNotFound>
                        <Route path='/' element={<Navigate to={privateRoutes.HOME} />} />
                        <Route path={privateRoutes.HOME} element={<Home />} />
                        <Route path={privateRoutes.VEHICLES} element={<>Vehiculos</>} />
                    </RoutesWithNotFound>
                )}
            </div>
        </div>
    );
};

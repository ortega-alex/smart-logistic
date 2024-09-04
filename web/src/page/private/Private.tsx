import { Loading, Navbar, RoutesWithNotFound } from '@/components';
import { privateRoutes } from '@/models';
import { lazy, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';

const Home = lazy(() => import('./home/Home').then(module => ({ default: module.Home })));

export const Private = () => {
    const [loading, setLoading] = useState(false);

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

import { Loading, Navbar, RoutesWithNotFound } from '@/components';
import { Menu, privateRoutes } from '@/models';
import { RootState } from '@/redux';
import { modifyDevice, setMenu } from '@/redux/state';
import { httpGetMenus } from '@/services';
import { message } from 'antd';
import { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const Home = lazy(() => import('./home/Home').then(module => ({ default: module.Home })));
const Customer = lazy(() => import('./maintenance/custome/Customer').then(module => ({ default: module.Customer })));

export const Private = () => {
    const dispatch = useDispatch();
    const menuState: Array<Menu> = useSelector((store: RootState) => store.menu);

    const [loading] = useState(false);

    const eventListenerResize = () => {
        let isMovile = false;
        if (window.innerWidth >= 320 && window.innerWidth <= 768) isMovile = true;
        dispatch(modifyDevice(isMovile));
    };

    useEffect(() => {
        window.addEventListener('resize', eventListenerResize);

        httpGetMenus()
            .then(res => dispatch(setMenu({ menus: res })))
            .catch(err => message.error(`Error http get menus: ${err.message}`));

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
                        <>
                            {menuState.some(item => item.path === 'VEHICLES') && (
                                <Route path={privateRoutes.VEHICLES} element={<>Vehiculos</>} />
                            )}
                            {menuState.some(item => item.path === 'CUSTOMERS') && (
                                <Route path={privateRoutes.CUSTOMERS} element={<Customer />} />
                            )}
                        </>
                    </RoutesWithNotFound>
                )}
            </div>
        </div>
    );
};

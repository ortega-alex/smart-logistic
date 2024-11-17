import { permissionMenuAdapter } from '@/adapter';
import { Loading, Navbar, RoutesWithNotFound } from '@/components';
import { Menu, privateRoutes, Sesion } from '@/models';
import { RootState } from '@/redux';
import { modifyDevice, setMenu } from '@/redux/state';
import { httpGetPermissionsMenusByProfileId } from '@/services';
import { message } from 'antd';
import { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const Home = lazy(() => import('./home/Home').then(module => ({ default: module.Home })));
const Quoter = lazy(() => import('./quoter/Quoter').then(module => ({ default: module.Quoter })));
const Vehicles = lazy(() => import('./vehicle/Vehicles').then(module => ({ default: module.Vehicles })));

// MANTENIMIENTOS
const Customer = lazy(() => import('./maintenance/custome/Customer').then(module => ({ default: module.Customer })));
const User = lazy(() => import('./maintenance/users/User').then(module => ({ default: module.User })));
const Aution = lazy(() => import('./maintenance/aution/Aution').then(module => ({ default: module.Aution })));
const Crane = lazy(() => import('./maintenance/crane/Crane').then(module => ({ default: module.Crane })));
const Port = lazy(() => import('./maintenance/ports/Port').then(module => ({ default: module.Port })));
const TypeVehicle = lazy(() => import('./maintenance/type-of-vehicle/TypeVehicle').then(module => ({ default: module.TypeVehicle })));
const Profile = lazy(() => import('./maintenance/profile/Profile').then(module => ({ default: module.Profile })));
const TypeOfCustomer = lazy(() =>
    import('./maintenance/type-of-customer/TypeOfCustomer').then(module => ({ default: module.TypeOfCustomer }))
);

export const Private = () => {
    const dispatch = useDispatch();
    const menuState: Array<Menu> = useSelector((store: RootState) => store.menu);
    const sesionState: Sesion = useSelector((store: RootState) => store.session);

    const [loading] = useState(false);

    const eventListenerResize = () => {
        let isMovile = false;
        if (window.innerWidth >= 320 && window.innerWidth <= 768) isMovile = true;
        dispatch(modifyDevice(isMovile));
    };

    useEffect(() => {
        window.addEventListener('resize', eventListenerResize);
        eventListenerResize();

        httpGetPermissionsMenusByProfileId(sesionState.perfil?.id_perfil ?? 0)
            .then(res => {
                const { menus } = permissionMenuAdapter(res);
                dispatch(setMenu({ menus }));
            })
            .catch(err => message.error(`Error http get permission menu by profile: ${err.message}`));

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
                            {menuState.some(item => item.path === 'QUOTER') && <Route path={privateRoutes.QUOTER} element={<Quoter />} />}

                            {menuState.some(item => item.path === 'VEHICLES') &&
                                [privateRoutes.VEHICLES, `${privateRoutes.VEHICLES}/:id`].map(item => (
                                    <Route key={item} path={item} element={<Vehicles />} />
                                ))}

                            {menuState.some(item => item.path === 'CUSTOMERS') && (
                                <Route path={privateRoutes.CUSTOMERS} element={<Customer />} />
                            )}

                            {menuState.some(item => item.path === 'USERS') && <Route path={privateRoutes.USERS} element={<User />} />}

                            {menuState.some(item => item.path === 'ACUTION') && <Route path={privateRoutes.ACUTION} element={<Aution />} />}

                            {menuState.some(item => item.path === 'CRANES') && <Route path={privateRoutes.CRANES} element={<Crane />} />}

                            {menuState.some(item => item.path === 'PORTS') && <Route path={privateRoutes.PORTS} element={<Port />} />}

                            {menuState.some(item => item.path === 'TYPES_OF_VEHICLES') && (
                                <Route path={privateRoutes.TYPES_OF_VEHICLES} element={<TypeVehicle />} />
                            )}

                            {menuState.some(item => item.path === 'PROFILES') && (
                                <Route path={privateRoutes.PROFILES} element={<Profile />} />
                            )}

                            {menuState.some(item => item.path === 'TYPES_OF_CUSTOMERS') && (
                                <Route path={privateRoutes.TYPES_OF_CUSTOMERS} element={<TypeOfCustomer />} />
                            )}
                        </>
                    </RoutesWithNotFound>
                )}
            </div>
        </div>
    );
};

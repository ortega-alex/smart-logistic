import { permissionMenuAdapter } from '@/adapter';
import { Navbar, RoutesWithNotFound } from '@/components';
import { privateRoutes } from '@/constants';
import { QuoterState, VehicleState } from '@/context';
import { Menu, Session } from '@/interfaces';
import { RootState } from '@/redux';
import { modifyDevice, setMenu } from '@/redux/state';
import { httpGetPermissionsMenusByProfileId } from '@/services';
import { calculateScreenSize } from '@/utilities';
import { message } from 'antd';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const Home = lazy(() => import('./home/Home').then(module => ({ default: module.Home })));
const Quoter = lazy(() => import('./quoter/Quoter').then(module => ({ default: module.Quoter })));
const Vehicle = lazy(() => import('./vehicle/Vehicle').then(module => ({ default: module.Vehicle })));
const Appointment = lazy(() => import('./appointment/Appointment').then(module => ({ default: module.Appointment })));

// MANTENIMIENTOS
const Customer = lazy(() => import('./maintenance/custome/Customer').then(module => ({ default: module.Customer })));
const User = lazy(() => import('./maintenance/users/User').then(module => ({ default: module.User })));
const Auction = lazy(() => import('./maintenance/auction/Auction').then(module => ({ default: module.Auction })));
const VehicleType = lazy(() => import('./maintenance/vehicle-type/VehicleType').then(module => ({ default: module.VehicleType })));
const Profile = lazy(() => import('./maintenance/profile/Profile').then(module => ({ default: module.Profile })));
const CustomerType = lazy(() => import('./maintenance/customer-type/CustomerType').then(module => ({ default: module.CustomerType })));
const Headquarter = lazy(() => import('./maintenance/headquarter/Headquarter').then(module => ({ default: module.Headquarter })));
const TransportRate = lazy(() => import('./maintenance/transport-rate/TransportRate').then(module => ({ default: module.TransportRate })));

export const Private = () => {
    const dispatch = useDispatch();
    const menuState: Array<Menu> = useSelector((store: RootState) => store.menu);
    const sesionState: Session = useSelector((store: RootState) => store.session);

    const eventListenerResize = () => {
        const isMovile = calculateScreenSize();
        dispatch(modifyDevice(isMovile));
    };

    useEffect(() => {
        eventListenerResize();
        window.addEventListener('resize', eventListenerResize);

        httpGetPermissionsMenusByProfileId(sesionState.profile?.id ?? 0)
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
                <RoutesWithNotFound>
                    <Route path='/' element={<Navigate to={privateRoutes.HOME} />} />
                    <Route path={privateRoutes.HOME} element={<Home />} />
                    <>
                        {menuState.some(item => item.path === privateRoutes.QUOTER) && (
                            <Route
                                path={privateRoutes.QUOTER}
                                element={
                                    <QuoterState>
                                        <Quoter />
                                    </QuoterState>
                                }
                            />
                        )}
                        {menuState.some(item => item.path === privateRoutes.VEHICLES) &&
                            [privateRoutes.VEHICLES, `${privateRoutes.VEHICLES}/:lot`].map(item => (
                                <Route
                                    key={item}
                                    path={item}
                                    element={
                                        <VehicleState>
                                            <Vehicle />
                                        </VehicleState>
                                    }
                                />
                            ))}

                        {menuState.some(item => item.path === privateRoutes.APPOINTMENTS) && (
                            <Route path={privateRoutes.APPOINTMENTS} element={<Appointment />} />
                        )}

                        {menuState.some(item => item.path === privateRoutes.TRANSPORT_RATE) && (
                            <Route path={privateRoutes.TRANSPORT_RATE} element={<TransportRate />} />
                        )}

                        {menuState.some(item => item.path === privateRoutes.CUSTOMERS) && (
                            <Route path={privateRoutes.CUSTOMERS} element={<Customer />} />
                        )}

                        {menuState.some(item => item.path === privateRoutes.USERS) && (
                            <Route path={privateRoutes.USERS} element={<User />} />
                        )}

                        {menuState.some(item => item.path === privateRoutes.AUCTION) && (
                            <Route path={privateRoutes.AUCTION} element={<Auction />} />
                        )}

                        {menuState.some(item => item.path === privateRoutes.VEHICLE_TYPE) && (
                            <Route path={privateRoutes.VEHICLE_TYPE} element={<VehicleType />} />
                        )}

                        {menuState.some(item => item.path === privateRoutes.PROFILES) && (
                            <Route path={privateRoutes.PROFILES} element={<Profile />} />
                        )}

                        {menuState.some(item => item.path === privateRoutes.CUSTOMER_TYPE) && (
                            <Route path={privateRoutes.CUSTOMER_TYPE} element={<CustomerType />} />
                        )}

                        {menuState.some(item => item.path === privateRoutes.HEADQUARTERS) && (
                            <Route path={privateRoutes.HEADQUARTERS} element={<Headquarter />} />
                        )}
                    </>
                </RoutesWithNotFound>
            </div>
        </div>
    );
};

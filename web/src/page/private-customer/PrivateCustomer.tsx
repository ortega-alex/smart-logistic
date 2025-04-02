import icon from '@/assets/images/icon.png';
import { Icon, Notification, RoutesWithNotFound } from '@/components';
import { privateRoutes, publicRoutes } from '@/constants';
import { Customer } from '@/interfaces';
import { RootState } from '@/redux';
import { modifyDevice } from '@/redux/state';
import { resetSesionCustomer } from '@/redux/state/customer';
import { calculateScreenSize } from '@/utilities';
import { Avatar, Dropdown } from 'antd';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, useNavigate } from 'react-router-dom';

const CustomerOrders = lazy(() => import('./customer-orders').then(module => ({ default: module.CustomerOrders })));
const CustomerOrderDetail = lazy(() =>
    import('./customer-orders/CustomerOrderDetail').then(module => ({ default: module.CustomerOrderDetail }))
);

export const PrivateCustomer = () => {
    const sessionCustomerState: Customer = useSelector((store: RootState) => store.session_customer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlLogout = (item: any) => {
        if (item.key === '1') {
            dispatch(resetSesionCustomer());
            navigate(`/${publicRoutes.SING_IN_CUSTOMER}`, { replace: true });
        }
    };

    const eventListenerResize = () => {
        const isMovile = calculateScreenSize();
        dispatch(modifyDevice(isMovile));
    };

    useEffect(() => {
        window.addEventListener('resize', eventListenerResize);
        eventListenerResize();

        return () => window.removeEventListener('resize', eventListenerResize);
    }, []);

    return (
        <div className='flex flex-column vh-100'>
            <nav className='navbar bg-primary'>
                <div className='flex' style={{ height: 80 }}>
                    <Link to={`/${privateRoutes.PRIVATE_CUSTOMER}`} className='navbar-brand'>
                        <img src={icon} height='80' className='d-inline-block align-top' alt='' />
                    </Link>
                </div>
                <div className='navbar-nav'>
                    <Notification />
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: (
                                        <span>
                                            <Icon.Logout /> Cerrar Sesión
                                        </span>
                                    )
                                }
                            ],
                            onClick: handlLogout
                        }}
                        placement='bottomLeft'
                        arrow
                    >
                        <Avatar gap={3} size={50} className='bg-secondary'>
                            {String(sessionCustomerState.name).substring(0, 2).toUpperCase()}
                        </Avatar>
                    </Dropdown>
                </div>
            </nav>
            <RoutesWithNotFound>
                <Route path='/' element={<Navigate to={privateRoutes.CUSTOMER_ORDER} />} />
                <Route path={privateRoutes.CUSTOMER_ORDER} element={<CustomerOrders />} />
                <Route path={`${privateRoutes.CUSTOMER_ORDER_DETAIL}/:id`} element={<CustomerOrderDetail />} />
            </RoutesWithNotFound>
        </div>
    );
};

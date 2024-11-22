import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '@/models';
import { RootState } from '@/redux';

export const AuthGuard = () => {
    const sessionState = useSelector((state: RootState) => state.session);
    const sessionCustomerState = useSelector((state: RootState) => state.session_customer);
    const { pathname } = useLocation();

    if (sessionCustomerState.id_cliente > 0 && pathname.includes(privateRoutes.PRIVATE_CUSTOMER)) {
        return <Outlet />;
    }
    return sessionState.id_sesion > 0 ? <Outlet /> : <Navigate replace to={publicRoutes.SING_IN} />;
};

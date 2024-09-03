import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { publicRoutes } from '@/models';
import { RootState } from '@/redux';

export const AuthGuard = () => {
    const sessionState = useSelector((state: RootState) => state.session);
    return sessionState.id_sesion > 0 ? <Outlet /> : <Navigate replace to={publicRoutes.SING_IN} />;
};

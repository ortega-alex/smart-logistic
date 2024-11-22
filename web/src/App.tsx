import { AuthGuard } from '@/guards';
import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';
import React, { Suspense, lazy, useEffect } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route } from 'react-router-dom';
import { Loading, RoutesWithNotFound } from './components';
import { Interceptor } from './interceptors';
import { color, privateRoutes, publicRoutes } from './models';
import { store } from './redux';

const SingIn = lazy(() => import('@/page/sing-In/SingIn').then(module => ({ default: module.SingIn })));
const SingInCustomer = lazy(() => import('@/page/sing-in-customer/SingInCustomer').then(module => ({ default: module.SingInCustomer })));
const Private = lazy(() => import('@/page/private/Private').then(module => ({ default: module.Private })));
const PrivateCustomer = lazy(() => import('@/page/private-customer/PrivateCustomer').then(module => ({ default: module.PrivateCustomer })));

export const App = () => {
    useEffect(() => {
        Interceptor();
    }, []);

    return (
        <React.StrictMode>
            <Suspense fallback={<Loading />}>
                <Provider store={store}>
                    <ConfigProvider
                        locale={esEs}
                        theme={{
                            token: {
                                colorPrimary: color.primary,
                                colorError: color.danger
                            }
                        }}
                    >
                        <HashRouter>
                            <RoutesWithNotFound>
                                <Route path='/' element={<Navigate to={privateRoutes.PRIVATE} />} />
                                <Route path={publicRoutes.SING_IN} element={<SingIn />} />
                                <Route path={publicRoutes.SING_IN_CUSTOMER} element={<SingInCustomer />} />
                                <Route path={`/${publicRoutes.SING_IN_CUSTOMER}/:token`} element={<SingInCustomer />} />
                                <Route element={<AuthGuard />}>
                                    <Route path={`${privateRoutes.PRIVATE}/*`} element={<Private />} />
                                    <Route path={`${privateRoutes.PRIVATE_CUSTOMER}/*`} element={<PrivateCustomer />} />
                                </Route>
                            </RoutesWithNotFound>
                        </HashRouter>
                    </ConfigProvider>
                </Provider>
            </Suspense>
        </React.StrictMode>
    );
};

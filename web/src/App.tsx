import { AuthGuard } from '@/guards';
import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';
import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route } from 'react-router-dom';
import { Loading, RoutesWithNotFound } from './components';
import { color, privateRoutes, publicRoutes } from './models';
import { store } from './redux';

const SingIn = lazy(() => import('@/page/sing-In/SingIn').then(module => ({ default: module.SingIn })));

export const App = () => {
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
                                <Route element={<AuthGuard />}>
                                    <Route path={`${privateRoutes.PRIVATE}/*`} element={<>Private</>} />
                                </Route>
                            </RoutesWithNotFound>
                        </HashRouter>
                    </ConfigProvider>
                </Provider>
            </Suspense>
        </React.StrictMode>
    );
};

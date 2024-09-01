import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';
import React, { Suspense } from 'react';
import { HashRouter, Navigate, Route } from 'react-router-dom';
import { RoutesWithNotFound } from './components';
import { color, privateRoutes, publicRoutes } from './models';
import { Provider } from 'react-redux';
import { store } from './redux';
import { AuthGuard } from '@/guards';

export const App = () => {
    return (
        <React.StrictMode>
            <Suspense fallback={<>....Cargando</>}>
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
                                <Route path={publicRoutes.SING_IN} element={<>Sing-in</>} />
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

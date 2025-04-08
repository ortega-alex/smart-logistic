import { AuthGuard } from '@/guards';
import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';
import React, { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { Loading, RoutesWithNotFound } from './components';
import { privateRoutes, publicRoutes, color, _SERVER } from './constants';
import { Interceptor } from './interceptors';
import { store } from './redux';
import { ClienteToServerEvents, ServerToClientEvents } from './interfaces';

const SingIn = lazy(() => import('@/page/sing-In/SingIn').then(module => ({ default: module.SingIn })));
const SingInCustomer = lazy(() => import('@/page/sing-in-customer/SingInCustomer').then(module => ({ default: module.SingInCustomer })));
const ForgotPass = lazy(() => import('@/page/forgot-pass/ForgotPass').then(module => ({ default: module.ForgotPass })));
const Private = lazy(() => import('@/page/private/Private').then(module => ({ default: module.Private })));
const PrivateCustomer = lazy(() => import('@/page/private-customer/PrivateCustomer').then(module => ({ default: module.PrivateCustomer })));

export type SocketContextType = {
    socket: Socket<ServerToClientEvents, ClienteToServerEvents> | null;
};

export const socketContext = createContext<SocketContextType | null>(null);
export const App = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        try {
            const _socket: Socket<ServerToClientEvents, ClienteToServerEvents> = io(_SERVER.socketUrl, {
                transports: ['websocket'],
                auth: { id: 'web' }
            });
            setSocket(_socket);

            _socket.onAny((event, ...args) => {
                console.log(`📤 Emitted to server: ${event}`, args);
            });

            _socket.on('connect_error', err => {
                console.error('❌ connect_error', err);
            });
        } catch (error) {
            console.log('error socket', error);
        }
        Interceptor();

        return () => {
            if (socket) socket.disconnect();
            setSocket(null);
        };
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
                        <socketContext.Provider
                            value={{
                                socket
                            }}
                        >
                            <HashRouter>
                                <RoutesWithNotFound>
                                    <Route path='/' element={<Navigate to={privateRoutes.PRIVATE} />} />
                                    <Route path={publicRoutes.SING_IN} element={<SingIn />} />
                                    <Route path={publicRoutes.SING_IN_CUSTOMER} element={<SingInCustomer />} />
                                    <Route path={`/${publicRoutes.SING_IN_CUSTOMER}/:token`} element={<SingInCustomer />} />
                                    <Route path={publicRoutes.FORGOT_PASS} element={<ForgotPass />} />
                                    <Route element={<AuthGuard />}>
                                        <Route path={`${privateRoutes.PRIVATE}/*`} element={<Private />} />
                                        <Route path={`${privateRoutes.PRIVATE_CUSTOMER}/*`} element={<PrivateCustomer />} />
                                    </Route>
                                </RoutesWithNotFound>
                            </HashRouter>
                        </socketContext.Provider>
                    </ConfigProvider>
                </Provider>
            </Suspense>
        </React.StrictMode>
    );
};

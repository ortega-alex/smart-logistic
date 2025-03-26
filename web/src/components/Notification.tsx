import { useSocket } from '@/hooks';
import { Customer, privateRoutes, Notification as TypeNotification, User, VehiclesNotification } from '@/models';
import { RootState } from '@/redux';
import {
    // httpEditCustomer,
    // httpEditUser,
    httpGetNotificationByCustomerId,
    httpGetNotificationByUserId,
    httpUpdateNotification
    // onMessageListener,
    // requestForToken
} from '@/services';
import { durationInDaysBetweenDateHumanize, getDateFromString } from '@/utilities';
import { Badge, Button, message, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from './Icon';
import { Loader } from './Loading';

export const Notification = () => {
    const sessionState: User = useSelector((store: RootState) => store.session);
    const sessionCustomerState: Customer = useSelector((store: RootState) => store.session_customer);
    const { socket } = useSocket();
    // const [api, contextHolder] = notification.useNotification();

    const [notifications, setNotifications] = useState<TypeNotification[]>([]);
    const [loading, setLoading] = useState(false);

    const handleNavigate = (vehicle: VehiclesNotification) => {
        let path;
        if (sessionState.id_usuario > 0) path = `${privateRoutes.PRIVATE}/${privateRoutes.VEHICLES}/${vehicle.lote}`;
        if (sessionCustomerState.id_cliente > 0)
            path = `${privateRoutes.PRIVATE_CUSTOMER}/${privateRoutes.CUSTOMER_ORDER_DETAIL}/${vehicle.id_vehiculo}`;
        window.open(`${window.location.origin}/#/${path}`, '_blank');
    };

    const handleUpdateNotification = async (notificacion: TypeNotification) => {
        try {
            setLoading(true);
            if (!notificacion.visto) {
                await httpUpdateNotification(notificacion.id_notificacion);
                handleGetNotifications();
            }
            if (sessionState.id_usuario && notificacion.vehiculo) handleNavigate(notificacion.vehiculo);
            if (sessionCustomerState.id_cliente && notificacion.cliente && notificacion.vehiculo) handleNavigate(notificacion.vehiculo);
        } catch (error) {
            message.error(`Error http update notification: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const renderNotification = () => {
        return (
            <div className='vhm-75 overflow-y'>
                {loading && <Loader />}
                <div className='flex flex-column'>{notifications.length === 0 && <p>No tienes notificaciones</p>}</div>
                {notifications.map((item, i) => (
                    <div key={i} className={`notification-item ${i % 2 === 0 ? 'bg-white' : 'bg-gray'} flex flex-column`}>
                        <Badge count={!item.visto ? 1 : 0} dot={!item.visto}></Badge>
                        <div className='flex justify-between'>
                            <strong style={{ color: item.prioridad }}> {item.titulo}</strong>
                            <small>
                                <b>{durationInDaysBetweenDateHumanize(getDateFromString(item.fecha_creacion))}</b>
                            </small>
                        </div>
                        <div> {item.contenido}</div>
                        {(item.vehiculo || !item.visto) && (
                            <div className='text-right'>
                                <Button size='small' type='link' color='cyan' onClick={() => handleUpdateNotification(item)}>
                                    {item.vehiculo ? 'Ir' : 'Visto!'}
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const handleGetNotifications = async () => {
        try {
            setLoading(true);
            let res;
            if (sessionState.id_usuario) res = await httpGetNotificationByUserId(sessionState.id_usuario);
            if (sessionCustomerState.id_cliente) res = await httpGetNotificationByCustomerId(sessionCustomerState.id_cliente);
            setNotifications(res);
        } catch (error) {
            message.error(`Error http get notifications: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    // const handleGetToken_fcm = async () => {
    //     try {
    //         const token = await requestForToken();
    //         if (sessionState.id_usuario > 0) await httpEditUser({ ...sessionState, token_fcm: token });
    //         if (sessionCustomerState.id_cliente > 0) await httpEditCustomer({ ...sessionCustomerState, token_fcm: token });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        handleGetNotifications();
        if (socket) {
            if (sessionState.id_usuario) {
                socket.on('notification', notifications => {
                    console.log('para todos', notifications.titulo);
                    handleGetNotifications();
                });

                socket.on(`notification-${sessionState.id_usuario}`, notifications => {
                    console.log('por usuario', notifications.titulo);
                    handleGetNotifications();
                });
            }

            if (sessionCustomerState.id_cliente) {
                socket.on(`notification-${sessionCustomerState.id_cliente}`, notifications => {
                    console.log('por cliente', notifications.titulo);
                    handleGetNotifications();
                });
            }
        }

        // handleGetToken_fcm();
        // onMessageListener().then((payload: any) => {
        //     console.log(payload?.data.key);
        //     api.open({
        //         type: 'info',
        //         message: payload?.notification?.title ?? 'Nueva Notificacion',
        //         description: payload?.notification?.body ?? 'Nueva Notificacion',
        //         showProgress: true,
        //         pauseOnHover: true,
        //         placement: 'bottomRight',
        //         btn: payload?.data && (
        //             <Button onClick={() => handleNavigate({ lote: payload?.data?.lote, id_vehiculo: payload?.data?.id })}>Ver</Button>
        //         )
        //     });
        // });
    }, []);

    return (
        <>
            {/* contextHolder */}
            <Popover content={renderNotification}>
                <Badge count={notifications.filter(item => !item.visto).length} className='mr-3'>
                    <Icon.Bell color='white' size={32} />
                </Badge>
            </Popover>
        </>
    );
};

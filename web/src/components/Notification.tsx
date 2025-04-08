import { _SERVER, NotificationPriorityLabel, privateRoutes } from '@/constants';
import { useSocket } from '@/hooks';
import { Customer, Notification as NotificationInterface, NotificationPriority, Session } from '@/interfaces';
import { RootState } from '@/redux';
import {
    httpEditCustomer,
    httpEditUser,
    httpGetNotificationByCustomerId,
    httpGetNotificationByUserId,
    httpUpdateNotification,
    onMessageListener,
    requestForToken
} from '@/services';
import { durationInDaysBetweenDateHumanize, getDateFromString } from '@/utilities';
import { Badge, Button, message, Modal, notification as NotificationAnt, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from './Icon';
import { Loader } from './Loading';

export const NotificationEmpty = {
    id: '',
    title: '',
    description: '',
    priority: NotificationPriority.LOW,
    seen: false,
    is_active: true,
    created_at: ''
};

export const Notification = () => {
    const sessionState: Session = useSelector((store: RootState) => store.session);
    const sessionCustomerState: Customer = useSelector((store: RootState) => store.session_customer);
    const deviceState = useSelector((store: RootState) => store.device);
    const { socket } = useSocket();
    const [api, contextHolder] = NotificationAnt.useNotification();

    const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
    const [notification, setNotification] = useState<NotificationInterface>(NotificationEmpty);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [popover, setPopover] = useState(false);

    const handleNavigate = (path: string) => {
        const _path = sessionState.session_id > 0 ? `${privateRoutes.PRIVATE}/${path}` : `${privateRoutes.PRIVATE_CUSTOMER}/${path}`;
        window.open(`${window.location.origin}/#/${_path}`, '_blank');
    };

    const handleSeenNotification = async (notificacion: NotificationInterface) => {
        try {
            setPopover(false);
            if (!notificacion.seen) {
                const _notifications = [...notifications];
                await httpUpdateNotification(notificacion.id);
                setNotifications([
                    ..._notifications.map(item => {
                        if (item.id === notificacion.id) return { ...item, seen: true };
                        return item;
                    })
                ]);
            }
            setNotification(notificacion);
            setModal(true);
        } catch (error) {
            message.error(`Error http update notification: ${(error as Error).message}`);
        }
    };

    const renderNotification = () => {
        return (
            <div className='vhm-75 overflow-y'>
                {loading && <Loader />}
                <div className='flex flex-column'>{notifications.length === 0 && <p>No tienes notificaciones</p>}</div>
                {notifications.map((item, i) => (
                    <div
                        key={i}
                        className={`notification-item ${i % 2 === 0 ? 'bg-white' : 'bg-gray'} flex flex-column`}
                        onClick={() => handleSeenNotification(item)}
                    >
                        <Badge.Ribbon color={item.priority} text={NotificationPriorityLabel[item.priority as NotificationPriority]} />
                        <h3 className='text-capitalize mt-4 mb-0'> {item.title}</h3>
                        <div>
                            {item.description.slice(0, 50)} {item.description.length > 50 && '...'}
                        </div>
                        <div className='flex justify-end gap-1'>
                            <small>
                                <b>{durationInDaysBetweenDateHumanize(getDateFromString(item.created_at))}</b>
                            </small>
                            <Button
                                size='small'
                                type='link'
                                icon={item.seen ? <Icon.DoneAll color='green' /> : <Icon.Done color='gray' />}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const handleGetNotifications = async () => {
        try {
            setLoading(true);
            let res;
            if (sessionState.session_id) res = await httpGetNotificationByUserId(sessionState.session_id);
            if (sessionCustomerState.id) res = await httpGetNotificationByCustomerId(sessionCustomerState.id);
            setNotifications(res);
        } catch (error) {
            message.error(`Error http get notifications: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGetToken_fcm = async () => {
        try {
            const token = await String(requestForToken());
            if (sessionState.session_id > 0) await httpEditUser({ ...sessionState, token_fcm: token });
            if (sessionCustomerState.id > 0) await httpEditCustomer({ ...sessionCustomerState, token_fcm: token });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetNotifications();
        if (socket) {
            socket.on('notification', () => handleGetNotifications());
            if (sessionState.session_id) socket.on(`notification-${sessionState.session_id}`, () => handleGetNotifications());
            if (sessionCustomerState.id)
                socket.on(`notification-${sessionCustomerState.id}`, () => {
                    console.log('notificaciones para el cliente');
                    handleGetNotifications();
                });
        }
        if (window.location.protocol === 'https:' || _SERVER.NODE_ENV === 'development') {
            handleGetToken_fcm();
            onMessageListener().then((payload: any) => {
                api.open({
                    type: 'info',
                    message: payload?.notification?.title ?? 'Nueva Notificacion',
                    description: payload?.notification?.body ?? 'Nueva Notificacion',
                    showProgress: true,
                    pauseOnHover: true,
                    placement: 'bottomRight',
                    btn: payload?.data?.path && <Button onClick={() => handleNavigate(payload.data.path)}>Ver</Button>
                });
            });
        }
    }, []);

    return (
        <>
            {contextHolder}
            <Popover
                content={renderNotification}
                trigger={deviceState ? 'click' : 'hover'}
                open={popover}
                onOpenChange={value => setPopover(value)}
            >
                <Badge count={notifications.filter(item => !item.seen).length} className='mr-3'>
                    <Icon.Bell color='white' size={32} />
                </Badge>
            </Popover>
            <Modal title={<h3>Notificación</h3>} open={modal} onCancel={() => setModal(false)} footer={null} centered>
                <div className='flex flex-column'>
                    <div className='flex justify-statr gap-2'>
                        <div className='flex gap-1'>
                            <strong>Prioridad:</strong>
                            <span>{NotificationPriorityLabel[notification.priority]}</span>
                        </div>
                        <div className='flex gap-1'>
                            <strong>Fecha:</strong>
                            <span>{notification.created_at}</span>
                        </div>
                    </div>

                    <div>
                        <strong>Titulo:</strong>
                        <h3 className='text-capitalize'> {notification.title} </h3>
                    </div>

                    <div>
                        <strong>Descripción:</strong>
                        <p>{notification.description}</p>
                    </div>

                    {notification.path && (
                        <div className='text-right'>
                            <Button onClick={() => handleNavigate(String(notification.path))}>Ir</Button>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

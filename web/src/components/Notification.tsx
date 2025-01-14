import { privateRoutes, Notification as TypeNotification, User } from '@/models';
import { RootState } from '@/redux';
import { httpGetNotificationByUserId, httpUpdateNotification } from '@/services';
import { durationInDaysBetweenDateHumanize, getDateFromString } from '@/utilities';
import { Badge, Button, message, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icon';
import { Loader } from './Loading';

export const Notification = () => {
    const sessionState: User = useSelector((store: RootState) => store.session);
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState<TypeNotification[]>([]);
    const [loading, setLoading] = useState(false);

    const handleUpdateNotification = async (notificacion: TypeNotification) => {
        try {
            setLoading(true);
            if (!notificacion.visto) {
                await httpUpdateNotification(notificacion.id_notificacion);
                handleGetNotifications();
            }
            if (notificacion.vehicle) navigate(`/${privateRoutes.VEHICLES}/${notificacion.vehicle.lote}`);
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
                        {(item.vehicle || !item.visto) && (
                            <div className='text-right'>
                                <Button size='small' type='link' color='cyan' onClick={() => handleUpdateNotification(item)}>
                                    {item.vehicle ? 'Ir' : 'Visto!'}
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const handleGetNotifications = () => {
        httpGetNotificationByUserId(sessionState.id_usuario)
            .then(res => setNotifications(res))
            .catch(err => message.error(`Error http get notifications: ${err.message}`));
    };

    useEffect(() => {
        handleGetNotifications();
    }, []);

    return (
        <Popover content={renderNotification}>
            <Badge count={notifications.filter(item => !item.visto).length} className='mr-3'>
                <Icon.Bell color='white' size={32} />
            </Badge>
        </Popover>
    );
};

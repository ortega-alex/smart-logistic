import { Icon } from '@/components';
import { privateRoutes } from '@/models';
import { Link } from 'react-router-dom';

const menus = [
    {
        name: 'Cotizador',
        icon: <Icon.Calculate size='32%' />,
        path: 'quoter',
        type: 1
    },
    {
        name: 'Vehiculos',
        icon: <Icon.Car size='32%' />,
        path: privateRoutes.VEHICLES,
        type: 1
    },
    {
        name: 'Clientes',
        icon: <Icon.Users size='32%' />,
        path: 'customers',
        type: 1
    },
    {
        name: 'Usuario',
        icon: <Icon.User size='32%' />,
        path: 'users',
        type: 1
    },
    {
        name: 'Gruas',
        icon: <Icon.Crane size='32%' />,
        path: 'crane',
        type: 1
    },
    {
        name: 'Puertos',
        icon: <Icon.Store size='32%' />,
        path: 'ports',
        type: 2
    },
    {
        name: 'Tipos de vehiculos',
        icon: <Icon.Car2 size='32%' />,
        path: 'customers',
        type: 2
    },
    {
        name: 'Perfiles',
        icon: <Icon.Profile size='32%' />,
        path: 'profiles',
        type: 2
    },
    {
        name: 'Reportes',
        icon: <Icon.Report size='32%' />,
        path: 'reports',
        type: 2
    }
];

export const Home = () => {
    return (
        <div className='h-100 bg-secondary text-danger flex flex-1 justify-center items-center flex-column'>
            <h1>Bienvenido</h1>
            {[1, 2].map(item => (
                <div className={`flex ${item === 2 ? 'menu-bottom' : ''}`} key={item}>
                    {menus
                        .filter(_item => _item.type === item)
                        .map((menu, i) => (
                            <Link to={`/${privateRoutes.PRIVATE}/${menu.path}`} replace={true} key={i} style={{ textDecoration: 'none' }}>
                                <div className='hex-container zoom'>
                                    <div className='hex-border'>
                                        <div className='hex-button '>
                                            <span style={{ fontSize: '1.5dvh' }}>{menu.name}</span>
                                            {menu.icon}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            ))}
        </div>
    );
};

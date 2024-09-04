import icon from '@/assets/images/icon.png';
import { color, privateRoutes, publicRoutes, Sesion } from '@/models';
import { resetSesion, RootState } from '@/redux';
import { Avatar, Badge, Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icon';

export const Navbar = () => {
    const sessionState: Sesion = useSelector((store: RootState) => store.session);
    const deviceState: Boolean = useSelector((store: RootState) => store.device);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [drawer, setDrawer] = useState(false);
    const [show, setShow] = useState(false);
    const [sideMenu, setSideMenu] = useState(false);

    const handleNavigation = (path: string) => {
        navigate(path);
        setSideMenu(false);
    };

    useEffect(() => {
        setShow(pathname === `/${privateRoutes.PRIVATE}/${privateRoutes.HOME}`);
    }, [pathname]);

    return (
        <>
            <nav className='navbar navbar-dark'>
                <div className='flex' style={{ height: 80 }}>
                    {deviceState ? (
                        <div className='flex justify-center items-center ml-3'>
                            <Button
                                icon={<Icon.MenuFold size={32} color='white' />}
                                type='text'
                                htmlType='button'
                                onClick={() => setSideMenu(true)}
                            />
                        </div>
                    ) : (
                        <Link to='/' className='navbar-brand'>
                            <img src={icon} height='80' className='d-inline-block align-top' alt='' />
                        </Link>
                    )}
                </div>

                {!show && !deviceState && (
                    <div className='flex-1 flex justify-end text-white'>
                        <Link to={privateRoutes.VEHICLES} style={{ color: color.white, textDecoration: 'none' }}>
                            <span className='text-white'>Vehiculos</span>
                        </Link>
                    </div>
                )}

                <div className='navbar-nav'>
                    <Badge count='1' className='mr-3'>
                        <Icon.Bell color='white' size={32} />
                    </Badge>
                    <Avatar gap={3} size={50} className='bg-primary' onClick={() => setDrawer(true)}>
                        {sessionState.iniciales}
                    </Avatar>
                </div>
            </nav>
            <Drawer
                className='bg-secondary'
                placement='left'
                onClose={() => setSideMenu(false)}
                closeIcon={null}
                open={sideMenu}
                width={200}
            >
                <div className='flex flex-column text-white'>
                    <Link to='/' className='navbar-brand'>
                        <img src={icon} height='80' className='d-inline-block align-top' alt='' />
                    </Link>
                    <Button
                        type='link'
                        icon={<Icon.Car color='white' />}
                        htmlType='button'
                        onClick={() => handleNavigation(privateRoutes.VEHICLES)}
                    >
                        <span className='text-white'>Vehiculos</span>
                    </Button>
                </div>
            </Drawer>
            <Drawer
                className='bg-secondary'
                placement='right'
                onClose={() => setDrawer(false)}
                closeIcon={null}
                open={drawer}
                width={200}
                styles={{ footer: { border: 'none' }, body: { border: 'none' } }}
                footer={
                    <div className='flex flex-column gap-3'>
                        <Button htmlType='button' type='primary' ghost>
                            Cambiar Contraseña
                        </Button>
                        <Button
                            htmlType='button'
                            type='primary'
                            block
                            onClick={() => {
                                dispatch(resetSesion());
                                navigate(`/${publicRoutes.SING_IN}`, { replace: true });
                            }}
                            icon={<Icon.Logout />}
                        >
                            Cerrar Sesión
                        </Button>
                    </div>
                }
            >
                <div className='flex flex-column justify-center items-center text-white'>
                    <Avatar gap={3} size={100} className='bg-primary'>
                        {sessionState.iniciales}
                    </Avatar>

                    <strong className='mt-3'>{sessionState.nombre}</strong>
                    <span>{sessionState.usuario}</span>
                    <span>{sessionState.perfil?.perfil}</span>
                </div>
            </Drawer>
        </>
    );
};

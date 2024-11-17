import icon from '@/assets/images/icon.png';
import { color, Menu, privateRoutes, publicRoutes, Sesion } from '@/models';
import { resetSesion, RootState } from '@/redux';
import { Avatar, Badge, Button, Drawer, Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icon';

export const Navbar = () => {
    const sessionState: Sesion = useSelector((store: RootState) => store.session);
    const deviceState: Boolean = useSelector((store: RootState) => store.device);
    const menuState: Array<Menu> = useSelector((store: RootState) => store.menu);
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
                    <div className='flex-1 flex justify-end text-white gap-3 mr-3'>
                        {menuState.some(item => item.path === 'QUOTER') && (
                            <Link to={privateRoutes.QUOTER} style={{ color: color.white, textDecoration: 'none' }}>
                                <span className='text-white'>Cotizador</span>
                            </Link>
                        )}
                        {menuState.some(item => item.path === 'VEHICLES') && (
                            <Link to={privateRoutes.VEHICLES} style={{ color: color.white, textDecoration: 'none' }}>
                                <span className='text-white'>Vehiculos</span>
                            </Link>
                        )}
                        {menuState.some(item => item.es_mantenimiento) && (
                            <Dropdown
                                menu={{
                                    items: menuState
                                        .filter(item => item.es_mantenimiento)
                                        .map(item => ({
                                            key: item.id_menu,
                                            label: (
                                                <Link to={privateRoutes[item.path]} style={{ textDecoration: 'none' }}>
                                                    <span>{item.menu}</span>
                                                </Link>
                                            )
                                        }))
                                }}
                                placement='bottomLeft'
                                arrow
                            >
                                <Button type='text' htmlType='button' className='text-white' size='small'>
                                    <span>Mantenimietos</span>
                                    <Icon.AngleDown />
                                </Button>
                            </Dropdown>
                        )}
                        {menuState.some(item => item.path === 'REPORTS') && (
                            <Link to={privateRoutes.REPORTS} style={{ color: color.white, textDecoration: 'none' }}>
                                <span className='text-white'>Reporte</span>
                            </Link>
                        )}
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

                    {menuState.some(item => item.path === 'QUOTER') && (
                        <Button
                            type='link'
                            icon={<Icon.Calculate color='white' />}
                            htmlType='button'
                            className='text-left'
                            block
                            onClick={() => handleNavigation(privateRoutes.QUOTER)}
                        >
                            <span className='text-white'>Cotizador</span>
                        </Button>
                    )}

                    {menuState.some(item => item.path === 'VEHICLES') && (
                        <Button
                            type='link'
                            icon={<Icon.Car color='white' />}
                            htmlType='button'
                            className='text-left'
                            block
                            onClick={() => handleNavigation(privateRoutes.VEHICLES)}
                        >
                            <span className='text-white'>Vehiculos</span>
                        </Button>
                    )}

                    {menuState.some(item => item.es_mantenimiento) && (
                        <Dropdown
                            menu={{
                                items: menuState
                                    .filter(item => item.es_mantenimiento)
                                    .map(item => ({
                                        key: item.path,
                                        label: <span>{item.menu}</span>
                                    })),
                                onClick: value => handleNavigation(privateRoutes[value.key])
                            }}
                            placement='bottomLeft'
                            arrow
                        >
                            <Button type='text' htmlType='button' className='text-white' size='small'>
                                <span>Mantenimietos</span>
                                <Icon.AngleDown />
                            </Button>
                        </Dropdown>
                    )}

                    {menuState.some(item => item.path === 'REPORTS') && (
                        <Button
                            type='link'
                            icon={<Icon.Report color='white' />}
                            htmlType='button'
                            className='text-left'
                            block
                            onClick={() => handleNavigation(privateRoutes.REPORTS)}
                        >
                            <span className='text-white'>Reportes</span>
                        </Button>
                    )}
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

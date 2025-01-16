import icon from '@/assets/images/icon.png';
import { color, Menu, privateRoutes, publicRoutes, Sesion } from '@/models';
import { resetSesion, RootState } from '@/redux';
import { httpResetPassword } from '@/services';
import { passwordIsValid } from '@/utilities';
import { Avatar, Button, Drawer, Dropdown, Form, FormProps, Input, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon, Notification } from './';

export const Navbar = () => {
    const sessionState: Sesion = useSelector((store: RootState) => store.session);
    const deviceState: Boolean = useSelector((store: RootState) => store.device);
    const menuState: Array<Menu> = useSelector((store: RootState) => store.menu);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [form] = Form.useForm();

    const [drawer, setDrawer] = useState(false);
    const [show, setShow] = useState(false);
    const [sideMenu, setSideMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const [showPass, setshowPass] = useState({
        password: false,
        confirmPassword: false
    });
    const [loading, setloading] = useState(false);

    const handleNavigation = (path: string) => {
        navigate(path);
        setSideMenu(false);
    };

    const handleValidatePassword = async (name: string, value: string) => {
        let error = null;
        if (name === 'password') error = await passwordIsValid(value);
        else {
            const password = form.getFieldValue('password');
            error = password !== value ? `La contraseña no coincide` : null;
        }
        if (error) throw new Error(error);
    };

    const handleSubmitResetPassword: FormProps<any>['onFinish'] = async values => {
        setloading(true);
        httpResetPassword(sessionState.id_sesion, values)
            .then(res => {
                message[res.success ? 'success' : 'error'](res.message);
                if (res.success) setModal(false);
            })
            .catch(err => message.error(`Error http reset password: ${err.message}`))
            .finally(() => setloading(false));
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
                        {menuState.some(item => item.path === privateRoutes.QUOTER) && (
                            <Link to={privateRoutes.QUOTER} style={{ color: color.white, textDecoration: 'none' }}>
                                <span className='text-white'>Cotizador</span>
                            </Link>
                        )}
                        {menuState.some(item => item.path === privateRoutes.VEHICLES) && (
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
                                                <Link to={item.path} style={{ textDecoration: 'none' }}>
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
                    <Notification />
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

                    {menuState.some(item => item.path === privateRoutes.QUOTER) && (
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

                    {menuState.some(item => item.path === privateRoutes.VEHICLES) && (
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
                                onClick: value => handleNavigation(value.key)
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
                        <Button htmlType='button' type='primary' ghost onClick={() => setModal(true)}>
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

            <Modal title='Cambiar Contraseña' open={modal} onCancel={() => setModal(false)} footer={null} centered destroyOnClose={true}>
                <Form layout='vertical' onFinish={handleSubmitResetPassword} form={form}>
                    <Form.Item
                        label='Contraseña'
                        name='password'
                        rules={[{ required: true, validator: (_, value) => handleValidatePassword('password', value) }]}
                    >
                        <Input
                            placeholder='Ingrese una contraseña'
                            type={showPass.password ? 'text' : 'password'}
                            autoCapitalize='off'
                            autoComplete='off'
                            prefix={<Icon.Lock />}
                            suffix={
                                <Button
                                    size='small'
                                    type='text'
                                    onClick={() => setshowPass({ ...showPass, password: !showPass.password })}
                                    icon={showPass.password ? <Icon.EyeSlash /> : <Icon.Eye />}
                                />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label='Confirmar Contraseña'
                        name='confirmPassword'
                        rules={[{ required: true, validator: (_, value) => handleValidatePassword('confirmPassword', value) }]}
                    >
                        <Input
                            type={showPass.confirmPassword ? 'text' : 'password'}
                            placeholder='Ingrese una contraseña'
                            autoCapitalize='off'
                            autoComplete='off'
                            prefix={<Icon.Lock />}
                            suffix={
                                <Button
                                    size='small'
                                    type='text'
                                    onClick={() => setshowPass({ ...showPass, confirmPassword: !showPass.confirmPassword })}
                                    icon={showPass.confirmPassword ? <Icon.EyeSlash /> : <Icon.Eye />}
                                />
                            }
                        />
                    </Form.Item>
                    <div className='text-right'>
                        <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                            Cambiar Contraseña
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

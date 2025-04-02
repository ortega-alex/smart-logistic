import { sessionAdapter } from '@/adapter';
import logoBrand from '@/assets/images/logo-brand.png';
import logo from '@/assets/images/logo.png';
import { Icon } from '@/components';
import { privateRoutes, publicRoutes } from '@/constants';
import { Loogin } from '@/interfaces';
import { setSession } from '@/redux';
import { httpLogin } from '@/services';
import { Button, Form, FormProps, Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SingIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPass, setshowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<Loogin>['onFinish'] = values => {
        setLoading(true);
        httpLogin(values)
            .then(res => {
                if (res.message) message.warning(res.message);
                else {
                    dispatch(setSession({ session: sessionAdapter(res.session), token: res.token }));
                    navigate(`/${privateRoutes.PRIVATE}`, { replace: true });
                }
            })
            .catch(err => message.error(`Error http login: ${err.message}`))
            .finally(() => setLoading(false));
    };

    return (
        <div className='login-container'>
            <img src={logoBrand} alt='logo' width={180} />
            <div className='flex-1 flex justify-center items-center'>
                <div className='card shadow-lg'>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <div className='text-center'>
                            <img src={logo} alt='logo' width={150} />
                        </div>
                        <Form.Item label='Usuario' name='username' rules={[{ required: true, message: 'El usuario es requerido' }]}>
                            <Input placeholder='Ingrese un usuario' autoFocus prefix={<Icon.User />} autoCapitalize='off' />
                        </Form.Item>
                        <Form.Item label='Contraseña' name='password' rules={[{ required: true, message: 'El usuario es requerido' }]}>
                            <Input
                                placeholder='Ingrese una contraseña'
                                type={showPass ? 'text' : 'password'}
                                autoCapitalize='off'
                                autoComplete='off'
                                prefix={<Icon.Lock />}
                                suffix={
                                    <Button
                                        size='small'
                                        type='text'
                                        onClick={() => setshowPass(!showPass)}
                                        icon={showPass ? <Icon.EyeSlash /> : <Icon.Eye />}
                                    />
                                }
                            />
                        </Form.Item>
                        <Button
                            block
                            type='link'
                            htmlType='button'
                            disabled={loading}
                            onClick={() => navigate(`/${publicRoutes.FORGOT_PASS}`, { replace: true })}
                        >
                            Olvidé la contraseña
                        </Button>
                        <Button block type='primary' htmlType='submit' loading={loading} disabled={loading}>
                            Iniciar Sesión
                        </Button>

                        <div className='text-right mt-5'>
                            <Button
                                type='primary'
                                ghost
                                size='small'
                                htmlType='button'
                                loading={loading}
                                onClick={() => navigate(`/${publicRoutes.SING_IN_CUSTOMER}`, { replace: true })}
                            >
                                Soy cliente
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <footer>
                <p className='w-100 text-center'>
                    <small> Copyright &copy; 2024 ays-saavedra.com</small>
                </p>
            </footer>
        </div>
    );
};

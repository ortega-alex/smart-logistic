import { sessionAdapter } from '@/adapter';
import logo from '@/assets/images/logo.png';
import { Icon } from '@/components';
import { Login, privateRoutes } from '@/models';
import { setSession } from '@/redux';
import { httpLogin } from '@/services/user.service';
import { Button, Form, FormProps, Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SingIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPass, setshowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<Login>['onFinish'] = values => {
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
            <div className='card shadow-lg'>
                <Form layout='vertical' onFinish={handleSubmit}>
                    <div className='text-center'>
                        <img src={logo} alt='logo' width={150} />
                    </div>
                    <Form.Item label='Usuario' name='usuario' rules={[{ required: true, message: 'El usuario es requerido' }]}>
                        <Input placeholder='Ingrese un usuario' autoFocus prefix={<Icon.User />} />
                    </Form.Item>
                    <Form.Item label='Contraseña' name='contrasenia' rules={[{ required: true, message: 'El usuario es requerido' }]}>
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
                    <Button block type='link' htmlType='button' disabled={loading}>
                        Olvidé la contraseña
                    </Button>
                    <Button block type='primary' htmlType='submit' loading={loading} disabled={loading}>
                        Iniciar Sesión
                    </Button>
                </Form>
            </div>
        </div>
    );
};
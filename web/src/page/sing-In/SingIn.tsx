import { Button, Form, FormRule, Input } from 'antd';
import logo from '@/assets/images/logo.png';
import { Icon } from '@/components';
import { useState } from 'react';

export const SingIn = () => {
    const [showPass, setshowPass] = useState(false);

    const handleSubmit = (values: FormRule) => {
        console.log(values);
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
                    <Button block type='link' htmlType='button'>
                        Olvidé la contraseña
                    </Button>
                    <Button block type='primary' htmlType='submit'>
                        Iniciar Sesión
                    </Button>
                </Form>
            </div>
        </div>
    );
};

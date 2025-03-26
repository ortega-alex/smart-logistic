import logoBrand from '@/assets/images/logo-brand.png';
import logo from '@/assets/images/logo.png';
import { Icon } from '@/components';
import { UserForgotPassword } from '@/models';
import { httpForgotPassword, httpResetPassword } from '@/services';
import { Button, Form, FormProps, Input, InputNumber, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgotPass = () => {
    const navigate = useNavigate();

    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<number>(0);

    const handleSubmit: FormProps<UserForgotPassword>['onFinish'] = async values => {
        try {
            setLoading(true);
            if (code === '') {
                const res = await httpForgotPassword(values);
                if (res.code) {
                    message.info(res.message);
                    setCode(res.code);
                    setUserId(res.user_id);
                } else message.warning(res.message);
            } else {
                if (values.codigo !== code) return message.error('El codigo es incorrecto');
                const res = await httpResetPassword(userId, values);
                message[res.success ? 'success' : 'warning'](res.message);
                if (res.success) navigate(-1);
            }
        } catch (error) {
            message.error(`Error http forgot password: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-container'>
            <img src={logoBrand} alt='logo' width={180} />
            <div className='flex-1 flex justify-center items-center'>
                <div className='card shadow-lg'>
                    <div className='text-center'>
                        <img src={logo} alt='logo' width={150} />
                    </div>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item label='Correo' name='correo' rules={[{ required: true, message: 'El correo es requerido' }]}>
                            <Input placeholder='Ingrese un correo' type='EMail' autoFocus prefix={<Icon.EMail />} autoCapitalize='off' />
                        </Form.Item>
                        {code !== '' && (
                            <Form.Item label='Codigo' name='codigo' rules={[{ required: true, message: 'El codigo es requerido' }]}>
                                <InputNumber placeholder='Ingrese un codigo' autoFocus className='w-100' />
                            </Form.Item>
                        )}

                        <Button type='link' htmlType='button' block onClick={() => navigate(-1)} loading={loading} disabled={loading}>
                            Regresar
                        </Button>
                        <Button type='primary' htmlType='submit' block>
                            {code === '' ? 'Validar' : 'Restablecer'}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

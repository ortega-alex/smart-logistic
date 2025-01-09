import logoBrand from '@/assets/images/logo-brand.png';
import logo from '@/assets/images/logo.png';
import { Icon } from '@/components';
import { OnlyEmail, privateRoutes, publicRoutes } from '@/models';
import { setSessionCustomer } from '@/redux/state/customer';
import { httpCustomerLogin } from '@/services';
import { Button, Form, FormProps, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const SingInCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<OnlyEmail>['onFinish'] = values => {
        setLoading(true);
        httpCustomerLogin(values)
            .then(res => {
                if (res.message) message.warning(res.message);
                else {
                    message.success(`Bienvenido ${res.customer.cliente}`);
                    dispatch(setSessionCustomer({ session: res.customer, token: res.token }));
                    navigate(`/${privateRoutes.PRIVATE_CUSTOMER}`, { replace: true });
                }
            })
            .catch(err => message.error(`Error http login customer: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (token) {
            const data = window.atob(token);
            const values = JSON.parse(data);
            handleSubmit(values);
        }
    }, []);

    return (
        <div className='login-container-customer'>
            <img src={logoBrand} alt='logo' width={150} />
            <div className='flex-1 flex justify-center items-center'>
                <div className='card-customer shadow-lg'>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <div className='text-center'>
                            <img src={logo} alt='logo' width={180} />
                        </div>
                        <Form.Item label='Correo' name='correo' rules={[{ required: true, message: 'El correo es requerido' }]}>
                            <Input placeholder='Ingrese un correo' type='EMail' autoFocus prefix={<Icon.EMail />} autoCapitalize='off' />
                        </Form.Item>
                        <Button
                            block
                            type='link'
                            htmlType='button'
                            loading={loading}
                            disabled={loading}
                            onClick={() => navigate(`/${publicRoutes.SING_IN}`, { replace: true })}
                        >
                            Soy usuario
                        </Button>
                        <Button block type='primary' htmlType='submit' loading={loading} disabled={loading}>
                            Iniciar Sesión
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

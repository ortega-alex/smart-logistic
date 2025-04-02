import { CustomerType } from '@/interfaces';
import { httpAddCustomerType, httpEditCustomerType } from '@/services';
import { Button, Form, FormProps, Input, message, Switch } from 'antd';
import { useState } from 'react';

interface Props {
    customerType: CustomerType;
    onClose: () => void;
}

export const FormCustomerType: React.FC<Props> = ({ customerType, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<CustomerType>['onFinish'] = async values => {
        setLoading(true);
        try {
            setLoading(true);
            let res;
            if (customerType.id && customerType.id > 0) res = await httpEditCustomerType({ ...customerType, ...values });
            else res = await httpAddCustomerType(values);

            message[res.error ? 'warning' : 'success'](res.message);
            if (!res.error) onClose();
        } catch (error) {
            message.error(`Error add or edit ouoter: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout='vertical' initialValues={{ ...customerType }} onFinish={handleSubmit}>
            <Form.Item label='Nombre' name='name' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre del tipo de cliente' />
            </Form.Item>
            <Form.Item label='Estado' name='is_active' valuePropName='checked'>
                <Switch checkedChildren='Activo' unCheckedChildren='Inactivo' />
            </Form.Item>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
};

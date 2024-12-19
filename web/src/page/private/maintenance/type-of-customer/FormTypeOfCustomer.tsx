import { TypeOfCustomer } from '@/models';
import { httpAddTypeOfCustomer, httpEditTypeOfCustomer } from '@/services';
import { Button, Form, FormProps, Input, message, Switch } from 'antd';
import { useState } from 'react';

interface Props {
    typeOfCustomer: TypeOfCustomer;
    onClose: () => void;
}

export const FormTypeOfCustomer: React.FC<Props> = ({ typeOfCustomer, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<TypeOfCustomer>['onFinish'] = async values => {
        setLoading(true);
        try {
            setLoading(true);
            let res;
            if (typeOfCustomer.id_tipo_cliente > 0) res = await httpEditTypeOfCustomer({ ...typeOfCustomer, ...values });
            else res = await httpAddTypeOfCustomer(values);
            if (res.message) message.warning(res.message);
            else onClose();
        } catch (error) {
            message.error(`Error add or edit ouoter: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout='vertical' initialValues={{ ...typeOfCustomer }} onFinish={handleSubmit}>
            <Form.Item label='Nombre' name='tipo_cliente' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre del tipo de cliente' />
            </Form.Item>
            <Form.Item label='Estado' name='estado' valuePropName='checked'>
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

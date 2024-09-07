import { Port } from '@/models';
import { httpAddPort, httpUpdatePort } from '@/services';
import { Button, Form, FormProps, Input, message, Switch } from 'antd';
import { useState } from 'react';

interface Props {
    port: Port;
    onClose: () => void;
}

export const FormPorts: React.FC<Props> = ({ port, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<Port>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (port.id_puerto > 0) res = await httpUpdatePort({ ...port, ...values });
            else res = await httpAddPort(values);
            if (res.message) message.warning(res.message);
            else {
                message.success(`Puerto ${port.id_puerto > 0 ? 'editada' : 'agregada'} correctamente`);
                onClose();
            }
        } catch (error) {
            message.error(`Error http add or edit port: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout='vertical' initialValues={port} onFinish={handleSubmit}>
            <Form.Item label='Nombre' name='puerto' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre' />
            </Form.Item>

            <Form.Item name='estado' label='Estado' valuePropName='checked'>
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

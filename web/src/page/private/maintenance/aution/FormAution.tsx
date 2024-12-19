import { Aution } from '@/models';
import { httpAddAutions, httpUpdateAutions } from '@/services';
import { Button, Form, FormProps, Input, message, Switch } from 'antd';
import React, { useState } from 'react';

interface Props {
    aution: Aution;
    onClose: () => void;
}

export const FormAution: React.FC<Props> = ({ aution, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<Aution>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (aution.id_subasta > 0) res = await httpUpdateAutions({ ...aution, ...values });
            else res = await httpAddAutions(values);
            if (res.message) message.warning(res.message);
            else {
                message.success(`Subasta ${aution.id_subasta > 0 ? 'editada' : 'agregada'} correctamente`);
                onClose();
            }
        } catch (error) {
            message.error(`Error http add or edit aution: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout='vertical' initialValues={aution} onFinish={handleSubmit}>
            <Form.Item label='Nombre Subasta' name='subasta' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre' />
            </Form.Item>

            <Form.Item label='Alias' name='alias' className='flex-1'>
                <Input placeholder='Ingrese un alias' />
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

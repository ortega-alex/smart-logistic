import { TypeVehicle } from '@/models';
import { Button, Form, FormProps, Input, InputNumber, message, Switch } from 'antd';
import { useState } from 'react';
import { httpAddTypeVehicle, httpUpdateTypeVehicle } from '@/services';

interface Props {
    typeVehicle: TypeVehicle;
    onClose: () => void;
}

export const FormTypeVehicle: React.FC<Props> = ({ typeVehicle, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<TypeVehicle>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (typeVehicle.id_tipo_vehiculo > 0) res = await httpUpdateTypeVehicle({ ...typeVehicle, ...values });
            else res = await httpAddTypeVehicle(values);
            if (res.message) message.warning(res.message);
            else {
                message.success(`Puerto ${typeVehicle.id_tipo_vehiculo > 0 ? 'editada' : 'agregada'} correctamente`);
                onClose();
            }
        } catch (error) {
            message.error(`Error http add or edit port: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout='vertical' initialValues={typeVehicle} onFinish={handleSubmit}>
            <Form.Item label='Nombre' name='tipo_vehiculo' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre' />
            </Form.Item>

            <Form.Item label='Costo' name='porcentaje_costo' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <InputNumber className='w-100' min={0} max={100} formatter={value => `${value}%`} />
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

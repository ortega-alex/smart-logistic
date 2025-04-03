import { VehicleType } from '@/interfaces';
import { httpAddVehicleType, httpUpdateVehicleType } from '@/services';
import { Button, Form, FormProps, Input, message, Switch } from 'antd';
import { useState } from 'react';

interface Props {
    vehicleType: VehicleType;
    onClose: () => void;
}

export const FormVehicleType: React.FC<Props> = ({ vehicleType, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<VehicleType>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (vehicleType.id > 0) res = await httpUpdateVehicleType({ ...vehicleType, ...values });
            else res = await httpAddVehicleType(values);

            message[res.error ? 'warning' : 'success'](res.message);
            if (!res.error) onClose();
        } catch (error) {
            message.error(`Error http add or edit port: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout='vertical' initialValues={vehicleType} onFinish={handleSubmit}>
            <Form.Item label='Nombre' name='name' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre' />
            </Form.Item>

            <Form.Item name='is_active' label='Estado' valuePropName='checked'>
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

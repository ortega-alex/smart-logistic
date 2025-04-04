import { CustomerType, Headquarter, Session, TransportRate, TransportType, VehicleType } from '@/interfaces';
import { httpAddTransportRate, httpEditTransportRate } from '@/services';
import { commaSeparateNumber } from '@/utilities';
import { Button, Form, FormProps, InputNumber, message, Select, Switch } from 'antd';
import { useState } from 'react';

type Props = {
    sessin: Session;
    transportRate: TransportRate;
    vehiclesType: Array<VehicleType>;
    transportsType: Array<TransportType>;
    headquarters: Array<Headquarter>;
    customerTypes: Array<CustomerType>;
    onClose: () => void;
};

export const FormTransportRate: React.FC<Props> = ({
    sessin,
    vehiclesType,
    transportsType,
    headquarters,
    customerTypes,
    transportRate,
    onClose
}) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<TransportRate>['onFinish'] = async values => {
        try {
            setLoading(true);
            const data = {
                user_id: sessin.session_id,
                ...transportRate,
                ...values
            };
            let res;
            if (transportRate.id !== '') res = await httpEditTransportRate(data);
            else res = await httpAddTransportRate(data);

            message[res.success ? 'success' : 'warning'](res.message);
            if (res.success) onClose();
        } catch (error) {
            message.error(`Error http add or edit transport rate: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            layout='vertical'
            initialValues={{
                ...transportRate,
                customer_type_id: transportRate.customerType?.id,
                vehicle_type_id: transportRate.vehicleType?.id,
                transport_type_id: transportRate.transportType?.id,
                headquarter_id: transportRate.headquarter?.id
            }}
            onFinish={handleSubmit}
        >
            <Form.Item label='Tipo de Cliente' name='customer_type_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    disabled={transportRate.id !== ''}
                    allowClear
                    showSearch
                    optionFilterProp='label'
                    filterSort={(input, option) => (input?.label ?? '').toLowerCase().localeCompare((option?.label ?? '').toLowerCase())}
                    placeholder='Seleccione un estado'
                    options={customerTypes.map(item => ({ label: item.name, value: item.id }))}
                />
            </Form.Item>
            <Form.Item label='Tipo de Vehiculo' name='vehicle_type_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    disabled={transportRate.id !== ''}
                    allowClear
                    showSearch
                    optionFilterProp='label'
                    filterSort={(input, option) => (input?.label ?? '').toLowerCase().localeCompare((option?.label ?? '').toLowerCase())}
                    placeholder='Seleccione un estado'
                    options={vehiclesType.map(item => ({ label: item.name, value: item.id }))}
                />
            </Form.Item>
            <Form.Item label='Tipo de Transporte' name='transport_type_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    disabled={transportRate.id !== ''}
                    allowClear
                    showSearch
                    optionFilterProp='label'
                    filterSort={(input, option) => (input?.label ?? '').toLowerCase().localeCompare((option?.label ?? '').toLowerCase())}
                    placeholder='Seleccione un estado'
                    options={transportsType.map(item => ({ label: item.name, value: item.id }))}
                />
            </Form.Item>
            <Form.Item label='Sede EEUU' name='headquarter_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    disabled={transportRate.id !== ''}
                    allowClear
                    showSearch
                    optionFilterProp='label'
                    filterSort={(input, option) => (input?.label ?? '').toLowerCase().localeCompare((option?.label ?? '').toLowerCase())}
                    placeholder='Seleccione un estado'
                    options={headquarters.map(item => ({ label: item.name, value: item.id }))}
                />
            </Form.Item>
            <Form.Item label='Tarifa' name='rate' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <InputNumber className='w-100' min={0} formatter={value => (value ? commaSeparateNumber(value) : '')} />
            </Form.Item>
            <Form.Item name='is_active' label='Estado' valuePropName='checked'>
                <Switch checkedChildren='Activo' unCheckedChildren='Inactivo' />
            </Form.Item>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' disabled={loading} loading={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
};

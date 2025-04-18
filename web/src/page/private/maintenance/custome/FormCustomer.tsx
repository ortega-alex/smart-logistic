import { Icon } from '@/components';
import { Customer, CustomerType, ValidatorName } from '@/interfaces';
import { httpAddCustomer, httpEditCustomer, httpGetCustomerType } from '@/services';
import { mailIsValied, nitIsValid, noDpiIsValid, phoneNumberIsValid } from '@/utilities';
import { Button, Form, FormProps, Input, message, Select, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
    customer: Customer;
    onClose: () => void;
}

export const FormCustomer: React.FC<Props> = ({ customer, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [customerType, setTypeOfCustomers] = useState<Array<CustomerType>>([]);

    const handleValidator = async (name: ValidatorName, value: string, required: boolean = true) => {
        let error = null;
        if (required && (!value || value.trim() === '')) error = 'El campo es obligatorio';

        if (value && value.trim() !== '') {
            if (name === ValidatorName.PhoneNumber) error = await phoneNumberIsValid(value);
            if (name === ValidatorName.Nit) error = await nitIsValid(value);
            if (name === ValidatorName.Dpi) error = await noDpiIsValid(value);
            if (name === ValidatorName.Mail) error = await mailIsValied(value);
        }
        if (error) throw new Error(error);
    };

    const handleSubmit: FormProps<Customer>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (customer.id > 0) res = await httpEditCustomer({ ...customer, ...values });
            else res = await httpAddCustomer(values);

            if (res.message) message.warning(res.message);
            else onClose();
        } catch (error) {
            message.error(`Error http customer: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        httpGetCustomerType()
            .then(res => setTypeOfCustomers(res))
            .catch(err => message.error(`Error http customer: ${err.message}`));
    }, []);

    return (
        <Form
            layout='vertical'
            initialValues={{
                ...customer,
                customer_type_id: customer.type?.id
            }}
            onFinish={handleSubmit}
        >
            <Form.Item label='Nombre completo' name='name' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre del cliente' />
            </Form.Item>
            <Form.Item
                label='Tipo de cliente'
                name='customer_type_id'
                className='flex-1'
                rules={[{ required: true, message: 'El campo es obligatorio' }]}
            >
                <Select placeholder='Seleccione una opción' options={customerType.map(item => ({ value: item.id, label: item.name }))} />
            </Form.Item>
            <div className='flex flex-md-column justify-between gap-1'>
                <Form.Item
                    label='Teléfono Celular'
                    name='phone_number'
                    className='flex-1'
                    rules={[
                        {
                            required: true,
                            validator: (_, value) => handleValidator(ValidatorName.PhoneNumber, value)
                        }
                    ]}
                >
                    <Input placeholder='Ingrese un número de teléfono' />
                </Form.Item>
                <Form.Item
                    label='Teléfono Fijo'
                    name='landline'
                    className='flex-1'
                    rules={[{ required: false, validator: (_, value) => handleValidator(ValidatorName.PhoneNumber, value, false) }]}
                >
                    <Input placeholder='Ingrese un número de teléfono' />
                </Form.Item>
            </div>
            <Form.Item label='Dirección' name='address' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input.TextArea rows={3} placeholder='Ingrese una direccion' />
            </Form.Item>
            <div className='flex flex-md-column justify-between gap-1'>
                <Form.Item
                    label='Dpi'
                    name='dpi'
                    className='flex-1'
                    rules={[{ required: true, validator: (_, value) => handleValidator(ValidatorName.Dpi, value) }]}
                >
                    <Input placeholder='Ingrese un número de dpi' />
                </Form.Item>
                <Form.Item
                    label='Nit'
                    name='nit'
                    className='flex-1'
                    rules={[{ required: true, validator: (_, value) => handleValidator(ValidatorName.Nit, value) }]}
                >
                    <Input placeholder='Ingrese un número de nit' />
                </Form.Item>
            </div>
            <Form.Item
                label='Email'
                name='email'
                rules={[{ required: true, validator: (_, value) => handleValidator(ValidatorName.Mail, value) }]}
            >
                <Input placeholder='Ingrese un email' />
            </Form.Item>
            <div className='flex flex-md-column justify-between gap-1'>
                <Form.Item name='files' rules={[{ required: customer.id === 0, message: `El campo es obligatorio` }]}>
                    <Upload
                        style={{ width: 300, border: 'solid black 1px' }}
                        multiple={true}
                        accept={'.pdf'}
                        customRequest={() => {}}
                        onChange={info => (info.file.status = 'done')}
                    >
                        <Button type='dashed' htmlType='button' icon={<Icon.Upload />} block>
                            Archivos
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item name='is_active' label='Estado' valuePropName='checked'>
                    <Switch checkedChildren='Activo' unCheckedChildren='Inactivo' />
                </Form.Item>
            </div>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
};

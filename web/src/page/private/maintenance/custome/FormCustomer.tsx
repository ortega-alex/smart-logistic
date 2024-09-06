import { Icon } from '@/components';
import { Customer } from '@/models';
import { TypeOfCustomer } from '@/models/TypeOfCustomer';
import { httpAddCustomer, httpEditCustomer, httpGetTypeOfCustomer } from '@/services';
import { Button, Form, FormProps, Input, message, Select, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
    customer: Customer;
    onClose: () => void;
}

export const FormCustomer: React.FC<Props> = ({ customer, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [typeOfCustomers, setTypeOfCustomers] = useState<Array<TypeOfCustomer>>([]);

    const handleSubmit: FormProps<Customer>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (customer.id_cliente > 0) res = await httpEditCustomer({ ...customer, ...values });
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
        httpGetTypeOfCustomer()
            .then(res => setTypeOfCustomers(res))
            .catch(err => message.error(`Error http customer: ${err.message}`));
    }, []);

    return (
        <Form layout='vertical' initialValues={{ ...customer, archivos: undefined }} onFinish={handleSubmit}>
            <Form.Item label='Nombre completo' name='cliente' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre del cliente' />
            </Form.Item>
            <div className='flex flex-md-column justify-between gap-1'>
                <Form.Item
                    label='Teléfono Celular'
                    name='telefono_celular'
                    className='flex-1'
                    rules={[{ required: true, message: 'El campo es obligatorio' }]}
                >
                    <Input placeholder='Ingrese un número de teléfono' />
                </Form.Item>
                <Form.Item label='Teléfono Fijo' name='telefono_fijo' className='flex-1'>
                    <Input placeholder='Ingrese un número de teléfono' />
                </Form.Item>
            </div>
            <Form.Item label='Dirección' name='direccion' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input.TextArea rows={3} placeholder='Ingrese una direccion' />
            </Form.Item>
            <div className='flex flex-md-column justify-between gap-1'>
                <Form.Item label='Dpi' name='dpi' className='flex-1' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                    <Input placeholder='Ingrese un número de dpi' />
                </Form.Item>
                <Form.Item label='Nit' name='nit' className='flex-1' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                    <Input placeholder='Ingrese un número de nit' />
                </Form.Item>
            </div>
            <div className='flex flex-md-column justify-between gap-1'>
                <Form.Item label='Email' name='correo' className='flex-1' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                    <Input placeholder='Ingrese un email' />
                </Form.Item>
                <Form.Item
                    label='Tipo de cliente'
                    name='id_tipo_cliente'
                    className='flex-1'
                    rules={[{ required: true, message: 'El campo es obligatorio' }]}
                >
                    <Select
                        placeholder='Seleccione una opción'
                        options={typeOfCustomers.map(item => ({ value: item.id_tipo_cliente, label: item.tipo_cliente }))}
                    />
                </Form.Item>
            </div>
            <div className='flex flex-md-column justify-between gap-1'>
                <Form.Item name='files' rules={[{ required: customer.id_cliente === 0, message: `El campo es obligatorio` }]}>
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
                <Form.Item name='estado' label='Estado' valuePropName='checked'>
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

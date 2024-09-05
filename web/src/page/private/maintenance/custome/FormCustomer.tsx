import { Icon } from '@/components';
import { Customer } from '@/models';
import { Button, Form, FormProps, Input, Select, Switch, Upload } from 'antd';
import { useState } from 'react';

interface Props {
    customer: Customer;
}

export const FormCustomer: React.FC<Props> = ({ customer }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<Customer>['onFinish'] = values => {
        console.log(values);
    };

    return (
        <Form layout='vertical' initialValues={customer} onFinish={handleSubmit}>
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
                <Form.Item label='Tipo de cliente' name='id_tipo_cliente' className='flex-1'>
                    <Select placeholder='Seleccione una opción' />
                </Form.Item>
            </div>
            <div className='flex flex-md-column justify-between gap-1'>
                <Form.Item name='archivos' rules={[{ required: true, message: `El campo es obligatorio` }]}>
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

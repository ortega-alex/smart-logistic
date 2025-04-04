import { Headquarter, Profile, User, ValidatorName } from '@/interfaces';
import { httpAddUser, httpEditUser } from '@/services';
import { mailIsValied, phoneNumberIsValid } from '@/utilities';
import { Button, Form, FormProps, Input, message, Select, Switch } from 'antd';
import { useState } from 'react';

interface Props {
    user: User;
    profiles: Array<Profile>;
    headquarters: Array<Headquarter>;
    onClose: () => void;
}

export const FormUser: React.FC<Props> = ({ user, profiles, headquarters, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<User>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (user.id > 0) res = await httpEditUser({ ...user, ...values });
            else res = await httpAddUser(values);

            message[res.success ? 'success' : 'warning'](res.message);
            if (res.success) onClose();
        } catch (error) {
            message.error(`Error http add user: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = async (name: ValidatorName, value: string) => {
        let error = null;
        if (value && value.trim() === '') error = 'El campo es obligatorio';
        else if (name === ValidatorName.PhoneNumber) error = await phoneNumberIsValid(value);
        else if (name === ValidatorName.Mail) error = await mailIsValied(value);
        if (error) throw new Error(error);
    };

    return (
        <Form
            layout='vertical'
            initialValues={{
                ...user,
                profile_id: user.profile?.id && user.profile.id > 0 ? user.profile.id : undefined,
                headquarter_id: user?.headquarter?.id
            }}
            onFinish={handleSubmit}
        >
            <Form.Item label='Nombre completo' name='name' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre' />
            </Form.Item>

            <Form.Item label='Perfil' name='profile_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    className='w-100'
                    placeholder='Seleccione una opción'
                    options={profiles.filter(item => item.is_active).map(item => ({ value: item.id, label: item.name }))}
                />
            </Form.Item>

            <Form.Item label='Sede' name='headquarter_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    className='w-100'
                    placeholder='Seleccione una opción'
                    options={headquarters.filter(item => item.is_active).map(item => ({ value: item.id, label: item.name }))}
                />
            </Form.Item>

            <div className='flex gap-3'>
                <Form.Item
                    label='Teléfono'
                    name='phone_number'
                    className='flex-1'
                    rules={[{ required: true, validator: (_, value) => handleValidate(ValidatorName.PhoneNumber, value) }]}
                >
                    <Input placeholder='Ingrese un número de teléfono' />
                </Form.Item>

                <Form.Item
                    label='Correo'
                    name='email'
                    className='flex-1'
                    rules={[{ required: true, validator: (_, value) => handleValidate(ValidatorName.Mail, value) }]}
                >
                    <Input placeholder='Ingrese un email' />
                </Form.Item>
            </div>

            <Form.Item label='Usuario' name='username' className='flex-1' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese un usuario' disabled={user.id > 0} />
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

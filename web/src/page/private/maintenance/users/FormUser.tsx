import { Profile, User } from '@/interfaces';
import { ValidatorName } from '@/models';
import { httpAddUser, httpEditUser, httpGetProfiles } from '@/services';
import { mailIsValied, phoneNumberIsValid } from '@/utilities';
import { Button, Form, FormProps, Input, message, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
    user: User;
    onClose: () => void;
}

export const FormUser: React.FC<Props> = ({ user, onClose }) => {
    const [profiles, setProfiles] = useState<Array<Profile>>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<User>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (user.id > 0) res = await httpEditUser({ ...user, ...values });
            else res = await httpAddUser(values);
            if (!res.message) onClose();
            else message.warning(res.message);
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

    useEffect(() => {
        httpGetProfiles()
            .then(res => setProfiles(res))
            .catch(err => message.error(`Erro http get profiles: ${err.message}`));
    }, []);

    return (
        <Form layout='vertical' initialValues={user} onFinish={handleSubmit}>
            <Form.Item label='Nombre completo' name='nombre' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre' />
            </Form.Item>

            <Form.Item label='Tipo de perfil' name='id_perfil' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    className='w-100'
                    placeholder='Seleccione una opción'
                    options={profiles.filter(item => item.is_active).map(item => ({ value: item.id, label: item.name }))}
                />
            </Form.Item>
            <Form.Item
                label='Teléfono'
                name='telefono'
                className='flex-1'
                rules={[{ required: true, validator: (_, value) => handleValidate(ValidatorName.PhoneNumber, value) }]}
            >
                <Input placeholder='Ingrese un número de teléfono' />
            </Form.Item>

            <Form.Item
                label='Correo'
                name='correo'
                className='flex-1'
                rules={[{ required: true, validator: (_, value) => handleValidate(ValidatorName.Mail, value) }]}
            >
                <Input placeholder='Ingrese un email' />
            </Form.Item>

            <Form.Item label='Usuario' name='usuario' className='flex-1' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese un usuario' disabled={user.id > 0} />
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

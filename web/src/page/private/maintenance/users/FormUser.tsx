import { Profile, User } from '@/models';
import { httpAddUser, httpEditUser, httpGetProfiles } from '@/services';
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
            if (user.id_usuario > 0) res = await httpEditUser({ ...user, ...values });
            else res = await httpAddUser(values);
            if (!res.message) onClose();
            else message.warning(res.message);
        } catch (error) {
            message.error(`Error http add user: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
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
                    options={profiles.filter(item => item.estado).map(item => ({ value: item.id_perfil, label: item.perfil }))}
                />
            </Form.Item>
            <Form.Item label='Teléfono' name='telefono' className='flex-1' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese un número de teléfono' />
            </Form.Item>

            <Form.Item label='Correo' name='correo' className='flex-1' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese un email' />
            </Form.Item>

            <Form.Item label='Usuario' name='usuario' className='flex-1' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese un usuario' disabled={user.id_usuario > 0} />
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

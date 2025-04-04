import { Icon } from '@/components';
import { Profile, Role } from '@/interfaces';
import { httpAddProfiles, httpGetPermissionsMenusByProfileId, httpUpdateProfiles } from '@/services';
import { Button, Form, FormProps, Input, message, Radio, Switch, Tabs, Tree, TreeProps } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
    profile: Profile;
    roles: Array<Role>;
    permissions: Array<any>;
    onClose: () => void;
}

export const FormProfile: React.FC<Props> = ({ profile, roles, permissions, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

    const handleSubmit: FormProps<Profile>['onFinish'] = async values => {
        try {
            setLoading(true);
            const permissions = checkedKeys
                .map(item => item.toString())
                .reduce((acumulate: { [keu: string]: [string] }, current: string | number) => {
                    if (String(current).indexOf('-') !== -1) {
                        const [id_menu, id_permiso] = String(current).split('-');
                        if (!acumulate[id_menu]) acumulate[id_menu] = [id_permiso];
                        else acumulate[id_menu].push(id_permiso);
                    }
                    return { ...acumulate };
                }, {});

            const data = { ...profile, ...values, permissions };
            let res;
            if (profile.id > 0) res = await httpUpdateProfiles(data);
            else res = await httpAddProfiles(data);

            message[res.success ? 'success' : 'warning'](res.message);
            if (res.success) onClose();
        } catch (error) {
            message.error(`Error http add or edit profile: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleOnCheck: TreeProps['onCheck'] = checkKeyValues => setCheckedKeys(checkKeyValues as React.Key[]);

    useEffect(() => {
        if (profile.id > 0)
            httpGetPermissionsMenusByProfileId(profile.id).then(res => {
                const permissos: React.Key[] = res?.map((item: any) => `${item?.menu?.id}-${item?.permission?.id}`);
                setCheckedKeys(permissos);
            });
    }, []);

    return (
        <Form layout='vertical' initialValues={{ ...profile, role_id: profile.role?.id ?? 3 }} onFinish={handleSubmit}>
            <Tabs
                defaultActiveKey='1'
                items={[
                    {
                        key: '1',
                        label: 'Información',
                        children: (
                            <>
                                <Form.Item label='Nombre' name='name' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                                    <Input placeholder='Ingrese el nombre' />
                                </Form.Item>

                                <Form.Item
                                    label='Rol'
                                    name='role_id'
                                    rules={[{ required: true, message: 'El campo es obligatorio' }]}
                                    tooltip={{
                                        title: 'Define el nivel de información que el usuario puede ver y editar',
                                        icon: <Icon.InfoCircle />
                                    }}
                                >
                                    <Radio.Group>
                                        {roles.map(item => (
                                            <Radio value={item.id} key={item.id}>
                                                {item.name}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item name='is_active' label='Estado' valuePropName='checked'>
                                    <Switch checkedChildren='Activo' unCheckedChildren='Inactivo' />
                                </Form.Item>
                            </>
                        )
                    },
                    {
                        key: '2',
                        label: 'Permisos',
                        children: (
                            <div className='vh-33 overflow-y'>
                                <Tree checkable treeData={permissions} onCheck={handleOnCheck} checkedKeys={checkedKeys} />
                            </div>
                        )
                    }
                ]}
            />

            <div className='text-right'>
                <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
};

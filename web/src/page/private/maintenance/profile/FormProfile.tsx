import { Menu, Permission, Profile } from '@/models';
import { httpAddProfiles, httpGetMenus, httpGetPermissions, httpGetPermissionsMenusByProfileId, httpUpdateProfiles } from '@/services';
import { Button, Form, FormProps, Input, message, Switch, Tabs, Tree, TreeProps } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
    profile: Profile;
    onClose: () => void;
}

export const FormProfile: React.FC<Props> = ({ profile, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

    const handleSubmit: FormProps<Profile>['onFinish'] = async values => {
        try {
            setLoading(true);
            const _permisos = checkedKeys
                .map(item => item.toString())
                .reduce((acumulate: { [keu: string]: [string] }, current: string | number) => {
                    if (String(current).indexOf('-') !== -1) {
                        const [id_menu, id_permiso] = String(current).split('-');
                        if (!acumulate[id_menu]) acumulate[id_menu] = [id_permiso];
                        else acumulate[id_menu].push(id_permiso);
                    }
                    return { ...acumulate };
                }, {});

            let res;
            if (profile.id_perfil > 0) res = await httpUpdateProfiles({ ...profile, ...values, _permisos });
            else res = await httpAddProfiles({ ...values, _permisos });
            if (res.message) message.warning(res.message);
            else {
                message.success(`Perfil ${profile.id_perfil > 0 ? 'editada' : 'agregada'} correctamente`);
                onClose();
            }
        } catch (error) {
            message.error(`Error http add or edit profile: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGet = async () => {
        try {
            const menus = await httpGetMenus();
            const permissions = await httpGetPermissions();

            const res = menus.map((item: Menu) => ({
                key: item.id_menu,
                title: item.menu,
                children: permissions.map((_item: Permission) => ({
                    key: `${item.id_menu}-${_item.id_permiso}`,
                    title: _item.permiso
                }))
            }));
            setPermissions(res);
        } catch (error) {
            message.error(`Error get permissions: ${(error as Error).message}`);
        }
    };

    const handleOnCheck: TreeProps['onCheck'] = checkKeyValues => setCheckedKeys(checkKeyValues as React.Key[]);

    useEffect(() => {
        if (profile.id_perfil > 0)
            httpGetPermissionsMenusByProfileId(profile.id_perfil).then(res => {
                const permissos: React.Key[] = res?.map((item: any) => `${item?.menu?.id_menu}-${item?.permiso?.id_permiso}`);
                setCheckedKeys(permissos);
            });
        handleGet();
    }, []);

    return (
        <Form layout='vertical' initialValues={profile} onFinish={handleSubmit}>
            <Tabs
                defaultActiveKey='1'
                items={[
                    {
                        key: '1',
                        label: 'Información',
                        children: (
                            <>
                                <Form.Item label='Nombre' name='perfil' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                                    <Input placeholder='Ingrese el nombre' />
                                </Form.Item>

                                <Form.Item name='estado' label='Estado' valuePropName='checked'>
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

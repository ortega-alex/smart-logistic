import { Icon, Search } from '@/components';
import { EmptyProfile } from '@/constants';
import { Menu, Permission, Profile as ProfileInterface, Role } from '@/interfaces';
import { RootState } from '@/redux';
import { httpGetAllRoles, httpGetMenus, httpGetPermissions, httpGetProfiles } from '@/services';
import { Button, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormProfile } from './FormProfile';

export const Profile = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Perfiles';

    const [profile, setProfile] = useState<ProfileInterface>(EmptyProfile);
    const [profiles, setProfiles] = useState<Array<ProfileInterface>>([]);
    const [profilesCopy, setProfilesCopy] = useState<Array<ProfileInterface>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<Array<Role>>([]);
    const [permissions, setPermissions] = useState([]);

    const handleOnSearch = (value: string) => {
        let _profiles = [...profilesCopy];
        if (value.trim() !== '')
            _profiles = _profiles.filter(item => item.id === Number(value) || item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        setProfiles(_profiles);
    };

    const handleEdit = (item: ProfileInterface) => {
        setProfile(item);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetProfiles()
            .then(res => {
                setProfiles(res);
                setProfilesCopy(res);
            })
            .catch(err => message.error(`Error http get profiles: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGet();
        httpGetAllRoles()
            .then(res => setRoles(res))
            .catch(err => message.error(`Error http get roles: ${err.message}`));

        (async () => {
            try {
                const [menus, permissions] = await Promise.all([httpGetMenus(), httpGetPermissions()]);
                const res = menus.map((item: Menu) => ({
                    key: item.id,
                    title: item.name,
                    children: permissions.map((_item: Permission) => ({
                        key: `${item.id}-${_item.id}`,
                        title: _item.name
                    }))
                }));
                setPermissions(res);
            } catch (error) {
                message.error(`Error get permissions: ${(error as Error).message}`);
            }
        })();
    }, []);

    return (
        <div className='h-100 flex flex-column py-3 px-5'>
            <div className='flex flex-md-column gap-3 justify-between'>
                <h3>{title}</h3>
                <div>
                    <Search onSearch={handleOnSearch} onReset={() => handleOnSearch('')} />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setProfile(EmptyProfile);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={profiles}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.name}
                            </div>

                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.is_active ? 'Activo' : 'Inactivo'}
                                </div>
                                <Button type='link' danger htmlType='button' icon={<Icon.Edit />} onClick={() => handleEdit(item)}>
                                    Editar
                                </Button>
                            </div>
                        </div>
                    )}
                />
            ) : (
                <Table
                    size='small'
                    rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                    pagination={false}
                    className='table'
                    loading={loading}
                    showSorterTooltip={false}
                    rowKey='id'
                    dataSource={profiles}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'name',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Rol',
                            dataIndex: 'role',
                            render: role => <span>{role?.name}</span>
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'is_active',
                            render: value => <span className={value ? 'text-success' : 'text-danger'}>{value ? 'Activo' : 'Inactivo'}</span>
                        },
                        {
                            title: 'Opciones',
                            dataIndex: 'operacion',
                            width: 80,
                            render: (_, item) => (
                                <div className='text-center'>
                                    <Button
                                        style={{ width: 40 }}
                                        icon={<Icon.Edit />}
                                        type='primary'
                                        size='small'
                                        onClick={() => handleEdit(item)}
                                    />
                                </div>
                            )
                        }
                    ]}
                />
            )}

            <Modal
                open={modal}
                title={
                    <h3>
                        {profile.id > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormProfile
                    {...{ roles, profile, permissions }}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

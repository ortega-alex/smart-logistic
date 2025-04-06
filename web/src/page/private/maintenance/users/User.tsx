import { Icon, PageHeader } from '@/components';
import { UserEmpty } from '@/constants';
import { Headquarter, Profile, User as UserInterface } from '@/interfaces';
import { RootState } from '@/redux';
import { httpGelUser, httpGetAllHeadquarter, httpGetProfiles } from '@/services';
import { Button, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormUser } from './FormUser';

export const User = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Usuarios';

    const [users, setUsers] = useState<Array<UserInterface>>([]);
    const [usersCopy, setUserCopy] = useState<Array<UserInterface>>([]);
    const [user, setUser] = useState<UserInterface>(UserEmpty);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profiles, setProfiles] = useState<Array<Profile>>([]);
    const [headquarters, setHeadquarters] = useState<Array<Headquarter>>([]);

    const handleOnSearch = (value: string) => {
        let _users = [...usersCopy];
        if (value.trim() !== '')
            _users = _users.filter(item => item.id === Number(value) || item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        setUsers(_users);
    };

    const handleGet = () => {
        setLoading(true);
        httpGelUser()
            .then(res => {
                setUsers(res);
                setUserCopy(res);
            })
            .catch(err => `Error http get users: ${err.message}`)
            .finally(() => setLoading(false));
    };

    const handleEdit = (user: UserInterface) => {
        setUser(user);
        setModal(true);
    };

    useEffect(() => {
        handleGet();
        httpGetProfiles()
            .then(res => setProfiles(res))
            .catch(err => message.error(`Erro http get profiles: ${err.message}`));
        httpGetAllHeadquarter()
            .then(res => setHeadquarters(res))
            .catch(err => message.error(`Erro http get headquarters: ${err.message}`));
    }, []);

    return (
        <div className='h-100 flex flex-column p-auto'>
            <PageHeader
                title={title}
                onGet={handleGet}
                onSearch={handleOnSearch}
                onAdd={() => {
                    setUser(UserEmpty);
                    setModal(true);
                }}
            />

            {deviceState ? (
                <div className='vh-75 overflow-y'>
                    <List
                        dataSource={users}
                        loading={loading}
                        rowKey='id'
                        renderItem={item => (
                            <div className='item-list text-capitalize' key={item.id}>
                                <div className='flex-1'>
                                    <strong>Nombre: </strong>&nbsp;{item.name}
                                </div>
                                <div className='flex flex-row justify-start gap-2'>
                                    <div className='flex items-center gap-1'>
                                        <Icon.Profile />
                                        {item.profile?.name}
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Icon.User />
                                        {item.username}
                                    </div>
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
                </div>
            ) : (
                <Table
                    size='small'
                    rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                    pagination={{
                        position: ['none', 'bottomRight'],
                        showSizeChanger: true,
                        pageSizeOptions: [50, 100, 250, 500]
                    }}
                    className='table'
                    loading={loading}
                    showSorterTooltip={false}
                    rowKey='id'
                    dataSource={users}
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
                            title: 'Perfil',
                            dataIndex: 'profile',
                            ellipsis: true,
                            sorter: true,
                            render: profile => <span>{profile?.name}</span>
                        },
                        {
                            title: 'Usuario',
                            dataIndex: 'username',
                            sorter: true
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
                        {user.id > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormUser
                    {...{ user, profiles, headquarters }}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

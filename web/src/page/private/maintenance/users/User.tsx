import { Icon } from '@/components';
import { User as TypeUser } from '@/models';
import { RootState } from '@/redux';
import { httpGelUser } from '@/services';
import { Button, Input, List, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormUser } from './FormUser';

export const User = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const userEmpty: TypeUser = {
        id_usuario: 0,
        correo: '',
        estado: true,
        nombre: '',
        telefono: '',
        usuario: ''
    };
    const [users, setusers] = useState<Array<TypeUser>>([]);
    const [user, setUser] = useState<TypeUser>(userEmpty);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGet = () => {
        setLoading(true);
        httpGelUser()
            .then(res => setusers(res))
            .catch(err => `Error http get users: ${err.message}`)
            .finally(() => setLoading(false));
    };

    const handleEdit = (user: TypeUser) => {
        setUser({ ...user, id_perfil: user.perfil?.id_perfil });
        setModal(true);
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className='h-100 flex flex-column p-3'>
            <div className='flex flex-md-column gap-3 justify-between'>
                <h3>Usuarios</h3>
                <div>
                    <Input.Search placeholder='Buscar' onSearch={() => {}} enterButton />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setUser(userEmpty);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={users}
                    renderItem={item => (
                        <div className='item-list' key={item.id_usuario}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.nombre}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div className='flex-1'>
                                    <strong>Perfil: </strong>&nbsp;{item.perfil?.perfil}
                                </div>
                                <div className='flex-1'>
                                    <strong>Usuario: </strong>&nbsp;{item.usuario}
                                </div>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.estado ? 'Activo' : 'Inactivo'}
                                </div>
                                <Button type='link' danger htmlType='button' onClick={() => handleEdit(item)}>
                                    Ver
                                </Button>
                            </div>
                        </div>
                    )}
                />
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
                    rowKey='id_cliente'
                    dataSource={users}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_usuario'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'nombre',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Perfil',
                            dataIndex: 'perfil',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{value?.perfil}</span>
                        },
                        {
                            title: 'Usuario',
                            dataIndex: 'usuario',
                            sorter: true
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'estado',
                            render: value => <span className={value ? 'text-success' : 'text-danger'}>{value ? 'Actuvi' : 'Inactivo'}</span>
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
                title={<h3>{user.id_usuario > 0 ? 'Editar' : 'Agregar'} Usuario</h3>}
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormUser
                    user={user}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

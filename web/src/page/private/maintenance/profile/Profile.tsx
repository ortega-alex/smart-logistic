import { Icon, Search } from '@/components';
import { EmptyProfile, Profile as TypeProfile } from '@/models';
import { RootState } from '@/redux';
import { httpGetProfiles } from '@/services';
import { Button, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormProfile } from './FormProfile';

export const Profile = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Perfiles';

    const [profile, setProfile] = useState<TypeProfile>(EmptyProfile);
    const [profiles, setProfiles] = useState<Array<TypeProfile>>([]);
    const [profilesCopy, setProfilesCopy] = useState<Array<TypeProfile>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnSearch = (value: string) => {
        let _profiles = [...profilesCopy];
        if (value.trim() !== '')
            _profiles = _profiles.filter(
                item => item.id_perfil === Number(value) || item.perfil.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
        setProfiles(_profiles);
    };

    const handleEdit = (item: TypeProfile) => {
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
    }, []);

    return (
        <div className='h-100 flex flex-column p-3'>
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
                        <div className='item-list' key={item.id_perfil}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.perfil}
                            </div>

                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.estado ? 'Activo' : 'Inactivo'}
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
                    rowKey='id_perfil'
                    dataSource={profiles}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_perfil'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'perfil',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'estado',
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
                        {profile.id_perfil > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormProfile
                    profile={profile}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

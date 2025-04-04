import { Icon, Search } from '@/components';
import { Department, Headquarter as HeadquarterInterface, State } from '@/interfaces';
import { RootState } from '@/redux';
import { httpGetAllDepartments, httpGetAllHeadquarter, httpGetAllStates } from '@/services';
import { Button, List, message, Modal, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormHeadquarter } from './FormHeadquarter';

export const EmptyHeadquarter: HeadquarterInterface = {
    id: 0,
    name: '',
    is_active: true
};

export const Headquarter = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Sedes';

    const [headquarters, setHeadquarters] = useState<Array<HeadquarterInterface>>([]);
    const [headquartersCopy, setHeadquartersCopy] = useState<Array<HeadquarterInterface>>([]);
    const [headquarter, setHeadquarter] = useState<HeadquarterInterface>(EmptyHeadquarter);
    const [modal, setModal] = useState(false);
    const [states, setStates] = useState<Array<State>>([]);
    const [departments, setDepartments] = useState<Array<Department>>([]);

    const [loading, setLoading] = useState(false);

    const handleSearch = (filter: string) => {
        let _headquarters = [...headquartersCopy];
        if (filter !== '')
            _headquarters = _headquarters.filter(headquarter => headquarter.name.toLowerCase().includes(filter.toLowerCase()));
        setHeadquarters(_headquarters);
    };

    const handleEdit = (headquarter: HeadquarterInterface) => {
        setHeadquarter(headquarter);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetAllHeadquarter()
            .then(res => {
                setHeadquarters(res);
                setHeadquartersCopy(res);
            })
            .catch(err => message.error(`Error al obtener datos de sedes: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGet();
        httpGetAllStates()
            .then(res => setStates(res))
            .catch(err => message.error(`Error al obtener datos de stados: ${err.message}`));
        httpGetAllDepartments()
            .then(res => setDepartments(res))
            .catch(err => message.error(`Error al obtener datos de departamentos: ${err.message}`));
    }, []);

    return (
        <div className='h-100 flex flex-column p-auto'>
            <div className='flex flex-md-column gap-3 justify-between'>
                <h3>{title}</h3>
                <div>
                    <Search onSearch={handleSearch} onReset={() => handleSearch('')} />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setHeadquarter(EmptyHeadquarter);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={headquarters}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.name}
                            </div>

                            <div>
                                <strong>Estadp EEUU: </strong>&nbsp;{item.state?.name}
                            </div>
                            <div>
                                <strong>Sede: </strong>&nbsp;{item.name}
                            </div>
                            <div className='flex-1'>
                                <strong>Estado/Departamento: </strong>&nbsp;{item?.state?.name ?? item?.department?.name}
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
                    dataSource={headquarters}
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
                            title: 'Estado EEUU',
                            dataIndex: 'state',
                            ellipsis: true,
                            sorter: true,
                            render: state => <span>{state?.name ?? 'Sin estado'}</span>
                        },
                        {
                            title: 'Departamento GT',
                            dataIndex: 'department',
                            ellipsis: true,
                            sorter: true,
                            render: department => <span>{department?.name ?? 'Sin departamento'}</span>
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
                    <h3 className='flex items-center gap-2'>
                        {headquarter.id > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                        <Tooltip
                            title='Solo se puede asignar Estado o Departamento a una sede, ya que esta define en qué país opera.'
                            placement='bottom'
                        >
                            <Icon.InfoCircle />
                        </Tooltip>
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormHeadquarter
                    {...{ headquarter, states, departments }}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

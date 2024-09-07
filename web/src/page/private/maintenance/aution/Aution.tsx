import { Icon } from '@/components';
import { Aution as TypeAution, EmptyAution } from '@/models';
import { RootState } from '@/redux';
import { Button, Input, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormAution } from './FormAution';
import { httpGetAutions } from '@/services';

export const Aution = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Subastas';

    const [aution, setAution] = useState<TypeAution>(EmptyAution);
    const [autions, setAutions] = useState<Array<TypeAution>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEdit = (item: TypeAution) => {
        setAution(item);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetAutions()
            .then(res => setAutions(res))
            .catch(err => message.error(`Erro http get autions: ${err.message}`))
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
                    <Input.Search placeholder='Buscar' onSearch={() => {}} enterButton />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setAution(EmptyAution);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={autions}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id_subasta}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.subasta}
                            </div>
                            <div className='flex-1'>
                                <strong>Alias: </strong>&nbsp;{item.alias}
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
                    pagination={{
                        position: ['none', 'bottomRight'],
                        showSizeChanger: true,
                        pageSizeOptions: [50, 100, 250, 500]
                    }}
                    className='table'
                    loading={loading}
                    showSorterTooltip={false}
                    rowKey='id_subasta'
                    dataSource={autions}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_subasta'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'subasta',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Alias',
                            dataIndex: 'alias',
                            ellipsis: true,
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
                title={
                    <h3>
                        {aution.id_subasta > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormAution
                    aution={aution}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

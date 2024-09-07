import { Icon } from '@/components';
import { EmptyCrane, Crane as TypeCrane } from '@/models';
import { RootState } from '@/redux';
import { Button, Input, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormCrane } from './FormCrane';
import { httpGetCrane } from '@/services';

export const Crane = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Gruas';

    const [crane, setCrane] = useState<TypeCrane>(EmptyCrane);
    const [cranes, setCranes] = useState<Array<TypeCrane>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEdit = (item: TypeCrane) => {
        setCrane({ ...item, id_subasta: item.subasta?.id_subasta });
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetCrane()
            .then(res => setCranes(res))
            .catch(err => message.error(`Error http get cranes: ${err.message}`))
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
                        setCrane(EmptyCrane);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={cranes}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id_subasta}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.grua}
                            </div>
                            <div className='flex-1'>
                                <strong>Subasta: </strong>&nbsp;{item.subasta?.subasta}
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
                    rowKey='id_grua'
                    dataSource={cranes}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_grua'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'grua',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Subasta',
                            dataIndex: 'subasta',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{value?.subasta}</span>
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
                        {crane.id_grua > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormCrane
                    crane={crane}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

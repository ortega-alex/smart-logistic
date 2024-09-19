import { RootState } from '@/redux';
import { Button, Input, List, Modal, Select, Table } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { EmptyQuoter, Quoter as TypeQuoter } from '@/models';
import { Icon } from '@/components';
import { FormQuoter } from './FormQuoter';

export const Quoter = () => {
    const deviceState = useSelector((store: RootState) => store.device);

    const [quoters, setQuoters] = useState<Array<TypeQuoter>>([]);
    const [quoter, setQuoter] = useState<TypeQuoter>(EmptyQuoter);
    const [loading, setLoading] = useState(false);
    const [modals, setModals] = useState<{ [key: string]: boolean }>({
        form: false,
        preview: false
    });

    const handleOnChangeModal = (name: string, open: boolean = true) => setModals({ [name]: open });
    const handleEdit = (item: TypeQuoter) => console.log(item);

    return (
        <div className='h-100 flex flex-column p-3'>
            <div className='flex flex-md-column gap-3 justify-between items-end'>
                <div className='flex flex-column'>
                    <label htmlFor='cliente'>Cliente</label>
                    <Select placeholder='Seleccione una opcion' />
                </div>
                <div>
                    <Input.Search placeholder='Buscar' onSearch={() => {}} enterButton />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setQuoter(EmptyQuoter);
                        handleOnChangeModal('form');
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={quoters}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id_cotizacion}>
                            <div className='flex-1'>
                                <strong>Cliente: </strong>&nbsp;{item.cliente}
                            </div>
                            <div className='flex-1'>
                                <strong>Vendedor: </strong>&nbsp;{item.vendedor}
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
                    dataSource={quoters}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_subasta'
                        },
                        {
                            title: 'Fecha',
                            dataIndex: 'subasta',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Vendedor',
                            dataIndex: 'alias',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Cliente',
                            dataIndex: 'alias',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Marca/Modelo',
                            dataIndex: 'alias',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Puerto de salida',
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
                open={modals.form}
                title={<h3>{quoter.id_cotizacion > 0 ? 'Editar' : 'Agregar'} Cotización</h3>}
                footer={null}
                onCancel={() => handleOnChangeModal('form', false)}
                centered
                destroyOnClose
            >
                <FormQuoter quoter={quoter} />
            </Modal>
        </div>
    );
};
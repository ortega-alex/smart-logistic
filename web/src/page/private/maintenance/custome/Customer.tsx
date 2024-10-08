import { Icon, Search, ViewFiles } from '@/components';
import { CustomerFile, EmptyCustomer, EmptyFile, TableParams, Customer as TypeCustomer } from '@/models';
import { RootState } from '@/redux';
import { httpDeleteCustomerFile, httpGetCustomerById, httpGetCustomerPaginationData } from '@/services';
import { Button, List, message, Modal, Popover, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormCustomer } from './FormCustomer';

export const Customer = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Clientes';

    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState<Array<TypeCustomer>>([]);
    const [customer, setCustomer] = useState<TypeCustomer>(EmptyCustomer);
    const [modals, setModals] = useState({
        customer: false,
        preview: false
    });
    const [file, setFile] = useState<CustomerFile>(EmptyFile);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 250
        }
    });
    const [filter, setFilter] = useState('');

    const hamdleChangeModal = (name: string, value: boolean = true) => setModals({ ...modals, [name]: value });

    const handleGet = () => {
        setLoading(true);
        httpGetCustomerPaginationData({
            ...tableParams,
            current: tableParams.pagination?.current,
            pageSize: tableParams.pagination?.pageSize,
            filter,
            sortOrder: tableParams.sortOrder === 'descend' ? 'DESC' : 'ASC'
        })
            .then(res => {
                setCustomers(res.data);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res.total
                    }
                });
            })
            .catch(err => message.error(`Error http get customers: ${err.message}`))
            .finally(() => setLoading(false));
    };

    const handleEdit = (customer: TypeCustomer) => {
        httpGetCustomerById(customer.id_cliente)
            .then(res => {
                if (res.message) message.warning(res.message);
                else {
                    setCustomer({ ...res, id_tipo_cliente: customer.tipo_cliente?.id_tipo_cliente });
                    hamdleChangeModal('customer');
                }
            })
            .catch(err => message.error(`Error http get customer by id: ${err.message}`));
    };

    const handleDeleteFile = (id: number) => {
        Modal.confirm({
            title: 'Eliminar archivo',
            content: 'Estas seguro de querer eliminar este archivo?',
            okText: 'Si',
            cancelText: 'No',
            onOk: () =>
                httpDeleteCustomerFile(id)
                    .then(res => {
                        message.info(res.message);
                        handleEdit(customer);
                    })
                    .catch(err => message.error(`Error http delete customer file by id: ${err.message}`))
        });
    };

    const handleTableChange: TableProps<TypeCustomer>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setCustomers([]);
    };

    useEffect(() => {
        handleGet();
    }, [JSON.stringify(tableParams), filter]);

    return (
        <div className='h-100 flex flex-column p-3'>
            <div className='flex flex-md-column gap-3 justify-between'>
                <h3>{title}</h3>
                <div>
                    <Search onSearch={(value: string) => setFilter(value)} onReset={() => setFilter('')} />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setCustomer(EmptyCustomer);
                        hamdleChangeModal('customer');
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={customers}
                    renderItem={item => (
                        <div className='item-list' key={item.id_cliente}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.cliente}
                            </div>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.tipo_cliente?.tipo_cliente}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div className='flex-1'>
                                    <strong>Telefono: </strong>&nbsp;{item.telefono_celular}
                                </div>
                                <div className='flex-1'>
                                    <strong>Correo: </strong>&nbsp;{item.correo}
                                </div>
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
                        ...tableParams.pagination,
                        showSizeChanger: true,
                        pageSizeOptions: [50, 100, 250, 500]
                    }}
                    onChange={handleTableChange}
                    className='table'
                    loading={loading}
                    showSorterTooltip={false}
                    rowKey='id_cliente'
                    dataSource={customers}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_cliente',
                            sorter: true
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'cliente',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Tipo de Cliente',
                            dataIndex: 'tipo_cliente',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{value?.tipo_cliente}</span>
                        },
                        {
                            title: 'Telefono',
                            dataIndex: 'telefono_celular',
                            sorter: true
                        },
                        {
                            title: 'Correo',
                            dataIndex: 'correo',
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
                open={modals.customer}
                footer={null}
                title={
                    <div className='flex flex-row gap-1'>
                        {customer?.archivos && customer.archivos?.length > 0 && (
                            <Popover
                                placement='bottomLeft'
                                content={
                                    <>
                                        {customer.archivos?.map(item => (
                                            <div key={item.id_archivo} className='flex flex-row justify-between'>
                                                <Button
                                                    type='link'
                                                    size='small'
                                                    icon={<Icon.Attachment />}
                                                    onClick={() => {
                                                        setFile(item);
                                                        hamdleChangeModal('preview');
                                                    }}
                                                >
                                                    {item.nombre}
                                                </Button>
                                                <Button
                                                    size='small'
                                                    type='text'
                                                    htmlType='button'
                                                    danger
                                                    ghost
                                                    icon={<Icon.Trash />}
                                                    onClick={() => handleDeleteFile(item.id_archivo)}
                                                />
                                            </div>
                                        ))}
                                    </>
                                }
                            >
                                <Button type='link' htmlType='button' ghost icon={<Icon.Attachment />}>
                                    Archivos
                                </Button>
                            </Popover>
                        )}
                        <h3 className='text-primary'>
                            {customer.id_cliente > 0 ? 'Editar' : 'Nuevo'} {title.substring(0, title.length - 1)}
                        </h3>
                    </div>
                }
                onCancel={() => hamdleChangeModal('customer', false)}
                centered
                destroyOnClose
            >
                <FormCustomer
                    customer={customer}
                    onClose={() => {
                        hamdleChangeModal('customer', false);
                        handleGet();
                    }}
                />
            </Modal>

            <Modal open={modals.preview} footer={null} onCancel={() => hamdleChangeModal('preview', false)} centered destroyOnClose>
                <ViewFiles file={file} />
            </Modal>
        </div>
    );
};

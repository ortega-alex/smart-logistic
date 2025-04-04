import { Icon, Search, ViewFiles } from '@/components';
import { CustomerFile, TableParams, Customer as TypeCustomer } from '@/interfaces';
import { EmptyCustomer, EmptyCustomerFile } from '@/constants';
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
    const [file, setFile] = useState<CustomerFile>(EmptyCustomerFile);
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
        httpGetCustomerById(customer.id)
            .then(res => {
                if (res.message) message.warning(res.message);
                else {
                    setCustomer({ ...res, id_tipo_cliente: customer.type?.id });
                    hamdleChangeModal('customer');
                }
            })
            .catch(err => message.error(`Error http get customer by id: ${err.message}`));
    };

    const handleDeleteFile = (id: string) => {
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
        <div className='h-100 flex flex-column p-auto'>
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
                        <div className='item-list' key={item.id}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.name}
                            </div>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.type?.name}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div className='flex-1'>
                                    <strong>Telefono: </strong>&nbsp;{item.phone_number}
                                </div>
                                <div className='flex-1'>
                                    <strong>Correo: </strong>&nbsp;{item.email}
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
                    rowKey='id'
                    dataSource={customers}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id',
                            sorter: true
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'name',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Tipo de Cliente',
                            dataIndex: 'type',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{value?.name}</span>
                        },
                        {
                            title: 'Telefono',
                            dataIndex: 'phone_number',
                            sorter: true
                        },
                        {
                            title: 'Correo',
                            dataIndex: 'email',
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
                open={modals.customer}
                footer={null}
                title={
                    <div className='flex flex-row gap-1'>
                        {customer?.files && customer.files?.length > 0 && (
                            <Popover
                                placement='bottomLeft'
                                content={
                                    <>
                                        {customer.files?.map(item => (
                                            <div key={item.id} className='flex flex-row justify-between'>
                                                <Button
                                                    type='link'
                                                    size='small'
                                                    icon={<Icon.Attachment />}
                                                    onClick={() => {
                                                        setFile(item);
                                                        hamdleChangeModal('preview');
                                                    }}
                                                >
                                                    {item.name}
                                                </Button>
                                                <Button
                                                    size='small'
                                                    type='text'
                                                    htmlType='button'
                                                    danger
                                                    ghost
                                                    icon={<Icon.Trash />}
                                                    onClick={() => handleDeleteFile(item.id)}
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
                            {customer.id > 0 ? 'Editar' : 'Nuevo'} {title.substring(0, title.length - 1)}
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
                <ViewFiles path={file.path} />
            </Modal>
        </div>
    );
};

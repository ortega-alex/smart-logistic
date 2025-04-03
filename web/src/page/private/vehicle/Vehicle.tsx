import { Icon, Search } from '@/components';
import { privateRoutes } from '@/constants';
import { useVehicle } from '@/hooks';
import { Customer, TableParams, Vehicle as VehicleInterface } from '@/interfaces';
import { RootState } from '@/redux';
import { httpGetCustomer, httpGetVehiclesPagination } from '@/services';
import { getDateFormat } from '@/utilities';
import { Button, List, Modal, Select, Table, TableProps, Tag, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewVehicle } from './ViewVehicle';

export const Vehicle = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const { lot } = useParams();
    const navigate = useNavigate();
    const { vehicle, addVehicle } = useVehicle();

    const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [vehicles, setVehicles] = useState<Array<VehicleInterface>>([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 250
        }
    });
    const [filter, setFilter] = useState('');
    const [modal, setModal] = useState(false);

    const handleTableChange: TableProps<VehicleInterface>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setVehicles([]);
    };

    const handleViewDetail = (vehicle: VehicleInterface) => {
        addVehicle(vehicle);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetVehiclesPagination({
            ...tableParams,
            current: tableParams.pagination?.current,
            pageSize: tableParams.pagination?.pageSize,
            filter,
            sortOrder: tableParams.sortOrder === 'descend' ? 'DESC' : 'ASC'
        })
            .then(res => {
                setVehicles(res.data);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res.total
                    }
                });

                if (lot) {
                    const item = res.data.find((item: VehicleInterface) => item.quoter.lot === lot);
                    if (item) handleViewDetail(item);
                    navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.VEHICLES}`, { replace: true });
                }
            })
            .catch(err => message.error(`Error http get vehicles: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        httpGetCustomer()
            .then(res => setCustomers(res?.filter((item: Customer) => item.is_active)))
            .catch(err => message.error(`Error http get customers: ${err.message}}`));
    }, []);

    useEffect(() => {
        handleGet();
    }, [JSON.stringify(tableParams), filter]);

    return (
        <div className='h-100 flex flex-column p-3'>
            <div className='flex flex-md-column gap-3 justify-between items-end mb-3'>
                <div className='flex flex-column w-md-100'>
                    <label htmlFor='cliente'>Cliente</label>
                    <Select
                        placeholder='Selecciones una opción'
                        options={customers.filter(item => item.is_active).map(item => ({ label: item.name, value: item.id }))}
                        onChange={value => setFilter(value)}
                        allowClear
                        style={{ minWidth: 200 }}
                    />
                </div>

                <div className='flex flex-row gap-2 items-center w-md-100'>
                    <Tooltip title='Recargar'>
                        <Button type='text' htmlType='button' icon={<Icon.Reload />} onClick={() => handleGet()} />
                    </Tooltip>
                    <Search onSearch={(value: string) => setFilter(value)} onReset={() => setFilter('')} />
                </div>
                <Button type='primary' htmlType='button' onClick={() => {}} className='w-md-100'>
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={vehicles}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id}>
                            <div className='flex-1'>
                                <strong>Cliente: </strong>&nbsp;{item.quoter.customer?.id}
                            </div>
                            <div className='flex-1'>
                                <strong>Vendedor: </strong>&nbsp;{item.quoter.customer?.name}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.is_active ? 'Activo' : 'Inactivo'}
                                </div>
                                <Button type='link' danger htmlType='button' icon={<Icon.Edit />} onClick={() => handleViewDetail(item)}>
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
                    dataSource={vehicles}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id',
                            sorter: true
                        },
                        {
                            title: 'Fecha',
                            dataIndex: 'created_at',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{getDateFormat(value, 'DD/MM/YYYY')}</span>
                        },
                        {
                            title: 'Loter',
                            dataIndex: 'lot',
                            ellipsis: true,
                            sorter: true,
                            render: (_, { quoter }) => <span>{quoter?.lot}</span>
                        },
                        {
                            title: 'Vendedor',
                            dataIndex: 'seller',
                            ellipsis: true,
                            sorter: true,
                            render: (_, { quoter }) => <span>{quoter?.seller?.name}</span>
                        },
                        {
                            title: 'Cliente',
                            dataIndex: 'customer',
                            ellipsis: true,
                            sorter: true,
                            render: (_, { quoter }) => <span>{quoter?.customer?.name}</span>
                        },
                        {
                            title: 'Tipo de Trasporte',
                            dataIndex: 'transportType',
                            ellipsis: true,
                            sorter: true,
                            render: (_, { quoter }) => <span>{quoter?.transportType?.name}</span>
                        },
                        {
                            title: 'Sede',
                            dataIndex: 'headquarter',
                            ellipsis: true,
                            sorter: true,
                            render: (_, { quoter }) => <span>{quoter?.headquarter?.name}</span>
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'importState',
                            sorter: true,
                            render: importState => <Tag color={importState.color}>{importState.name}</Tag>
                        },
                        {
                            title: 'Opciones',
                            dataIndex: 'operacion',
                            width: 80,
                            render: (_, item) => (
                                <Button
                                    style={{ width: 40 }}
                                    icon={<Icon.Edit />}
                                    type='text'
                                    size='small'
                                    onClick={() => handleViewDetail(item)}
                                >
                                    Ver
                                </Button>
                            )
                        }
                    ]}
                />
            )}

            <Modal
                open={modal}
                title={
                    <h3>
                        Vehiculo <Tag color={vehicle.importState.color}>{vehicle.importState.name}</Tag>
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
                width={1200}
            >
                <ViewVehicle />
            </Modal>
        </div>
    );
};

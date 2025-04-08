import { Icon, Search } from '@/components';
import { privateRoutes } from '@/constants';
import { useVehicle } from '@/hooks';
import { Customer, Session, TableParams, Vehicle as VehicleInterface } from '@/interfaces';
import { RootState } from '@/redux';
import { httpGetCustomer, httpGetVehiclesPagination } from '@/services';
import { getDateFormat } from '@/utilities';
import { Button, List, Modal, Pagination, Select, Table, TableProps, Tag, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewVehicle } from './ViewVehicle';

export const Vehicle = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const sessionState: Session = useSelector((store: RootState) => store.session);
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
            sortOrder: tableParams.sortOrder === 'descend' ? 'DESC' : 'ASC',
            session_id: sessionState.session_id
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
            <div className='flex flex-md-column gap-2 justify-between items-end mb-2'>
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
                <>
                    <div className='vh-66 overflow-y'>
                        <List
                            dataSource={vehicles}
                            loading={loading}
                            rowKey='id'
                            renderItem={item => (
                                <div className='item-list text-capitalize' key={item.id}>
                                    <div className='flex gap-1 items-center'>
                                        <Icon.Calendar />
                                        {item.created_at}
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Icon.User />
                                        {item.quoter.seller?.name}
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Icon.Users />
                                        {item.quoter.customer?.name}
                                    </div>
                                    <div className='flex flex-row justify-start gap-2'>
                                        <div className='flex items-center gap-1'>
                                            <Icon.Car2 /> {item.quoter.lot}
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <Icon.Car /> {item.quoter.transportType?.name}
                                        </div>
                                    </div>
                                    <div className='flex flex-row justify-between'>
                                        <div>
                                            <strong>Estado: </strong>&nbsp;{item.is_active ? 'Activo' : 'Inactivo'}
                                        </div>
                                        <Button
                                            type='link'
                                            danger
                                            htmlType='button'
                                            icon={<Icon.Edit />}
                                            onClick={() => handleViewDetail(item)}
                                        >
                                            Editar
                                        </Button>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <Pagination
                        className='mt-3'
                        align='end'
                        {...tableParams.pagination}
                        onChange={current =>
                            setTableParams({
                                pagination: {
                                    ...tableParams.pagination,
                                    current
                                }
                            })
                        }
                    />
                </>
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
                            render: importState => (
                                <Tag color={importState.color}>
                                    <span className='text-black'>{importState.name}</span>
                                </Tag>
                            )
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
                        Vehículo{' '}
                        <Tag color={vehicle.importState.color}>
                            <span className='text-black'>{vehicle.importState.name}</span>
                        </Tag>
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

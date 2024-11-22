import { Icon, Search } from '@/components';
import { Customer, Vehicles as TypeVehicles, TableParams, privateRoutes, EmptyVehicle, _SERVER, publicRoutes } from '@/models';
import { RootState } from '@/redux';
import { httpGetCustomer, httpGetVehiclesGetById, httpGetVehiclesPagination } from '@/services';
import { copyToClipboard, encryptData, getDateFormat } from '@/utilities';
import { Button, List, message, Modal, Select, Table, TableProps, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewVehicles } from './ViewVehicles';
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';

export const Vehicles = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const { lote } = useParams();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [vehicles, setVehicles] = useState<Array<TypeVehicles>>([]);
    const [vehicle, setVehicle] = useState<TypeVehicles>(EmptyVehicle);
    const [loading, setLoading] = useState({
        data: false,
        services: false
    });
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 250
        }
    });
    const [filter, setFilter] = useState('');
    const [modal, setModal] = useState(false);

    const handleOnChangeLoading = (name: string, value: boolean) => setLoading({ ...loading, [name]: value });

    const handleTableChange: TableProps<TypeVehicles>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setVehicles([]);
    };

    const handleGenerateUrl = async () => {
        try {
            if (!vehicle.cotizacion.cliente?.correo)
                return message.warning('El cliente no cuenta con correo, por favor edite el cliente antes de generar la url');
            const data = {
                id: vehicle.cotizacion.cliente?.id_cliente,
                correo: vehicle.cotizacion.cliente?.correo
            };
            const token = window.btoa(JSON.stringify(data));
            const baseUrl = window.location.href.split('#')[0];
            const url = `${baseUrl}#/${publicRoutes.SING_IN_CUSTOMER}/${token}`;
            await copyToClipboard(url);
            message.success(`Copiado el url al portapapeles`);
        } catch (error) {
            message.error(`Ha ocurrido un error: ${error}`);
        }
    };

    const handleEdit = (id_vehiculo: number) => {
        handleOnChangeLoading('services', true);
        httpGetVehiclesGetById(id_vehiculo)
            .then(res => {
                setVehicle(res);
                setModal(true);
            })
            .catch(err => message.error(`Error http get vehicles: ${err.message}`))
            .finally(() => handleOnChangeLoading('services', false));
    };

    const handleGet = () => {
        handleOnChangeLoading('data', true);
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

                if (lote) {
                    const item = res.data.find((item: TypeVehicles) => item.cotizacion.lote === lote);
                    if (item) handleEdit(item.id_vehiculo);
                    navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.VEHICLES}`, { replace: true });
                }
            })
            .catch(err => message.error(`Error http get vehicles: ${err.message}`))
            .finally(() => handleOnChangeLoading('data', false));
    };

    useEffect(() => {
        httpGetCustomer()
            .then(res => setCustomers(res?.filter((item: Customer) => item.estado)))
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
                        options={customers.filter(item => item.estado).map(item => ({ label: item.cliente, value: item.id_cliente }))}
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
                    loading={loading.data}
                    renderItem={item => (
                        <div className='item-list' key={item.id_vehiculo}>
                            <div className='flex-1'>
                                <strong>Cliente: </strong>&nbsp;{item.cotizacion.cliente?.cliente}
                            </div>
                            <div className='flex-1'>
                                <strong>Vendedor: </strong>&nbsp;{item.cotizacion.vendedor?.nombre}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.estado ? 'Activo' : 'Inactivo'}
                                </div>
                                <Button
                                    type='link'
                                    danger
                                    htmlType='button'
                                    icon={<Icon.Edit />}
                                    onClick={() => handleEdit(item.id_vehiculo)}
                                >
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
                    loading={loading.data}
                    showSorterTooltip={false}
                    rowKey='id_vehiculo'
                    dataSource={vehicles}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_vehiculo',
                            sorter: true
                        },
                        {
                            title: 'Fecha',
                            dataIndex: 'fecha_creacion',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{getDateFormat(value, 'DD/MM/YYYY')}</span>
                        },
                        {
                            title: 'Loter',
                            dataIndex: 'lote',
                            ellipsis: true,
                            sorter: true,
                            render: (_, { cotizacion }) => <span>{cotizacion?.lote}</span>
                        },
                        {
                            title: 'Vendedor',
                            dataIndex: 'vendedor',
                            ellipsis: true,
                            sorter: true,
                            render: (_, { cotizacion }) => <span>{cotizacion?.vendedor?.nombre}</span>
                        },
                        {
                            title: 'Cliente',
                            dataIndex: 'cliente',
                            ellipsis: true,
                            sorter: true,
                            render: (_, { cotizacion }) => <span>{cotizacion?.cliente?.cliente}</span>
                        },
                        {
                            title: 'Marca y Modelo',
                            dataIndex: 'cotizacion',
                            ellipsis: true,
                            render: value => (
                                <span>
                                    {value.marca} - {value.modelo}
                                </span>
                            )
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'estado_importacion',
                            sorter: true,
                            render: value => <span>{value.estado_importacion}</span>
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
                                    onClick={() => handleEdit(item.id_vehiculo)}
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
                        Vehiculo <Tag color={vehicle.estado_importacion.color}>{vehicle.estado_importacion.estado_importacion}</Tag>
                    </h3>
                }
                footer={() => (
                    <div className='flex  flex-row gap-3 justify-end'>
                        <Button type='link' icon={<Icon.Copy />} onClick={handleGenerateUrl}>
                            Url Cliente
                        </Button>
                    </div>
                )}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
                width={1200}
            >
                <ViewVehicles vehicle={vehicle} />
            </Modal>
        </div>
    );
};

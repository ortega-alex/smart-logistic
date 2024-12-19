import { Icon, Search } from '@/components';
import { Customer, privateRoutes, Vehicles } from '@/models';
import { RootState } from '@/redux';
import { httpGetVehiclesByCustomerId, httpImportHistoryUploadInvoice } from '@/services';
import { getDateFormat } from '@/utilities';
import { Alert, Button, List, message, Table, Tooltip, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CustomerOrders = () => {
    const deviceState: Boolean = useSelector((store: RootState) => store.device);
    const sessionCustomerState: Customer = useSelector((store: RootState) => store.session_customer);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [vehicles, setVehicles] = useState<Array<Vehicles>>([]);
    const [filter, setFilter] = useState('');

    const handleViewDetail = (id: number) => navigate(`/${privateRoutes.PRIVATE_CUSTOMER}/${privateRoutes.CUSTOMER_ORDER_DETAIL}/${id}`);

    const handleGet = () => {
        setLoading(true);
        httpGetVehiclesByCustomerId(sessionCustomerState.id_cliente)
            .then(res => setVehicles(res))
            .catch(err => message.error(`Error http get vehicles by customer id ${err.message}`))
            .finally(() => setLoading(false));
    };

    const handleIploadInvoice = (file: any, vehicle: Vehicles) => {
        const body = {
            file,
            id_cliente: sessionCustomerState.id_cliente,
            id_estado_importacion: vehicle.estado_importacion.id_estado_importacion + 1,
            descripcion: 'El cliente ha cargado la factura',
            visible_cliente: true
        };
        httpImportHistoryUploadInvoice(vehicle.id_vehiculo, body)
            .then(res => {
                if (res.success) {
                    message.success(res.message);
                    handleGet();
                } else message.warning(res.message);
            })
            .catch(err => message.error(`Error http upload invoice ${err.message}`));
    };

    useEffect(() => {
        console.log(filter);
        handleGet();
    }, []);

    return (
        <div className='h-100 flex flex-column p-3'>
            <div className='flex justify-center mb-3'>
                <Tooltip title='Recargar'>
                    <Button type='text' htmlType='button' icon={<Icon.Reload />} onClick={() => handleGet()} />
                </Tooltip>
                <Search onSearch={(value: string) => setFilter(value)} onReset={() => setFilter('')} />
            </div>
            {deviceState ? (
                <List
                    dataSource={vehicles}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id_vehiculo}>
                            <div className='flex-1'>
                                <strong>fecha_creacion: </strong>&nbsp;{getDateFormat(item.fecha_creacion ?? '', 'DD/MM/YYYY')}
                            </div>
                            <div className='flex-1'>
                                <strong>Lote: </strong>&nbsp;{item.cotizacion.lote}
                            </div>
                            <div className='flex-1'>
                                <strong>Marca y Modelo: </strong>&nbsp;{item.cotizacion.marca} - {item.cotizacion.modelo}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.estado_importacion.estado_importacion}
                                </div>
                                <Button
                                    type='link'
                                    danger
                                    htmlType='button'
                                    icon={<Icon.Eye />}
                                    onClick={() => handleViewDetail(item.id_vehiculo)}
                                >
                                    Ver
                                </Button>
                            </div>
                        </div>
                    )}
                />
            ) : (
                <div className='flex justify-center mx-5'>
                    <Table
                        size='small'
                        rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                        pagination={false}
                        className='table'
                        loading={loading}
                        showSorterTooltip={false}
                        rowKey='id_subasta'
                        dataSource={vehicles}
                        columns={[
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
                                    <div className='flex flex-row justify-center gap-2'>
                                        {item.estado_importacion.id_estado_importacion === 1 && (
                                            <Tooltip title='Cargar factura'>
                                                <Upload
                                                    accept={'.pdf'}
                                                    customRequest={info => handleIploadInvoice(info.file, item)}
                                                    onChange={info => (info.file.status = 'done')}
                                                    maxCount={1}
                                                >
                                                    <Button style={{ width: 40 }} icon={<Icon.Upload />} type='text' size='small' />
                                                </Upload>
                                            </Tooltip>
                                        )}
                                        <Tooltip title='Ver detalle'>
                                            <Button
                                                style={{ width: 40 }}
                                                icon={<Icon.Eye />}
                                                type='text'
                                                size='small'
                                                onClick={() => handleViewDetail(item.id_vehiculo)}
                                            />
                                        </Tooltip>
                                    </div>
                                )
                            }
                        ]}
                    />
                </div>
            )}
            {vehicles.some(item => item.estado_importacion.id_estado_importacion === 1) && (
                <Alert message='Existen facturas pendientes de cargar' type='warning' />
            )}
        </div>
    );
};

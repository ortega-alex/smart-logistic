import { Icon, Search } from '@/components';
import { privateRoutes } from '@/constants';
import { Customer, Vehicle } from '@/interfaces';
import { RootState } from '@/redux';
import { httpAddImportHistory, httpGetVehiclesByCustomerId } from '@/services';
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
    const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);
    const [filter, setFilter] = useState('');

    const handleViewDetail = (id: number) => navigate(`/${privateRoutes.PRIVATE_CUSTOMER}/${privateRoutes.CUSTOMER_ORDER_DETAIL}/${id}`);

    const handleGet = () => {
        setLoading(true);
        httpGetVehiclesByCustomerId(sessionCustomerState.id)
            .then(res => setVehicles(res))
            .catch(err => message.error(`Error http get vehicles by customer id ${err.message}`))
            .finally(() => setLoading(false));
    };

    const handleIploadInvoice = (path: any, vehicle: Vehicle) => {
        httpAddImportHistory(vehicle.id, {
            path,
            customer_id: sessionCustomerState.id,
            import_state_id: vehicle.importState.id + 1,
            description: 'El cliente ha cargado la factura',
            is_visible_customer: true
        })
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
                        <div className='item-list' key={item.id}>
                            <div className='flex-1'>
                                <strong>fecha_creacion: </strong>&nbsp;{getDateFormat(item.created_at ?? '', 'DD/MM/YYYY')}
                            </div>
                            <div className='flex-1'>
                                <strong>Lote: </strong>&nbsp;{item.quoter.lot}
                            </div>
                            <div className='flex-1'>
                                <strong>Marca y Modelo: </strong>&nbsp;{item.quoter.mark} - {item.quoter.model}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.importState.name}
                                </div>
                                <Button type='link' danger htmlType='button' icon={<Icon.Eye />} onClick={() => handleViewDetail(item.id)}>
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
                        rowKey='id'
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
                                dataIndex: 'lot',
                                ellipsis: true,
                                sorter: true,
                                render: (_, { quoter }) => <span>{quoter?.lot}</span>
                            },
                            {
                                title: 'Marca y Modelo',
                                dataIndex: 'quoter',
                                ellipsis: true,
                                render: quoter => (
                                    <span>
                                        {quoter.mark} - {quoter.model}
                                    </span>
                                )
                            },
                            {
                                title: 'Estado',
                                dataIndex: 'importState',
                                sorter: true,
                                render: importState => <span>{importState.name}</span>
                            },
                            {
                                title: 'Opciones',
                                dataIndex: 'operacion',
                                width: 80,
                                render: (_, item) => (
                                    <div className='flex flex-row justify-center gap-2'>
                                        {item.importState.id === 1 && (
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
                                                onClick={() => handleViewDetail(item.id)}
                                            />
                                        </Tooltip>
                                    </div>
                                )
                            }
                        ]}
                    />
                </div>
            )}
            {vehicles.some(item => item.importState.id === 1) && <Alert message='Existen facturas pendientes de cargar' type='warning' />}
        </div>
    );
};

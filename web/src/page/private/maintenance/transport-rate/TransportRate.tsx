import { Icon, Search } from '@/components';
import {
    CustomerType,
    Headquarter,
    HeadquarterFilter,
    TransportRate as TransportRateInterface,
    TransportType,
    VehicleType
} from '@/interfaces';
import { RootState } from '@/redux';
import {
    httpGetAllHeadquarter,
    httpGetAllTransportRates,
    httpGetAllTransportTypes,
    httpGetAllVehicleType,
    httpGetCustomerType,
    httpGetTransportRateById
} from '@/services';
import { commaSeparateNumber } from '@/utilities';
import { Button, List, message, Modal, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormTransportRate } from './FormTransportRate';

export const EmptyTransportRate: TransportRateInterface = {
    id: '',
    rate: 0,
    is_active: true
};

export const TransportRate = () => {
    const title = 'Tarifas Transporte';
    const deviceState = useSelector((store: RootState) => store.device);
    const sessionState = useSelector((store: RootState) => store.session);

    const [transportRates, settransportRates] = useState<Array<TransportRateInterface>>([]);
    const [transportRatesCopy, settransportRatesCopy] = useState<Array<TransportRateInterface>>([]);
    const [transportRate, settransportRate] = useState<TransportRateInterface>(EmptyTransportRate);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [vehiclesType, setVehiclesType] = useState<Array<VehicleType>>([]);
    const [transportsType, setTransportsType] = useState<Array<TransportType>>([]);
    const [headquarters, setHeadquarters] = useState<Array<Headquarter>>([]);
    const [customerTypes, setCustomerTypes] = useState<Array<CustomerType>>([]);

    const handleSearch = (filter: string) => {
        let _transportRates = [...transportRatesCopy];
        if (filter !== '')
            _transportRates = _transportRates.filter(
                transportRate =>
                    transportRate?.customerType?.name.toLowerCase().includes(filter.toLowerCase()) ||
                    transportRate?.transportType?.name.toLowerCase().includes(filter.toLowerCase()) ||
                    transportRate?.vehicleType?.name.toLowerCase().includes(filter.toLowerCase()) ||
                    transportRate?.headquarter?.name.toLowerCase().includes(filter.toLowerCase())
            );
        settransportRates(_transportRates);
    };

    const handleEdit = (id: string) => {
        httpGetTransportRateById(id)
            .then(res => {
                settransportRate(res);
                setModal(true);
            })
            .catch(err => message.error(`Error http get transport rate by id: ${err.message}`));
    };

    const handleGet = () => {
        setLoading(true);
        httpGetAllTransportRates()
            .then(res => {
                settransportRates(res);
                settransportRatesCopy(res);
            })
            .catch(err => message.error(`Error al obtener datos de transportes: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGet();
        httpGetAllVehicleType()
            .then(res => setVehiclesType(res))
            .catch(err => message.error(`Error al obtener datos de tipos de vehiculos: ${err.message}`));
        httpGetAllTransportTypes()
            .then(res => setTransportsType(res))
            .catch(err => message.error(`Error al obtener datos de tipos de transporte: ${err.message}`));
        httpGetAllHeadquarter(HeadquarterFilter.EEUU)
            .then(res => setHeadquarters(res))
            .catch(err => message.error(`Error al obtener datos de sedes: ${err.message}`));
        httpGetCustomerType()
            .then(res => setCustomerTypes(res))
            .catch(err => message.error(`Error al obtener datos de usuarios: ${err.message}`));
    }, []);

    return (
        <div className='h-100 flex flex-column p-auto'>
            <div className='flex flex-md-column gap-3 justify-between'>
                <h3>{title}</h3>
                <div>
                    <Search onSearch={handleSearch} onReset={() => handleSearch('')} />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        settransportRate(EmptyTransportRate);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={transportRates}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{commaSeparateNumber(item.rate)}
                            </div>

                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.is_active ? 'Activo' : 'Inactivo'}
                                </div>
                                <Button type='link' danger htmlType='button' icon={<Icon.Edit />} onClick={() => handleEdit(item.id)}>
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
                    pagination={false}
                    className='table'
                    loading={loading}
                    showSorterTooltip={false}
                    rowKey='id'
                    dataSource={transportRates}
                    columns={[
                        {
                            title: 'headquarter',
                            dataIndex: 'headquarter',
                            render: headquarter => <span>{headquarter?.name}</span>
                        },
                        {
                            title: 'transportType',
                            dataIndex: 'transportType',
                            render: transportType => <span>{transportType?.name}</span>
                        },
                        {
                            title: 'customerType',
                            dataIndex: 'customerType',
                            render: customerType => <span>{customerType?.name}</span>
                        },
                        {
                            title: 'vehicleType',
                            dataIndex: 'vehicleType',
                            render: vehicleType => <span>{vehicleType?.name}</span>
                        },
                        {
                            title: 'Rol',
                            dataIndex: 'rate',
                            render: value => <span>{commaSeparateNumber(value)}</span>
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
                                        onClick={() => handleEdit(item.id)}
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
                    <h3 className='flex items-center gap-2'>
                        {transportRate.id !== '' ? 'Editar' : 'Agregar'} {title}
                        <Tooltip
                            title='Permite agregar tarifas de transporte para un tipo de vehiculo, transporte, sede y topo de cliente'
                            placement='bottom'
                        >
                            <Icon.InfoCircle />
                        </Tooltip>
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormTransportRate
                    {...{ sessin: sessionState, transportRate, vehiclesType, transportsType, headquarters, customerTypes }}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

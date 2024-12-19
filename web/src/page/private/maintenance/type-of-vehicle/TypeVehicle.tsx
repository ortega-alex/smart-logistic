import { Icon, Search } from '@/components';
import { EmptyTypeVehicle, TypeVehicle as TypeTypeVehicle } from '@/models';
import { RootState } from '@/redux';
import { httpGetTypeVehicles } from '@/services';
import { Button, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormTypeVehicle } from './FormTypeVehicle';

export const TypeVehicle = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Tipos de Vehiculos';

    const [typeVehicle, setTypeVehicle] = useState<TypeTypeVehicle>(EmptyTypeVehicle);
    const [typeVehicles, setTypeVehicles] = useState<Array<TypeTypeVehicle>>([]);
    const [typeVehiclesCopy, setTypeVehiclesCopy] = useState<Array<TypeTypeVehicle>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnSearch = (value: string) => {
        let _type_vehicles = [...typeVehiclesCopy];
        if (value.trim() !== '')
            _type_vehicles = _type_vehicles.filter(
                item => item.id_tipo_vehiculo === Number(value) || item.tipo_vehiculo.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
        setTypeVehicles(_type_vehicles);
    };

    const handleEdit = (item: TypeTypeVehicle) => {
        setTypeVehicle(item);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetTypeVehicles()
            .then(res => {
                setTypeVehicles(res);
                setTypeVehiclesCopy(res);
            })
            .catch(err => message.error(`Error http get ports: ${err.message}`))
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
                    <Search onSearch={handleOnSearch} onReset={() => handleOnSearch('')} />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setTypeVehicle(EmptyTypeVehicle);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={typeVehicles}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id_tipo_vehiculo}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.tipo_vehiculo}
                            </div>
                            <div className='flex-1'>
                                <strong>Costo: </strong>&nbsp;{item.porcentaje_costo}%
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
                    rowKey='id_tipo_vehiculo'
                    dataSource={typeVehicles}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_tipo_vehiculo'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'tipo_vehiculo',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Costo',
                            dataIndex: 'porcentaje_costo',
                            sorter: true,
                            render: value => `${value}%`
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
                        {typeVehicle.id_tipo_vehiculo > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormTypeVehicle
                    typeVehicle={typeVehicle}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

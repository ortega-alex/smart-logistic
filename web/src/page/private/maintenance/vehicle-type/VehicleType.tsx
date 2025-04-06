import { Icon, PageHeader } from '@/components';
import { VehicleType as VehicleTypesInterface } from '@/interfaces';
import { RootState } from '@/redux';
import { httpGetAllVehicleType } from '@/services';
import { Button, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormVehicleType } from './FormVehicleType';

export const EmptyVehicleType: VehicleTypesInterface = {
    id: 0,
    name: '',
    is_active: true
};

export const VehicleType = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Tipos de Vehiculos';

    const [vehicleType, setVehicleType] = useState<VehicleTypesInterface>(EmptyVehicleType);
    const [vehicleTypes, setVehicleTypes] = useState<Array<VehicleTypesInterface>>([]);
    const [vehicleTypesCopy, setVehicleTypesCopy] = useState<Array<VehicleTypesInterface>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnSearch = (value: string) => {
        let _type_vehicles = [...vehicleTypesCopy];
        if (value.trim() !== '')
            _type_vehicles = _type_vehicles.filter(
                item => item.id === Number(value) || item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
        setVehicleTypes(_type_vehicles);
    };

    const handleEdit = (item: VehicleTypesInterface) => {
        setVehicleType(item);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetAllVehicleType()
            .then(res => {
                setVehicleTypes(res);
                setVehicleTypesCopy(res);
            })
            .catch(err => message.error(`Error http get ports: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className='h-100 flex flex-column p-auto'>
            <PageHeader
                title={title}
                onGet={handleGet}
                onSearch={handleOnSearch}
                onAdd={() => {
                    setVehicleType(EmptyVehicleType);
                    setModal(true);
                }}
            />

            {deviceState ? (
                <div className='vh-75 overflow-y'>
                    <List
                        dataSource={vehicleTypes}
                        loading={loading}
                        rowKey='id'
                        renderItem={item => (
                            <div className='item-list text-capitalize' key={item.id}>
                                <div className='flex-1'>
                                    <strong>Nombre: </strong>&nbsp;{item.name}
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
                </div>
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
                    rowKey='id'
                    dataSource={vehicleTypes}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'name',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'is_active',
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
                        {vehicleType.id > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormVehicleType
                    vehicleType={vehicleType}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

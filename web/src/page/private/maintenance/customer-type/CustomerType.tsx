import { Icon, Search } from '@/components';
import { EmptyCustomerType } from '@/constants';
import { CustomerType as TypeCustomerType } from '@/interfaces';
import { RootState } from '@/redux';
import { httpGetCustomerType } from '@/services';
import { Button, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormCustomerType } from './FormCustomerType';

export const CustomerType = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Tipos de Clientes';

    const [customerType, setCustomerType] = useState<TypeCustomerType>(EmptyCustomerType);
    const [customerTypes, setCustomerTypes] = useState<Array<TypeCustomerType>>([]);
    const [customerTypesCopy, setCustomerTypesCopy] = useState<Array<TypeCustomerType>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnSearch = (value: string) => {
        let _type_vehicles = [...customerTypesCopy];
        if (value.trim() !== '')
            _type_vehicles = _type_vehicles.filter(
                item => item.id === Number(value) || item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
        setCustomerTypes(_type_vehicles);
    };

    const handleEdit = (item: TypeCustomerType) => {
        setCustomerType(item);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetCustomerType()
            .then(res => {
                setCustomerTypes(res);
                setCustomerTypesCopy(res);
            })
            .catch(err => message.error(`Error http get type of customers: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className='h-100 flex flex-column p-auto'>
            <div className='flex flex-md-column gap-3 justify-between'>
                <h3>{title}</h3>
                <div>
                    <Search onSearch={handleOnSearch} onReset={() => handleOnSearch('')} />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setCustomerType(EmptyCustomerType);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={customerTypes}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id}>
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
            ) : (
                <Table
                    size='small'
                    rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                    pagination={false}
                    className='table'
                    loading={loading}
                    showSorterTooltip={false}
                    rowKey='id'
                    dataSource={customerTypes}
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
                            render: value => <span className={value ? 'text-success' : 'text-danger'}>{value ? 'Activo' : 'Inactivo'}</span>
                        },
                        {
                            title: 'Opciones',
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
                        {customerType.id && customerType.id > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormCustomerType
                    customerType={customerType}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

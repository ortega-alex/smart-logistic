import { Icon, Search } from '@/components';
import { EmptyTypeOfCustomer, TypeOfCustomer as TyTypeOfCustomer } from '@/models';
import { RootState } from '@/redux';
import { httpGetTypeOfCustomer } from '@/services';
import { Button, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormTypeOfCustomer } from './FormTypeOfCustomer';

export const TypeOfCustomer = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Tipos de Clientes';

    const [typeOfCustomer, setTypeOfCustomer] = useState<TyTypeOfCustomer>(EmptyTypeOfCustomer);
    const [typeOfCustomers, setTypeOfCustomers] = useState<Array<TyTypeOfCustomer>>([]);
    const [typeOfCustomersCopy, setTypeOfCustomersCopy] = useState<Array<TyTypeOfCustomer>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnSearch = (value: string) => {
        let _type_vehicles = [...typeOfCustomersCopy];
        if (value.trim() !== '')
            _type_vehicles = _type_vehicles.filter(
                item => item.id_tipo_cliente === Number(value) || item.tipo_cliente.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
        setTypeOfCustomers(_type_vehicles);
    };

    const handleEdit = (item: TyTypeOfCustomer) => {
        setTypeOfCustomer(item);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetTypeOfCustomer()
            .then(res => {
                setTypeOfCustomers(res);
                setTypeOfCustomersCopy(res);
            })
            .catch(err => message.error(`Error http get type of customers: ${err.message}`))
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
                        setTypeOfCustomer(EmptyTypeOfCustomer);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={typeOfCustomers}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id_tipo_cliente}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.id_tipo_cliente}
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
                    rowKey='id_tipo_cliente'
                    dataSource={typeOfCustomers}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_tipo_cliente'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'tipo_cliente',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'estado',
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
                        {typeOfCustomer.id_tipo_cliente > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormTypeOfCustomer
                    typeOfCustomer={typeOfCustomer}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

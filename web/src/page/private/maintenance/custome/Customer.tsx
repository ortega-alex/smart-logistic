import { Icon } from '@/components';
import { Customer as TypeCustomer } from '@/models';
import { Button, Input, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FormCustomer } from './FormCustomer';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { httpGetCustomer, httpGetCustomerById } from '@/services';

export const Customer = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const emptyCustomer: TypeCustomer = {
        id_cliente: 0,
        cliente: '',
        correo: '',
        direccion: '',
        dpi: '',
        nit: '',
        telefono_celular: '',
        estado: true
    };

    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState<Array<TypeCustomer>>([]);
    const [customer, setCustomer] = useState<TypeCustomer>(emptyCustomer);
    const [modal, setModal] = useState(false);

    const handleGet = () => {
        setLoading(true);
        httpGetCustomer()
            .then(res => setCustomers(res))
            .catch(err => message.error(`Error http get customers: ${err.message}`))
            .finally(() => setLoading(false));
    };

    const handleEdit = (customer: TypeCustomer) => {
        httpGetCustomerById(customer.id_cliente)
            .then(res => {
                if (res.message) message.warning(res.message);
                else {
                    setCustomer({ ...res, id_tipo_cliente: customer.tipo_cliente?.id_tipo_cliente });
                    setModal(true);
                }
            })
            .catch(err => message.error(`Error http get customer by id: ${err.message}`));
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className='h-100 flex flex-column p-3'>
            <div className='flex flex-md-column gap-3 justify-between'>
                <h3>Clientes</h3>
                <div>
                    <Input.Search placeholder='Buscar' onSearch={() => {}} enterButton />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setCustomer(emptyCustomer);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <>Vista movile</>
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
                    rowKey='id_cliente'
                    dataSource={customers}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_cliente'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'cliente',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Tipo de Cliente',
                            dataIndex: 'tipo_cliente',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{value?.tipo_cliente}</span>
                        },
                        {
                            title: 'Telefono',
                            dataIndex: 'telefono_celular',
                            sorter: true
                        },
                        {
                            title: 'Correo',
                            dataIndex: 'correo',
                            sorter: true
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
                footer={null}
                title={
                    <div className='flex flex-row gap-1'>
                        {customer?.archivos && customer.archivos?.length > 0 && (
                            <Button type='link' htmlType='button' ghost icon={<Icon.Attachment />}>
                                Archivos
                            </Button>
                        )}
                        <h3 className='text-primary'>{customer.id_cliente > 0 ? 'Editar' : 'Nuevo'} Cliente</h3>
                    </div>
                }
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormCustomer
                    customer={customer}
                    onClose={() => {
                        setModal(false);
                        handleGet();
                    }}
                />
            </Modal>
        </div>
    );
};

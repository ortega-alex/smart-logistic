import { Icon, Search } from '@/components';
import { Customer, LandService, TableParams } from '@/models';
import { RootState } from '@/redux';
import { httpGetCustomer } from '@/services';
import { getDateFormat } from '@/utilities';
import { Button, List, message, Select, Table, TableProps, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Vehicles = () => {
    const deviceState = useSelector((store: RootState) => store.device);

    const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [landServices, setLandServices] = useState<Array<LandService>>([]);
    const [loading] = useState({
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

    const handleTableChange: TableProps<LandService>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setLandServices([]);
    };

    const handleEdit = (id: string) => {
        console.log(id);
    };

    const handleGet = () => {};

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
                <div className='flex flex-column'>
                    <label htmlFor='cliente'>Cliente</label>
                    <Select
                        placeholder='Selecciones una opción'
                        options={customers.filter(item => item.estado).map(item => ({ label: item.cliente, value: item.id_cliente }))}
                        onChange={value => setFilter(value)}
                        allowClear
                        style={{ minWidth: 200 }}
                    />
                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <Tooltip title='Recargar'>
                        <Button type='text' htmlType='button' icon={<Icon.Reload />} onClick={() => handleGet()} />
                    </Tooltip>
                    <Search onSearch={(value: string) => setFilter(value)} onReset={() => setFilter('')} />
                </div>
                <Button type='primary' htmlType='button' onClick={() => {}}>
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={landServices}
                    loading={loading.data}
                    renderItem={item => (
                        <div className='item-list' key={item.id}>
                            <div className='flex-1'>
                                <strong>Cliente: </strong>&nbsp;{item.quote.cliente?.cliente}
                            </div>
                            <div className='flex-1'>
                                <strong>Vendedor: </strong>&nbsp;{item.quote.vendedor?.nombre}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.estado ? 'Activo' : 'Inactivo'}
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
                    rowKey='id'
                    dataSource={landServices}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id',
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
                            sorter: true
                        },
                        {
                            title: 'Vendedor',
                            dataIndex: 'vendedor',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{value.nombre}</span>
                        },
                        {
                            title: 'Cliente',
                            dataIndex: 'cliente',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{value.quote.cliente}</span>
                        },
                        {
                            title: 'Marca y Modelo',
                            ellipsis: true,
                            render: value => (
                                <span>
                                    {value.quote.marca} - {value.quote.modelo}
                                </span>
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
                                    onClick={() => handleEdit(item.id)}
                                >
                                    Ver
                                </Button>
                            )
                        }
                    ]}
                />
            )}
        </div>
    );
};

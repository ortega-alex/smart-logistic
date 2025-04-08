import { Icon, Search } from '@/components';
import { privateRoutes } from '@/constants';
import { useQuoter } from '@/hooks';
import { Quoter as QuoterInterface, Session, TableParams } from '@/interfaces';
import { RootState } from '@/redux';
import { httpGetQuoterPaginationData, httpGetQuotersById } from '@/services';
import { getDateFormat } from '@/utilities';
import { Button, List, message, Modal, Pagination, Select, Table, TableProps, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormQuoter } from './FormQuoter';

export const Quoter = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const sessionState: Session = useSelector((store: RootState) => store.session);
    const navigate = useNavigate();
    const { quoter, customers, loading, updateQuoter, rebootQuoter, onAproveQuoter, onDownloadInvoice } = useQuoter();

    const [quoters, setQuoters] = useState<Array<QuoterInterface>>([]);
    const [loadingData, setLoadingData] = useState(false);
    const [modal, setModal] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 50
        }
    });
    const [filter, setFilter] = useState('');

    const handleEdit = (id: number) => {
        httpGetQuotersById(id)
            .then(res => {
                updateQuoter(res);
                setModal(true);
            })
            .catch(err => message.error(`Error http get quoters: ${err.message}`));
    };

    const handleGet = () => {
        setLoadingData(true);
        httpGetQuoterPaginationData({
            ...tableParams,
            current: tableParams.pagination?.current,
            pageSize: tableParams.pagination?.pageSize,
            filter,
            sortOrder: tableParams.sortOrder === 'ascend' ? 'ASC' : 'DESC',
            session_id: sessionState.session_id
        })
            .then(res => {
                setQuoters(res.data);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res.total
                    }
                });
            })
            .catch(err => message.error(`Error http get quoters: ${err.message}`))
            .finally(() => setLoadingData(false));
    };

    const handleTableChange: TableProps<QuoterInterface>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) setQuoters([]);
    };

    useEffect(() => {
        handleGet();
    }, [JSON.stringify(tableParams), filter]);

    return (
        <div className='h-100 flex flex-column p-auto'>
            <div className='flex flex-md-column gap-3 justify-between items-end mb-3'>
                <div className='flex flex-column w-md-100'>
                    <label htmlFor='cliente'>Cliente:</label>
                    <Select
                        placeholder='Selecciones una opción'
                        options={customers.filter(item => item.is_active).map(item => ({ label: item.name, value: item.id }))}
                        onChange={value => setFilter(value)}
                        style={{ minWidth: 200 }}
                        allowClear
                    />
                </div>
                <div className='flex flex-row gap-2 items-center w-md-100'>
                    <Tooltip title='Recargar'>
                        <Button type='text' htmlType='button' icon={<Icon.Reload />} onClick={() => handleGet()} />
                    </Tooltip>
                    <Search onSearch={(value: string) => setFilter(value)} onReset={() => setFilter('')} />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    className='w-md-100'
                    onClick={() => {
                        rebootQuoter();
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <>
                    <div className='vh-66 overflow-y'>
                        <List
                            dataSource={quoters}
                            loading={loadingData}
                            rowKey='id'
                            renderItem={item => (
                                <div className='item-list text-capitalize' key={item.id}>
                                    <div className='flex items-center gap-1'>
                                        <Icon.User />
                                        {item.seller?.name}
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Icon.Users />
                                        {item.customer?.name}
                                    </div>

                                    <div className='flex items-center gap-1'>
                                        <Icon.Marks />
                                        {item.mark} - <Icon.Car /> {item.model}
                                    </div>

                                    <div className='flex flex-row justify-between'>
                                        <div>
                                            <strong>Aprobada: </strong>&nbsp;
                                            <span className={item.is_aproverd ? 'text-success' : 'text-danger'}>
                                                {item.is_aproverd ? 'Sí' : 'No'}
                                            </span>
                                        </div>
                                        <Button
                                            type='link'
                                            danger
                                            htmlType='button'
                                            icon={<Icon.Edit />}
                                            onClick={() => handleEdit(item.id)}
                                        >
                                            Editar
                                        </Button>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <Pagination
                        className='mt-3'
                        align='end'
                        {...tableParams.pagination}
                        onChange={current =>
                            setTableParams({
                                pagination: {
                                    ...tableParams.pagination,
                                    current
                                }
                            })
                        }
                    />
                </>
            ) : (
                <Table
                    size='small'
                    rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                    pagination={{
                        position: ['none', 'bottomRight'],
                        ...tableParams.pagination,
                        showSizeChanger: true,
                        pageSizeOptions: [2, 50, 100, 250, 500]
                    }}
                    onChange={handleTableChange}
                    className='table'
                    loading={loadingData}
                    showSorterTooltip={false}
                    rowKey='id'
                    dataSource={quoters}
                    columns={[
                        {
                            title: 'Fecha',
                            dataIndex: 'created_at',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{getDateFormat(value, 'YYYY/MM/DD')}</span>
                        },
                        {
                            title: 'Vendedor',
                            dataIndex: 'seller',
                            ellipsis: true,
                            sorter: true,
                            render: seller => <span>{seller?.name}</span>
                        },
                        {
                            title: 'Cliente',
                            dataIndex: 'customer',
                            ellipsis: true,
                            sorter: true,
                            render: customer => <span>{customer?.name}</span>
                        },
                        {
                            title: 'Marca',
                            dataIndex: 'mark',
                            ellipsis: true
                        },
                        {
                            title: 'Modelo',
                            dataIndex: 'model',
                            ellipsis: true
                        },
                        {
                            title: 'Aprobada',
                            dataIndex: 'is_aproverd',
                            sorter: true,
                            align: 'center',
                            render: value => (
                                <span className={value ? 'text-success' : 'text-danger'}>
                                    <Tag color={value ? 'success' : 'error'}>{value ? 'Sí' : 'No'}</Tag>
                                </span>
                            )
                        },
                        {
                            title: 'Opciones',
                            dataIndex: 'operacion',
                            width: 80,
                            render: (_, item) => (
                                <div className='flex flex-row gap-1'>
                                    <Tooltip title='Editar'>
                                        <Button
                                            style={{ width: 40 }}
                                            icon={<Icon.Edit />}
                                            type='text'
                                            size='small'
                                            onClick={() => handleEdit(item.id)}
                                        />
                                    </Tooltip>
                                    <Tooltip title='Descargar'>
                                        <Button
                                            style={{ width: 40 }}
                                            icon={<Icon.Download />}
                                            type='text'
                                            size='small'
                                            onClick={() => onDownloadInvoice(item)}
                                            disabled={loading}
                                        />
                                    </Tooltip>

                                    {!item.is_aproverd && (
                                        <Tooltip title='Aprobar'>
                                            <Button
                                                style={{ width: 40 }}
                                                icon={<Icon.Done />}
                                                type='text'
                                                size='small'
                                                onClick={() =>
                                                    onAproveQuoter(item).then(res => {
                                                        if (!res?.error) handleGet();
                                                    })
                                                }
                                                disabled={loading}
                                            />
                                        </Tooltip>
                                    )}
                                    {item.is_aproverd && (
                                        <Tooltip title='Ir a Vehiculos'>
                                            <Button
                                                style={{ width: 40 }}
                                                icon={<Icon.Workspace />}
                                                type='text'
                                                size='small'
                                                onClick={() => navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.VEHICLES}/${item.lot}`)}
                                                disabled={loading}
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                            )
                        }
                    ]}
                />
            )}

            <Modal
                open={modal}
                title={<h3>{quoter.id > 0 ? 'Editar' : 'Agregar'} Cotización</h3>}
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
                width={1200}
            >
                <FormQuoter
                    onClose={() => {
                        setModal(false);
                        handleGet();
                    }}
                />
            </Modal>
        </div>
    );
};

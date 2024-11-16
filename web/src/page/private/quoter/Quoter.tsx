import { Icon } from '@/components';
import { EmptyQuoter, QuoterDetail, Sesion, Quoter as TypeQuoter } from '@/models';
import { RootState } from '@/redux';
import { httpAddQuoter, httpDowloadInvoice, httpGetQuoters, httpGetQuotersById, httpUpdateQuoter } from '@/services';
import { downloadFile, getDateFormat } from '@/utilities';
import { Button, Input, List, message, Modal, Select, Table, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormQuoter } from './FormQuoter';

export const Quoter = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const sessionState: Sesion = useSelector((store: RootState) => store.session);

    const [quoters, setQuoters] = useState<Array<TypeQuoter>>([]);
    const [quoter, setQuoter] = useState<TypeQuoter>(EmptyQuoter);
    const [loading, setLoading] = useState({
        data: false,
        services: false
    });
    const [modals, setModals] = useState<{ [key: string]: boolean }>({
        form: false,
        preview: false
    });

    const handleOnChangeModal = (name: string, open: boolean = true) => setModals({ [name]: open });
    const handleOnChangeLoading = (name: string, value: boolean) => setLoading({ ...loading, [name]: value });

    const handleEdit = (id_cotizacion: number) => {
        httpGetQuotersById(id_cotizacion)
            .then(res => {
                setQuoter({
                    ...res,
                    id_cliente: res.cliente?.id_cliente,
                    id_vendedor: res.vendedor?.id_usuario,
                    id_tipo_vehiculo: res.tipo_veniculo?.id_tipo_vehiculo,
                    id_puerto: res.puerto?.id_puerto,
                    id_subasta: res.subasta?.id_subasta,
                    id_grua_usd: res.grua_usd?.id_grua,
                    id_grua_gt: res.grua_gt?.id_grua
                });
                handleOnChangeModal('form');
            })
            .catch(err => message.error(`Error http get quoters: ${err.message}`));
    };

    const handleSubmit = async (values: any, details: Array<QuoterDetail>) => {
        try {
            handleOnChangeLoading('services', true);
            let res;
            const _quoter = { ...quoter, ...values, detalles: details };
            if (quoter.id_cotizacion === 0) res = await httpAddQuoter({ ..._quoter, id_vendedor: sessionState.id_sesion });
            else res = await httpUpdateQuoter(_quoter);

            if (res.message) message.warning(res.message);
            else {
                handleGet();
                handleOnChangeModal('form', false);
            }
        } catch (error) {
            message.error(`Error add or edit ouoter: ${(error as Error).message}`);
        } finally {
            handleOnChangeLoading('services', false);
        }
    };

    const handleDownloadInvoice = async (item: TypeQuoter) => {
        handleOnChangeLoading('services', true);
        httpDowloadInvoice(item.id_cotizacion)
            .then(res => downloadFile(res, `${item.cliente?.cliente ?? 'cotizacion'}-invoice.zip`))
            .catch(err => message.error(`Error http download invoice: ${err.message}`))
            .finally(() => handleOnChangeLoading('services', false));
    };

    const handleGet = () => {
        handleOnChangeLoading('data', true);
        httpGetQuoters()
            .then(res => setQuoters(res))
            .catch(err => message.error(`Error http get quoters: ${err.message}`))
            .finally(() => handleOnChangeLoading('data', false));
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className='h-100 flex flex-column p-3'>
            <div className='flex flex-md-column gap-3 justify-between items-end'>
                <div className='flex flex-column'>
                    <label htmlFor='cliente'>Cliente</label>
                    <Select placeholder='Seleccione una opcion' />
                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <Tooltip title='Recargar'>
                        <Button type='text' htmlType='button' icon={<Icon.Reload />} onClick={() => handleGet()} />
                    </Tooltip>
                    <Input.Search placeholder='Buscar' onSearch={() => {}} enterButton />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setQuoter(EmptyQuoter);
                        handleOnChangeModal('form');
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={quoters}
                    loading={loading.data}
                    renderItem={item => (
                        <div className='item-list' key={item.id_cotizacion}>
                            <div className='flex-1'>
                                <strong>Cliente: </strong>&nbsp;{item.cliente?.cliente}
                            </div>
                            <div className='flex-1'>
                                <strong>Vendedor: </strong>&nbsp;{item.vendedor?.nombre}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.estado ? 'Activo' : 'Inactivo'}
                                </div>
                                <Button
                                    type='link'
                                    danger
                                    htmlType='button'
                                    icon={<Icon.Edit />}
                                    onClick={() => handleEdit(item.id_cotizacion)}
                                >
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
                    loading={loading.data}
                    showSorterTooltip={false}
                    rowKey='id_cotizacion'
                    dataSource={quoters}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_cotizacion'
                        },
                        {
                            title: 'Fecha',
                            dataIndex: 'fecha_creacion',
                            ellipsis: true,
                            sorter: true,
                            render: value => <span>{getDateFormat(value, 'DD/MM/YYYY')}</span>
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
                            render: value => <span>{value.cliente}</span>
                        },
                        {
                            title: 'Marca',
                            dataIndex: 'marca',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Modelo',
                            dataIndex: 'modelo',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Aprobada',
                            dataIndex: 'aprobada',
                            align: 'center',
                            render: value => (
                                <span className={value ? 'text-success' : 'text-danger'}>
                                    <Tag color={value ? 'success' : 'error'}>{value ? 'Sí' : 'No'}</Tag>
                                </span>
                            )
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'estado',
                            render: value => <span className={value ? 'text-success' : 'text-danger'}>{value ? 'Activo' : 'Inactivo'}</span>
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
                                            onClick={() => handleEdit(item.id_cotizacion)}
                                        />
                                    </Tooltip>
                                    <Tooltip title='Descargar'>
                                        <Button
                                            style={{ width: 40 }}
                                            icon={<Icon.Download />}
                                            type='text'
                                            size='small'
                                            onClick={() => handleDownloadInvoice(item)}
                                            disabled={loading.services}
                                        />
                                    </Tooltip>

                                    {!item.aprobada && (
                                        <Tooltip title='Aprobar'>
                                            <Button
                                                style={{ width: 40 }}
                                                icon={<Icon.Done />}
                                                type='text'
                                                size='small'
                                                onClick={() => handleDownloadInvoice(item)}
                                                disabled={loading.services}
                                            />
                                        </Tooltip>
                                    )}
                                    {item.aprobada && (
                                        <Tooltip title='Ir a Vehiculos'>
                                            <Button
                                                style={{ width: 40 }}
                                                icon={<Icon.Workspace />}
                                                type='text'
                                                size='small'
                                                onClick={() => handleDownloadInvoice(item)}
                                                disabled={loading.services}
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
                open={modals.form}
                title={<h3>{quoter.id_cotizacion > 0 ? 'Editar' : 'Agregar'} Cotización</h3>}
                footer={null}
                onCancel={() => handleOnChangeModal('form', false)}
                centered
                destroyOnClose
                width={1200}
            >
                <FormQuoter quoter={quoter} loading={loading.services} onSubmit={handleSubmit} onDownloadInvoice={handleDownloadInvoice} />
            </Modal>
        </div>
    );
};

import { Icon, ViewFiles } from '@/components';
import { useVehicle } from '@/hooks';
import { EmptyFile, Moneda, publicRoutes } from '@/models';
import { httpGetVehiclesGetById } from '@/services';
import { copyToClipboard, getDateFormat } from '@/utilities';
import { Button, Divider, message, Modal, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormEvidence } from './FormEvidence';
import { TableDetail } from './TableDetail';

interface Props {
    // vehicle: Vehicles;
}

export const ViewVehicles: React.FC<Props> = () => {
    const { vehicle, updateVehicle } = useVehicle();

    const [modals, setModals] = useState({
        view: false,
        evidence: false
    });
    const [file, setFile] = useState(EmptyFile);
    const [loading, setLoading] = useState(false);

    const handleOnChangeModals = (name: string, value: boolean = true) => setModals({ ...modals, [name]: value });

    const handleViewFile = (path: string) => {
        setFile({
            ...file,
            ruta: path
        });
        handleOnChangeModals('view');
    };

    const handleGenerateUrl = async () => {
        try {
            if (!vehicle.cotizacion.cliente?.correo)
                return message.warning('El cliente no cuenta con correo, por favor edite el cliente antes de generar la url');
            const data = {
                id: vehicle.cotizacion.cliente?.id_cliente,
                correo: vehicle.cotizacion.cliente?.correo
            };
            const token = window.btoa(JSON.stringify(data));
            const baseUrl = window.location.href.split('#')[0];
            const url = `${baseUrl}#/${publicRoutes.SING_IN_CUSTOMER}/${token}`;
            await copyToClipboard(url);
            message.success(`Copiado el url al portapapeles`);
        } catch (error) {
            message.error(`Ha ocurrido un error: ${error}`);
        }
    };

    const handleGet = () => {
        setLoading(true);
        httpGetVehiclesGetById(vehicle.id_vehiculo)
            .then(res => updateVehicle(res))
            .catch(err => message.error(`Error http get vehicles: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className='flex flex-column'>
            <div className='flex flex-row gap-3 mb-3'>
                <div className='flex flex-column flex-1 gap-2 px-3'>
                    <Divider orientation='left'>Informacion del cliente</Divider>
                    <div className='flex flex-column'>
                        <strong>Cliente:</strong> {vehicle.cotizacion.cliente?.cliente}
                    </div>
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>Telefono Fijo:</strong> {vehicle.cotizacion.cliente?.telefono_fijo}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>Telefono Celular:</strong> {vehicle.cotizacion.cliente?.telefono_celular}
                        </div>
                    </div>
                    <div className='flex flex-column'>
                        <strong>Direccion:</strong> {vehicle.cotizacion.cliente?.direccion}
                    </div>
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>No. NIT:</strong> {vehicle.cotizacion.cliente?.nit}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>No. DPI:</strong> {vehicle.cotizacion.cliente?.dpi}
                        </div>
                    </div>
                    <div className='flex flex-column'>
                        <strong>Correo:</strong> {vehicle.cotizacion.cliente?.correo}
                    </div>
                </div>
                <div className='flex flex-column flex-1 gap-2'>
                    <Divider orientation='left'>Informacion del vehiculo</Divider>
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>No. VIN:</strong> {vehicle.cotizacion.vin}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>No. Lote:</strong> {vehicle.cotizacion.lote}
                        </div>
                    </div>
                    <div className='flex  flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>Tipo de vehiculo:</strong> {vehicle.cotizacion.tipo_veniculo?.tipo_vehiculo}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>Marca y modelo:</strong> {vehicle.cotizacion.marca} - {vehicle.cotizacion.modelo}
                        </div>
                    </div>

                    <Divider orientation='left'>Informacion del vendedor</Divider>
                    <div className='flex flex-column'>
                        <strong>Nombre:</strong> {vehicle.cotizacion.vendedor?.nombre}
                    </div>
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>Telefono:</strong> {vehicle.cotizacion.vendedor?.telefono}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>Correo:</strong> {vehicle.cotizacion.vendedor?.correo}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex  mb-3 px-5 gap-3'>
                {vehicle.cotizacion.detalles?.some(item => item.moneda === Moneda.USD) && (
                    <div className='flex-1'>
                        <Divider orientation='left'>Detalle en USD</Divider>
                        <TableDetail detail={vehicle.cotizacion.detalles.filter(item => item.moneda === Moneda.USD) ?? []} />
                    </div>
                )}

                {vehicle.cotizacion.detalles?.some(item => item.moneda === Moneda.GTQ) && (
                    <div className='flex-1'>
                        <Divider orientation='left'>Detalle en GTQ</Divider>
                        <TableDetail detail={vehicle.cotizacion.detalles?.filter(item => item.moneda === Moneda.GTQ) ?? []} />
                    </div>
                )}
            </div>

            <Divider orientation='left'>Historico</Divider>
            <Table
                size='small'
                rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                pagination={false}
                className='table mb-3 px-5'
                showSorterTooltip={false}
                rowKey='id_subasta'
                dataSource={vehicle.historial_vechiculo}
                loading={loading}
                scroll={{ y: 250 }}
                columns={[
                    {
                        title: 'Fecha',
                        dataIndex: 'fecha_creacion',
                        render: value => <span>{getDateFormat(value, 'DD/MM/YYYY HH:mm')}</span>
                    },
                    {
                        title: 'Descripcion',
                        dataIndex: 'descripcion',
                        ellipsis: true
                    },
                    {
                        title: 'Visible por el cliente',
                        dataIndex: 'visible_cliente',
                        align: 'center',
                        render: value => <Tag color={value ? 'green' : 'red'}>{value ? 'Si' : 'No'}</Tag>
                    },
                    {
                        title: 'archivo',
                        dataIndex: 'archivo',
                        render: value => (
                            <div className='text-center'>
                                {value && (
                                    <Tooltip title='Ver' placement='right'>
                                        <Button type='link' icon={<Icon.Eye />} onClick={() => handleViewFile(value)} />
                                    </Tooltip>
                                )}
                            </div>
                        )
                    }
                ]}
            />

            <div className='flex  flex-row gap-3 justify-end'>
                <Button type='link' htmlType='button' icon={<Icon.Copy />} onClick={handleGenerateUrl}>
                    Url Cliente
                </Button>
                <Button type='primary' htmlType='button' ghost onClick={() => handleOnChangeModals('evidence')}>
                    Cargar evidencia | Cambiar estado
                </Button>
            </div>

            <Modal
                open={modals.view}
                onCancel={() => {
                    handleOnChangeModals('view', false);
                    setFile(EmptyFile);
                }}
                centered
                destroyOnClose
                closeIcon={
                    <div className='bg-secondary px-2 border-sm'>
                        <Icon.Close color='white' />
                    </div>
                }
                width={1000}
                footer={false}
                className='bg-transparent'
            >
                <ViewFiles file={file} download={true} />
            </Modal>

            <Modal
                open={modals.evidence}
                title={<h3>Cargar evidencia | Cambiar estado</h3>}
                footer={null}
                centered
                destroyOnClose
                onCancel={() => handleOnChangeModals('evidence', false)}
            >
                <FormEvidence
                    onClose={() => {
                        handleOnChangeModals('evidence', false);
                        handleGet();
                    }}
                />
            </Modal>
        </div>
    );
};

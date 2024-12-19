import { Icon, ViewFiles } from '@/components';
import { EmptyFile, EmptyVehicle, Moneda, publicRoutes, Vehicles } from '@/models';
import { copyToClipboard, getDateFormat } from '@/utilities';
import { Button, Divider, message, Modal, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { TableDetail } from './TableDetail';
import { httpGetVehiclesGetById } from '@/services';
import { FormEvidence } from './FormEvidence';

interface Props {
    vehicle: Vehicles;
}

export const ViewVehicles: React.FC<Props> = ({ vehicle }) => {
    const [modals, setModals] = useState({
        view: false,
        evidence: false
    });
    const [file, setFile] = useState(EmptyFile);
    const [loading, setLoading] = useState(false);
    const [vehicleDetail, setVehicleDetail] = useState<Vehicles>(EmptyVehicle);

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
            if (!vehicleDetail.cotizacion.cliente?.correo)
                return message.warning('El cliente no cuenta con correo, por favor edite el cliente antes de generar la url');
            const data = {
                id: vehicleDetail.cotizacion.cliente?.id_cliente,
                correo: vehicleDetail.cotizacion.cliente?.correo
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
            .then(res => setVehicleDetail(res))
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
                        <strong>Cliente:</strong> {vehicleDetail.cotizacion.cliente?.cliente}
                    </div>
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>Telefono Fijo:</strong> {vehicleDetail.cotizacion.cliente?.telefono_fijo}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>Telefono Celular:</strong> {vehicleDetail.cotizacion.cliente?.telefono_celular}
                        </div>
                    </div>
                    <div className='flex flex-column'>
                        <strong>Direccion:</strong> {vehicleDetail.cotizacion.cliente?.direccion}
                    </div>
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>No. NIT:</strong> {vehicleDetail.cotizacion.cliente?.nit}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>No. DPI:</strong> {vehicleDetail.cotizacion.cliente?.dpi}
                        </div>
                    </div>
                    <div className='flex flex-column'>
                        <strong>Correo:</strong> {vehicleDetail.cotizacion.cliente?.correo}
                    </div>
                </div>
                <div className='flex flex-column flex-1 gap-2'>
                    <Divider orientation='left'>Informacion del vehiculo</Divider>
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>No. VIN:</strong> {vehicleDetail.cotizacion.vin}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>No. Lote:</strong> {vehicleDetail.cotizacion.lote}
                        </div>
                    </div>
                    <div className='flex  flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>Tipo de vehiculo:</strong> {vehicleDetail.cotizacion.tipo_veniculo?.tipo_vehiculo}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>Marca y modelo:</strong> {vehicleDetail.cotizacion.marca} - {vehicleDetail.cotizacion.modelo}
                        </div>
                    </div>

                    <Divider orientation='left'>Informacion del vendedor</Divider>
                    <div className='flex flex-column'>
                        <strong>Nombre:</strong> {vehicleDetail.cotizacion.vendedor?.nombre}
                    </div>
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <div className='flex flex-1 flex-column'>
                            <strong>Telefono:</strong> {vehicleDetail.cotizacion.vendedor?.telefono}
                        </div>
                        <div className='flex flex-1 flex-column'>
                            <strong>Correo:</strong> {vehicleDetail.cotizacion.vendedor?.correo}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex  mb-3 px-5 gap-3'>
                {vehicleDetail.cotizacion.detalles?.some(item => item.moneda === Moneda.USD) && (
                    <div className='flex-1'>
                        <Divider orientation='left'>Detalle en USD</Divider>
                        <TableDetail detail={vehicleDetail.cotizacion.detalles.filter(item => item.moneda === Moneda.USD) ?? []} />
                    </div>
                )}

                {vehicleDetail.cotizacion.detalles?.some(item => item.moneda === Moneda.GTQ) && (
                    <div className='flex-1'>
                        <Divider orientation='left'>Detalle en GTQ</Divider>
                        <TableDetail detail={vehicleDetail.cotizacion.detalles?.filter(item => item.moneda === Moneda.GTQ) ?? []} />
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
                dataSource={vehicleDetail.historial_vechiculo}
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
                                <Tooltip title='Ver' placement='right'>
                                    <Button type='link' icon={<Icon.Eye />} onClick={() => handleViewFile(value)} />
                                </Tooltip>
                            </div>
                        )
                    }
                ]}
            />

            <div className='flex  flex-row gap-3 justify-end'>
                <Button type='primary' htmlType='button' ghost onClick={() => handleOnChangeModals('evidence')}>
                    Cargar Evidencia
                </Button>
                <Button type='link' htmlType='button' icon={<Icon.Copy />} onClick={handleGenerateUrl}>
                    Url Cliente
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
                title={<h3>Cargar Evidencia</h3>}
                footer={null}
                centered
                destroyOnClose
                onCancel={() => handleOnChangeModals('evidence', false)}
            >
                <FormEvidence
                    vehicle={vehicleDetail}
                    onClose={() => {
                        handleOnChangeModals('evidence', false);
                        handleGet();
                    }}
                />
            </Modal>
        </div>
    );
};

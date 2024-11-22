import { Icon } from '@/components';
import { Moneda, Vehicles } from '@/models';
import { getDateFormat } from '@/utilities';
import { Button, Divider, Table } from 'antd';
import React from 'react';
import { TableDetail } from './TableDetail';

interface Props {
    vehicle: Vehicles;
}

export const ViewVehicles: React.FC<Props> = ({ vehicle }) => {
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

            {vehicle.cotizacion.detalles?.some(item => item.moneda === Moneda.USD) && (
                <>
                    <Divider orientation='left'>Detalle en USD</Divider>
                    <TableDetail detail={vehicle.cotizacion.detalles.filter(item => item.moneda === Moneda.USD) ?? []} />
                </>
            )}

            {vehicle.cotizacion.detalles?.some(item => item.moneda === Moneda.GTQ) && (
                <>
                    <Divider orientation='left'>Detalle en GTQ</Divider>
                    <TableDetail detail={vehicle.cotizacion.detalles?.filter(item => item.moneda === Moneda.GTQ) ?? []} />
                </>
            )}

            <Divider orientation='left'>Historico</Divider>
            <Table
                size='small'
                rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                pagination={false}
                className='table mb-3 px-5'
                showSorterTooltip={false}
                rowKey='id_subasta'
                dataSource={vehicle.historial_vechiculo}
                columns={[
                    {
                        title: 'Fecha',
                        dataIndex: 'fecha_creacion',
                        render: value => <span>{getDateFormat(value, 'DD/MM/YYYY')}</span>
                    },
                    {
                        title: 'Usuario',
                        dataIndex: 'usuario',
                        render: value => <span>{value.nombre}</span>
                    },
                    {
                        title: 'Descripcion',
                        dataIndex: 'descripcion',
                        ellipsis: true
                    },
                    {
                        title: 'archivo',
                        dataIndex: 'archivo',
                        render: value => (
                            <div className='text-center'>
                                <Button type='link' icon={<Icon.Download />} onClick={() => console.log(value)} />
                            </div>
                        )
                    }
                ]}
            />
        </div>
    );
};

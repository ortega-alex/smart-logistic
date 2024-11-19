import { Moneda, Vehicles } from '@/models';
import { commaSeparateNumber } from '@/utilities';
import { Divider } from 'antd';
import React from 'react';

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

            <Divider orientation='left'>Detalle en USD</Divider>
            <table className='table table-striped table-sm'>
                <thead>
                    <tr>
                        <th className='text-left w-75'>Concepto</th>
                        <th className='text-left w-75'>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicle.cotizacion.detalles
                        ?.filter(item => item.moneda === Moneda.USD)
                        .map(item => (
                            <tr key={item.nombre}>
                                <td>{item.nombre}</td>
                                <td>
                                    {item.moneda}. {commaSeparateNumber(item.valor)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <Divider orientation='left'>Detalle en GTQ</Divider>
            <table className='table table-striped table-sm'>
                <thead>
                    <tr>
                        <th className='text-left w-75'>Concepto</th>
                        <th className='text-left w-75'>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicle.cotizacion.detalles
                        ?.filter(item => item.moneda === Moneda.GTQ)
                        .map(item => (
                            <tr key={item.nombre}>
                                <td>{item.nombre}</td>
                                <td>
                                    {item.moneda}. {commaSeparateNumber(item.valor)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <Divider orientation='left'>Historico</Divider>
            <table className='table table-striped table-sm'>
                <thead>
                    <tr>
                        <th className='text-left'>Fecha</th>
                        <th className='text-left'>Usuario</th>
                        <th className='text-left'>Cliente</th>
                        <th className='text-left'>Descripcion</th>
                        <th className='text-left'>Archivo</th>
                        <th className='text-left'>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicle.historial_vechiculo.map(item => (
                        <tr key={item.id_historial_importacion}>
                            <td>{item.fecha_creacion}</td>
                            <td>{item.usuario.nombre}</td>
                            <td>{item.cliente.cliente}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.archivo}</td>
                            <td>{item.estado_importacion.estado_importacion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

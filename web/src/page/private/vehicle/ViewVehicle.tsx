import { Icon, ImportHitory } from '@/components';
import { publicRoutes } from '@/constants';
import { useVehicle } from '@/hooks';
import { Coin } from '@/interfaces';
import { httpGetVehiclesGetById } from '@/services';
import { copyToClipboard } from '@/utilities';
import { Button, Divider, Input, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { FormEvidence } from './FormEvidence';
import { TableDetail } from './TableDetail';

export const ViewVehicle = () => {
    const { vehicle, updateVehicle } = useVehicle();

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGenerateUrl = async () => {
        try {
            if (!vehicle.quoter.customer?.email)
                return message.warning('El cliente no cuenta con correo, por favor edite el cliente antes de generar la url');
            const data = {
                id: vehicle.quoter.customer?.id,
                email: vehicle.quoter.customer?.email
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
        httpGetVehiclesGetById(vehicle.id)
            .then(res => updateVehicle(res))
            .catch(err => message.error(`Error http get vehicles: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className='flex flex-column text-capitalize'>
            <div className='flex flex-md-column gap-3 justify-between items-end mb-3'>
                <div className='flex flex-column w-100 p-auto'>
                    <Divider orientation='left'>Información del cliente</Divider>
                    <div className='flex flex-column'>
                        <strong>Cliente:</strong>
                        <div className='text-decoration'>{vehicle.quoter.customer?.name}</div>
                    </div>
                    <div className='flex flex-md-column gap-3 items-center justify-between'>
                        <div className='flex flex-column w-100'>
                            <strong>Teléfono Fijo:</strong>
                            <div className='text-decoration'>{vehicle.quoter.customer?.landline}</div>
                        </div>
                        <div className='flex flex-column w-100'>
                            <strong>Teléfono Celular:</strong>
                            <div className='text-decoration'>{vehicle.quoter.customer?.phone_number}</div>
                        </div>
                    </div>
                    <div className='flex flex-column'>
                        <strong>Direccion:</strong>
                        <div className='text-decoration'>{vehicle.quoter.customer?.address}</div>
                    </div>
                    <div className='flex flex-md-column gap-3 items-center justify-between'>
                        <div className='flex flex-column w-100'>
                            <strong>No. NIT:</strong>
                            <div className='text-decoration'>{vehicle.quoter.customer?.nit}</div>
                        </div>
                        <div className='flex flex-column w-100'>
                            <strong>No. DPI:</strong>
                            <div className='text-decoration'>{vehicle.quoter.customer?.dpi}</div>
                        </div>
                    </div>
                    <div className='flex flex-column'>
                        <strong>Correo:</strong>
                        <div className='text-decoration'>{vehicle.quoter.customer?.email}</div>
                    </div>
                    <Divider orientation='left'>Información del vehículo</Divider>
                    <div className='flex flex-md-column gap-3 items-center justify-between'>
                        <div className='flex flex-column w-100'>
                            <strong>No. VIN:</strong>
                            <div className='text-decoration'>{vehicle.quoter.vin}</div>
                        </div>
                        <div className='flex flex-column w-100'>
                            <strong>No. Lote:</strong>
                            <div className='text-decoration'>{vehicle.quoter.lot}</div>
                        </div>
                    </div>
                    <div className='flex  flex-md-column gap-3 items-center justify-between'>
                        <div className='flex flex-column w-100'>
                            <strong>Tipo de vehículo:</strong>
                            <div className='text-decoration'>{vehicle.quoter.vehicleType?.name}</div>
                        </div>
                        <div className='flex flex-column w-100'>
                            <strong>Marca y modelo:</strong>
                            <div className='text-decoration'>
                                {vehicle.quoter.mark} - {vehicle.quoter.model}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-column w-100 p-auto'>
                    <Divider orientation='left'>Información del vendedor</Divider>
                    <div className='flex flex-column'>
                        <strong>Nombre:</strong>
                        <div className='text-decoration'>{vehicle.quoter.seller?.name}</div>
                    </div>
                    <div className='flex flex-md-column gap-3 items-center justify-between'>
                        <div className='flex flex-column w-100'>
                            <strong>Teléfono:</strong>
                            <div className='text-decoration'>{vehicle.quoter.seller?.phone_number}</div>
                        </div>
                        <div className='flex flex-column w-100'>
                            <strong>Correo:</strong>
                            <div className='text-decoration'>{vehicle.quoter.seller?.email}</div>
                        </div>
                    </div>
                    <Divider orientation='left' className='mt-3'>
                        Otros datos
                    </Divider>
                    <div className='flex flex-column'>
                        <strong>Tipo de transporte:</strong>
                        <div className='text-decoration'>{vehicle.quoter.transportType?.name}</div>
                    </div>
                    <div className='flex flex-column'>
                        <strong>Sede:</strong>
                        <div className='text-decoration'>{vehicle.quoter.headquarter?.name}</div>
                    </div>
                    <div className='flex flex-column'>
                        <strong>Descripción:</strong>
                        <Input.TextArea rows={4} autoSize={{ minRows: 3, maxRows: 6 }} disabled>
                            {vehicle.quoter?.description}{' '}
                        </Input.TextArea>
                    </div>
                </div>
            </div>

            <div className='flex flex-md-column p-auto gap-3'>
                {vehicle.quoter.details?.some(item => item.coin === Coin.USD) && (
                    <div className='w-100'>
                        <Divider orientation='left'>Detalle en USD</Divider>
                        <TableDetail detail={vehicle.quoter.details.filter(item => item.coin === Coin.USD) ?? []} />
                    </div>
                )}

                {vehicle.quoter.details?.some(item => item.coin === Coin.GTQ) && (
                    <div className='w-100'>
                        <Divider orientation='left'>Detalle en GTQ</Divider>
                        <TableDetail detail={vehicle.quoter.details?.filter(item => item.coin === Coin.GTQ) ?? []} />
                    </div>
                )}
            </div>

            <Divider orientation='left'>Histórico</Divider>
            <ImportHitory details={vehicle?.record ?? []} loading={loading} />

            <div className='flex  flex-row gap-3 justify-end'>
                <Button type='link' htmlType='button' icon={<Icon.Copy />} onClick={handleGenerateUrl}>
                    Url Cliente
                </Button>
                <Button type='primary' icon={<Icon.ArrowsExchange />} htmlType='button' onClick={() => setModal(true)}>
                    Evidencia | Estado
                </Button>
            </div>

            <Modal
                open={modal}
                title={<h3>Cargar evidencia | Cambiar estado</h3>}
                footer={null}
                centered
                destroyOnClose
                onCancel={() => setModal(false)}
            >
                <FormEvidence
                    onClose={() => {
                        setModal(false);
                        handleGet();
                    }}
                />
            </Modal>
        </div>
    );
};

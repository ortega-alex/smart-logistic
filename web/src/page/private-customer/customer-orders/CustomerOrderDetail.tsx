import { EmptyVehicle } from '@/context';
import { useSocket } from '@/hooks';
import { ImportState, Vehicle } from '@/interfaces';
import { Icon, ImportHitory } from '@/components';
import { httpGetImportState, httpGetVehiclesGetById } from '@/services';
import { Button, Divider, message, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';

export const CustomerOrderDetail = () => {
    const { id } = useParams();
    const { socket } = useSocket();
    const navigate = useNavigate();
    const deviceState = useSelector((store: RootState) => store.device);

    const [loading, setLoading] = useState(false);
    const [vehicle, setVehicle] = useState<Vehicle>(EmptyVehicle);
    const [importStates, setImportStates] = useState<Array<ImportState>>([]);

    const handleGetDetail = (id: number) => {
        setLoading(true);
        httpGetVehiclesGetById(Number(id))
            .then(res => setVehicle(res))
            .catch(err => message.error(`Error http get vehicles by id ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGetDetail(Number(id));
        httpGetImportState()
            .then(res => setImportStates(res))
            .catch(err => message.error(`Error http get import state ${err.message}`));

        if (socket)
            socket.on(`state-${id}`, () => {
                console.log('estado ha cambiado');
                handleGetDetail(Number(id));
            });
    }, []);

    return (
        <div className='h-100 flex flex-row justify-center bg-dark-gray text-capitalize overflow-hidden'>
            <div className='card-customer-detail'>
                <Button type='link' icon={<Icon.ArrowBack size={24} />} className='mb-3' onClick={() => navigate(-1)}>
                    REGRESAR
                </Button>
                <Divider orientation='left'>Información del vehículo</Divider>
                <div className='flex flex-column my-3 px-5'>
                    <span className='flex gap-1'>
                        <strong>Lote:</strong> <span>{vehicle.quoter.lot}</span>
                    </span>
                    <div className='flex flex-md-column justify-start gap-1'>
                        <span className='flex gap-1'>
                            <strong>Marca:</strong>
                            {vehicle.quoter.mark}
                        </span>
                        <span className='flex gap-1'>
                            <strong>Modelo:</strong>
                            {vehicle.quoter.model}
                        </span>
                    </div>
                </div>
                <Divider orientation='left'>Información del Vendedor</Divider>
                <div className='flex flex-column my-3 px-5'>
                    <span className='flex gap-1'>
                        <strong>Nombre:</strong> <span>{vehicle.quoter.seller?.name}</span>
                    </span>
                    <div className='flex flex-md-column justify-start gap-1'>
                        <span className='flex gap-1'>
                            <strong>Telefono:</strong> <span>{vehicle.quoter.seller?.phone_number}</span>
                        </span>

                        <span className='flex gap-1'>
                            <strong>Correo:</strong> <span>{vehicle.quoter.seller?.email}</span>
                        </span>
                    </div>
                </div>

                <Divider orientation='left'>Estado de importación</Divider>
                <Steps
                    direction={deviceState ? 'vertical' : 'horizontal'}
                    progressDot
                    size='small'
                    className='my-3'
                    current={vehicle.importState.index}
                    items={importStates.map(item => ({
                        title: <b>{item.name}</b>
                    }))}
                />
                <br />
                <Divider orientation='left'>Archivos adjuntos</Divider>
                <ImportHitory details={vehicle?.record?.filter(item => item.is_visible_customer) ?? []} loading={loading} />
                <br />
                <br />
            </div>
        </div>
    );
};

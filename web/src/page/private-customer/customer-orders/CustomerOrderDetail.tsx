import { Icon, ViewFiles } from '@/components';
import { useSocket } from '@/hooks';
import { EmptyFile, EmptyVehicle, ImportState, Vehicles } from '@/models';
import { httpGetImportState, httpGetVehiclesGetById } from '@/services';
import { getDateFormat } from '@/utilities';
import { Button, Divider, message, Modal, Steps, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const CustomerOrderDetail = () => {
    const { id } = useParams();
    const { socket } = useSocket();

    const [loading, setLoading] = useState(false);
    const [vehicle, setVehicle] = useState<Vehicles>(EmptyVehicle);
    const [importStates, setImportStates] = useState<Array<ImportState>>([]);
    const [file, setFile] = useState(EmptyFile);
    const [modal, setModal] = useState(false);

    const handleViewFile = (path: string) => {
        setFile({
            ...file,
            ruta: path
        });
        setModal(true);
    };

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

        if (socket) socket.on(`estado-${id}`, _ => handleGetDetail(Number(id)));
    }, []);

    return (
        <div className='h-100 flex flex-row justify-between'>
            <div className='card-customer-detail-gay'></div>
            <div className='card-customer-detail'>
                <Divider orientation='left'>Informacion del vehiculo</Divider>
                <div className='flex flex-column mb-3 px-5'>
                    <span className='text-label'>
                        <strong>Lote:</strong> <span>{vehicle.cotizacion.lote}</span>
                    </span>
                    <span className='text-label'>
                        <strong>Marca y modelo:</strong>
                        <span>
                            {vehicle.cotizacion.marca} - {vehicle.cotizacion.modelo}
                        </span>
                    </span>
                </div>
                <Divider orientation='left'>Informacion del vendedor</Divider>
                <div className='flex flex-column mb-3 px-5'>
                    <span className='text-label'>
                        <strong>Nombre:</strong> <span>{vehicle.cotizacion.vendedor?.nombre}</span>
                    </span>
                    <div className='flex justify-arround gap-3'>
                        <span className='text-label'>
                            <strong>Telefono:</strong> <span>{vehicle.cotizacion.vendedor?.telefono}</span>
                        </span>
                        <span className='text-label'>
                            <strong>Correo:</strong> <span>{vehicle.cotizacion.vendedor?.correo}</span>
                        </span>
                    </div>
                </div>

                <Divider orientation='left'>Estado de importación</Divider>
                <Steps
                    progressDot
                    size='small'
                    className='my-3'
                    current={vehicle.estado_importacion.index}
                    items={importStates.map(item => ({
                        title: <b>{item.estado_importacion}</b>
                    }))}
                />
                <br />
                <Divider orientation='left'>Archivos adjuntos</Divider>
                <Table
                    size='small'
                    rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                    pagination={false}
                    className='table'
                    loading={loading}
                    showSorterTooltip={false}
                    rowKey='id_historial_importacion'
                    dataSource={vehicle.historial_vechiculo.filter(item => item.visible_cliente)}
                    columns={[
                        {
                            title: 'Fecha',
                            dataIndex: 'fecha_creacion',
                            render: value => <span>{getDateFormat(value, 'DD/MM/YYYY')}</span>
                        },
                        {
                            title: 'Descripcion',
                            dataIndex: 'descripcion',
                            ellipsis: true
                        },
                        {
                            title: 'Archivo',
                            dataIndex: 'archivo',
                            render: value => (
                                <div className='text-center'>
                                    <Button type='link' icon={<Icon.Eye />} onClick={() => handleViewFile(value)} />
                                </div>
                            )
                        }
                    ]}
                />
            </div>
            <div className='card-customer-detail-gay'></div>

            <Modal
                open={modal}
                onCancel={() => {
                    setModal(false);
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
        </div>
    );
};

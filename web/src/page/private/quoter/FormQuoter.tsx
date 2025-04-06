import { Icon } from '@/components';
import { useQuoter } from '@/hooks';
import {
    Auction,
    Coin,
    Headquarter,
    HeadquarterFilter,
    HeadquarterSeparation,
    Quoter,
    TransportType,
    User,
    VehicleType
} from '@/interfaces';
import {
    httpGelUser,
    httpGetAllAuctions,
    httpGetAllHeadquarter,
    httpGetAllTransportTypes,
    httpGetAllVehicleType,
    httpGetTransportRateFiler
} from '@/services';
import { Button, Divider, Form, FormInstance, FormProps, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { QuoterDetail } from './QuoterDetail';
import { FormQuoterEmail } from './FormQuoterEmail';

interface Props {
    onClose: () => void;
}

export const FormQuoter: React.FC<Props> = ({ onClose }) => {
    const formRef = useRef<FormInstance<Quoter>>(null);
    const { quoter, customers, session, details, loading, addOrUpdate, updateDetails, deleteDetails, onAproveQuoter, onDownloadInvoice } =
        useQuoter();

    const [transportType, setTransportType] = useState<Array<TransportType>>([]);
    const [vehicleType, setVehicleType] = useState<Array<VehicleType>>([]);
    const [autions, setAutions] = useState<Array<Auction>>([]);
    const [sellers, setSellers] = useState<Array<User>>([]);
    const [headquarters, setHeadquarters] = useState<HeadquarterSeparation>({
        [HeadquarterFilter.EEUU]: [],
        [HeadquarterFilter.GT]: []
    });
    const [modal, setModal] = useState(false);

    const handleEditDetail = (name: string, value: number, deleter: boolean = false) => {
        const newDetails = [...details[Coin.USD]];
        const index = newDetails.findIndex(item => item.name === name);

        if (deleter) {
            if (index > -1) deleteDetails(newDetails[index]);
        } else {
            let detail;
            if (index > -1) {
                detail = newDetails[index];
                detail.value = value;
            } else {
                const id = Math.random().toString();
                detail = { id, name, coin: Coin.USD, value };
            }
            updateDetails(detail);
        }
    };

    const handleValuesChange: FormProps<Quoter>['onValuesChange'] = env => {
        const [key, value] = Object.entries(env)[0];
        if (key === 'customer_id' || key === 'transport_type_id' || key === 'vehicle_type_id' || key === 'headquarter_id') {
            const values = formRef.current?.getFieldsValue();
            const newValues = { ...values, [key]: value };
            if (newValues.customer_id && newValues.transport_type_id && newValues.vehicle_type_id && newValues.headquarter_id) {
                const customer_type_id = customers.find(item => item.id === newValues.customer_id)?.type?.id;
                if (customer_type_id)
                    httpGetTransportRateFiler({
                        customer_type_id,
                        transport_type_id: newValues.transport_type_id,
                        vehicle_type_id: newValues.vehicle_type_id,
                        headquarter_id: newValues.headquarter_id
                    })
                        .then(res => {
                            if (res.error) message.warning(res.message);
                            handleEditDetail('Costro de transporte', Number(res.rate), res.error);
                        })
                        .catch(err => message.error(`Error http get transport rate filer: ${err.message}`));
            }
        }

        if (key === 'auction_id') {
            const aution = autions.find(item => item.id === value);
            const name = 'Costro de Grua desde subasta';
            if (aution) handleEditDetail(name, Number(aution.crane_rate));
            else handleEditDetail(name, 0, true);
        }
    };

    const handleSubmit: FormProps<Quoter>['onFinish'] = async values => {
        try {
            const res = await addOrUpdate(values);
            if (!res.error) onClose();
        } catch (error) {
            message.error(`Error http quoter: ${(error as Error).message}`);
        }
    };

    useEffect(() => {
        httpGetAllTransportTypes()
            .then(res => setTransportType(res))
            .catch(err => message.error(`Error http get transport types: ${err.message}}`));
        httpGetAllVehicleType()
            .then(res => setVehicleType(res))
            .catch(err => message.error(`Error http get vehicle types: ${err.message}}`));
        httpGetAllAuctions()
            .then(res => setAutions(res))
            .catch(err => message.error(`Error http get auctions: ${err.message}}`));
        httpGelUser()
            .then(res => setSellers(res))
            .catch(err => message.error(`Error http get users: ${err.message}}`));

        httpGetAllHeadquarter()
            .then(res => {
                const eeuu = res.filter((item: Headquarter) => item.state && !item.department);
                const gt = res.filter((item: Headquarter) => item.department && !item.state);
                setHeadquarters({
                    [HeadquarterFilter.EEUU]: eeuu,
                    [HeadquarterFilter.GT]: gt
                });
            })
            .catch(err => message.error(`Error http get headquarters: ${err.message}}`));
    }, []);

    return (
        <>
            <Form
                ref={formRef}
                initialValues={{
                    ...quoter,
                    customer_id: quoter.customer?.id,
                    seller_id: quoter.seller?.id ?? session.session_id,
                    transport_type_id: quoter.transportType?.id,
                    vehicle_type_id: quoter.vehicleType?.id,
                    auction_id: quoter.auction?.id,
                    issuing_headquarter_id: quoter.issuingHeadquarter?.id,
                    headquarter_id: quoter.headquarter?.id
                }}
                layout='vertical'
                onFinish={handleSubmit}
                onValuesChange={handleValuesChange}
            >
                <div className='vhm-75 overflow-y'>
                    <div className='flex flex-md-column justify-between'>
                        <div className='flex-1 p-3'>
                            <Divider orientation='left'>Información del Cliente/Puerto</Divider>
                            <Form.Item label='Cliente' name='customer_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                                <Select
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={customers.map(item => ({ label: item.name, value: item.id }))}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Tipo de Trasporte'
                                name='transport_type_id'
                                rules={[{ required: true, message: 'El campo es obligatorio' }]}
                            >
                                <Select
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={transportType.map(item => ({ label: item.name, value: item.id }))}
                                />
                            </Form.Item>

                            <Divider orientation='left'>Información del las Sedes</Divider>
                            <div className='flex flex-md-column gap-3 justify-between item-end'>
                                <Form.Item
                                    label='Sede GTO'
                                    name='issuing_headquarter_id'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Select
                                        allowClear
                                        className='w-100'
                                        placeholder='Selecciones una opción'
                                        options={headquarters[HeadquarterFilter.GT].map(item => ({ label: item.name, value: item.id }))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Sede EEUU'
                                    name='headquarter_id'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Select
                                        allowClear
                                        className='w-100'
                                        placeholder='Selecciones una opción'
                                        options={headquarters[HeadquarterFilter.EEUU].map(item => ({ label: item.name, value: item.id }))}
                                    />
                                </Form.Item>
                            </div>
                            <Divider orientation='left'>Información del vehículo</Divider>
                            <div className='flex flex-md-column gap-3 justify-between item-end'>
                                <Form.Item
                                    label='Tipo de Vehículo'
                                    name='vehicle_type_id'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Select
                                        className='w-100'
                                        placeholder='Selecciones una opción'
                                        options={vehicleType.map(item => ({
                                            label: item.name,
                                            value: item.id
                                        }))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Año'
                                    name='year'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Input placeholder='Ingrese un año' />
                                </Form.Item>
                            </div>
                            <div className='flex flex-md-column gap-3 justify-between item-end'>
                                <Form.Item
                                    label='Marca'
                                    name='mark'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Input placeholder='Ingrese una Marca' />
                                </Form.Item>
                                <Form.Item
                                    label='Modelo'
                                    name='model'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Input placeholder='Ingrese un Modelo' />
                                </Form.Item>
                            </div>
                            <div className='flex flex-md-column gap-3 justify-between item-end'>
                                <Form.Item
                                    label='No. Lote'
                                    name='lot'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Input placeholder='Ingrese una Serie' />
                                </Form.Item>
                                <Form.Item
                                    label='VIN'
                                    name='vin'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Input placeholder='Ingrese un VIN' />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='flex-1 p-3'>
                            <Divider orientation='left'>Tramites EE. UU</Divider>
                            <Form.Item label='Subasta (optional)' name='auction_id'>
                                <Select
                                    allowClear
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={autions.map(item => ({ label: item.name, value: item.id }))}
                                />
                            </Form.Item>
                            <Divider orientation='left'>Información del Vendedor</Divider>
                            <Form.Item label='Vendedor' name='seller_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                                <Select
                                    allowClear
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={sellers.map(item => ({ label: item.name, value: item.id }))}
                                />
                            </Form.Item>
                            <Form.Item label='Descripcion' name='description'>
                                <Input.TextArea placeholder='Ingrese un texto' autoSize={{ minRows: 3, maxRows: 6 }} />
                            </Form.Item>
                            <QuoterDetail />
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-end gap-2'>
                    <Button
                        type='link'
                        htmlType='button'
                        loading={loading}
                        disabled={loading || quoter.id === 0}
                        icon={<Icon.Download />}
                        onClick={() => onDownloadInvoice(quoter)}
                    >
                        Descargar
                    </Button>
                    <Button
                        onClick={() => setModal(true)}
                        type='dashed'
                        htmlType='button'
                        loading={loading}
                        disabled={loading || quoter.id === 0}
                        icon={<Icon.EMail />}
                    >
                        Enviar Correo
                    </Button>
                    {!quoter.is_aproverd && (
                        <Button
                            type='primary'
                            ghost
                            htmlType='button'
                            loading={loading}
                            disabled={loading || quoter.id === 0}
                            icon={<Icon.Done />}
                            onClick={() =>
                                onAproveQuoter(quoter).then(res => {
                                    if (!res?.error) onClose();
                                })
                            }
                        >
                            Aprobar
                        </Button>
                    )}
                    <Button
                        type='primary'
                        htmlType='submit'
                        icon={<Icon.Save />}
                        loading={loading}
                        disabled={loading || quoter.is_aproverd}
                    >
                        Guardar
                    </Button>
                </div>
            </Form>

            <Modal open={modal} onCancel={() => setModal(false)} footer={null} title={<h3>Enviar correo</h3>} centered destroyOnClose>
                <FormQuoterEmail onClose={() => setModal(false)} />
            </Modal>
        </>
    );
};

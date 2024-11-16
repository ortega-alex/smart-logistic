import { Icon } from '@/components';
import { Aution, Crane, Customer, KeysCosto, Moneda, Port, Quoter, QuoterDetail as TypeQuoterDetail, TypeVehicle } from '@/models';
import { httpGetAutions, httpGetCrane, httpGetCustomer, httpGetPorts, httpGetTypeVehicles } from '@/services';
import { commaSeparateNumber } from '@/utilities';
import { Button, Divider, Form, FormInstance, FormProps, Input, message, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { QuoterDetail } from './QuoterDetail';

interface Props {
    quoter: Quoter;
    loading: boolean;
    onSubmit: (values: any, details: Array<TypeQuoterDetail>) => void;
    onDownloadInvoice: (item: Quoter) => void;
}

export const FormQuoter: React.FC<Props> = ({ quoter, loading, onSubmit, onDownloadInvoice }) => {
    const formRef = useRef<FormInstance<Quoter>>(null);

    const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [ports, setPorts] = useState<Array<Port>>([]);
    const [typeVehicles, setTypeVehicles] = useState<Array<TypeVehicle>>([]);
    const [autions, setAutions] = useState<Array<Aution>>([]);
    const [cranes, setCranes] = useState({
        USD: [],
        GTQ: [],
        all: []
    });
    const [details, setDetails] = useState<Array<TypeQuoterDetail>>([]);

    const handleValuesChange: FormProps<Quoter>['onValuesChange'] = env => {
        const [key, value] = Object.entries(env)[0];

        if (key === 'id_subasta') {
            const crane = cranes.all.filter((item: Crane) => item.subasta?.id_subasta === value && item.estado);
            if (crane) setCranes({ ...cranes, USD: crane });
            formRef.current?.setFieldValue('id_grua_usd', undefined);
        }

        handleCalculate();
    };

    const handleCalculate = () => {
        const value = formRef.current?.getFieldsValue();
        if (value && value.id_cliente) {
            let detalles = [...details];
            const customer = customers.find(item => item.id_cliente === value.id_cliente);

            const port = ports.find(item => item.id_puerto === value.id_puerto);
            if (port) {
                const indexPort = details.findIndex(item => item.nombre === KeysCosto.PORT_DOCUMENT_OR_EXP);
                if (indexPort > -1) {
                    const detalle = details[indexPort];
                    detalle.valor = commaSeparateNumber(port.costo_aduanal);
                } else {
                    detalles.push({
                        nombre: KeysCosto.PORT_DOCUMENT_OR_EXP,
                        moneda: Moneda.USD,
                        valor: commaSeparateNumber(port.costo_aduanal)
                    });
                }

                const typeVehicle = typeVehicles.find(item => item.id_tipo_vehiculo === value.id_tipo_vehiculo);
                if (typeVehicle) {
                    const indexTypeVehicle = details.findIndex(item => item.nombre === KeysCosto.PORT_SHIPPING);
                    const value = Number(port.costo_embarque) + Number(port.costo_embarque) * (Number(typeVehicle.porcentaje_costo) / 100);

                    if (indexTypeVehicle > -1) {
                        const detalle = details[indexTypeVehicle];
                        detalle.valor = commaSeparateNumber(value);
                    } else {
                        detalles.push({
                            nombre: KeysCosto.PORT_SHIPPING,
                            moneda: Moneda.USD,
                            valor: commaSeparateNumber(value)
                        });
                    }
                }
            }

            if (customer) {
                if (value.id_grua_usd) {
                    const crane_usd: Crane = cranes.USD.find((item: Crane) => item.id_grua === value.id_grua_usd)!;
                    if (crane_usd && crane_usd.costo > 0) {
                        const value = Number(crane_usd.costo) + Number(crane_usd.costo) * (Number(customer.porcentaje_costo) / 100);
                        const index = details.findIndex(item => item.nombre === KeysCosto.USD);
                        if (index > -1) {
                            const detalle = details[index];
                            detalle.valor = commaSeparateNumber(value);
                        } else {
                            detalles.push({
                                nombre: KeysCosto.USD,
                                moneda: crane_usd.moneda,
                                valor: commaSeparateNumber(value)
                            });
                        }
                    }
                } else detalles = detalles.filter(item => item.nombre !== KeysCosto.USD);

                if (value.id_grua_gt) {
                    const crane_gt: Crane = cranes.GTQ.find((item: Crane) => item.id_grua === value.id_grua_gt)!;
                    if (crane_gt && crane_gt.costo > 0) {
                        const value = Number(crane_gt.costo) + Number(crane_gt.costo) * (Number(customer.porcentaje_costo) / 100);
                        const index = details.findIndex(item => item.nombre === KeysCosto.GTQ);
                        if (index > -1) {
                            const detalle = details[index];
                            detalle.valor = commaSeparateNumber(value);
                        } else {
                            detalles.push({
                                nombre: KeysCosto.GTQ,
                                moneda: crane_gt.moneda,
                                valor: commaSeparateNumber(value)
                            });
                        }
                    }
                } else detalles = detalles.filter(item => item.nombre !== KeysCosto.GTQ);
            }
            setDetails(detalles);
        }
    };

    useEffect(() => {
        if (quoter.details) setDetails(quoter.details.map(item => ({ ...item, id: Math.random().toString() })));

        httpGetCustomer()
            .then(res => setCustomers(res?.filter((item: Customer) => item.estado)))
            .catch(err => message.error(`Error http get customers: ${err.message}}`));

        httpGetPorts()
            .then(res => setPorts(res?.filter((item: Port) => item.estado)))
            .catch(err => message.error(`Error http get ports: ${err.message}}`));

        httpGetTypeVehicles()
            .then(res => setTypeVehicles(res?.filter((item: TypeVehicle) => item.estado)))
            .catch(err => message.error(`Error http get type of vehicles: ${err.message}}`));

        httpGetAutions()
            .then(res => setAutions(res?.filter((item: Aution) => item.estado)))
            .catch(err => message.error(`Error http get autions: ${err.message}}`));

        httpGetCrane()
            .then(res => {
                const all = res?.filter((item: Crane) => item.estado);
                const GTQ = all?.filter((item: Crane) => item.moneda === Moneda.GTQ);
                const USD = all?.filter((item: Crane) => item.moneda === Moneda.USD && item.subasta?.id_subasta === quoter.id_subasta);
                setCranes({ ...cranes, GTQ, all, USD });
            })
            .catch(err => message.error(`Error http get cranes: ${err.message}}`));
    }, []);

    return (
        <>
            <Form
                ref={formRef}
                initialValues={quoter.id_cotizacion === 0 ? {} : quoter}
                layout='vertical'
                onFinish={values => onSubmit(values, details)}
                onValuesChange={handleValuesChange}
            >
                <div className='vhm-75 overflow-y'>
                    <div className='flex flex-md-column justify-between'>
                        <div className='flex-1 p-3'>
                            <Divider orientation='left'>Información del Cliente/Puerto</Divider>
                            <Form.Item label='Cliente' name='id_cliente' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                                <Select
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={customers.map(item => ({ label: item.cliente, value: item.id_cliente }))}
                                />
                            </Form.Item>
                            <Form.Item label='Puerto' name='id_puerto' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                                <Select
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={ports.map(item => ({ label: item.puerto, value: item.id_puerto }))}
                                />
                            </Form.Item>
                            <Divider orientation='left'>Información del vehículo</Divider>
                            <div className='flex flex-md-column gap-3 justify-between item-end'>
                                <Form.Item
                                    label='Tipo de Vehículo'
                                    name='id_tipo_vehiculo'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Select
                                        className='w-100'
                                        placeholder='Selecciones una opción'
                                        options={typeVehicles.map(item => ({
                                            label: item.tipo_vehiculo,
                                            value: item.id_tipo_vehiculo
                                        }))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Año'
                                    name='anio'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Input placeholder='Ingrese un año' />
                                </Form.Item>
                            </div>
                            <div className='flex flex-md-column gap-3 justify-between item-end'>
                                <Form.Item
                                    label='Marca'
                                    name='marca'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Input placeholder='Ingrese una Marca' />
                                </Form.Item>
                                <Form.Item
                                    label='Modelo'
                                    name='modelo'
                                    rules={[{ required: true, message: 'El campo es requerido' }]}
                                    className='w-100'
                                >
                                    <Input placeholder='Ingrese un Modelo' />
                                </Form.Item>
                            </div>
                            <div className='flex flex-md-column gap-3 justify-between item-end'>
                                <Form.Item
                                    label='Serie'
                                    name='serie'
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
                            <Form.Item label='Subasta (optional)' name='id_subasta'>
                                <Select
                                    allowClear
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={autions.map(item => ({ label: item.subasta, value: item.id_subasta }))}
                                />
                            </Form.Item>
                            <Form.Item label='Grua (optional)' name='id_grua_usd'>
                                <Select
                                    allowClear
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={cranes.USD?.map((item: Crane) => ({ label: item.grua, value: item.id_grua }))}
                                />
                            </Form.Item>

                            <Divider orientation='left'>Tramites GT</Divider>
                            <Form.Item label='Grua (optional)' name='id_grua_gt'>
                                <Select
                                    allowClear
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={cranes.GTQ.map((item: Crane) => ({ label: item.grua, value: item.id_grua }))}
                                />
                            </Form.Item>

                            <QuoterDetail details={details} onSubmit={details => setDetails(details)} />
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-end gap-2'>
                    <Button
                        type='link'
                        htmlType='button'
                        loading={loading}
                        disabled={loading || quoter.id_cotizacion === 0}
                        icon={<Icon.Download />}
                        onClick={() => onDownloadInvoice(quoter)}
                    >
                        Descargar
                    </Button>
                    <Button
                        type='dashed'
                        htmlType='button'
                        loading={loading}
                        disabled={loading || quoter.id_cotizacion === 0}
                        icon={<Icon.EMail />}
                    >
                        Enviar Correo
                    </Button>
                    {!quoter.aprobada && (
                        <Button
                            type='primary'
                            ghost
                            htmlType='button'
                            loading={loading}
                            disabled={loading || quoter.id_cotizacion === 0}
                            icon={<Icon.Done />}
                            onClick={() => onDownloadInvoice(quoter)}
                        >
                            Aprobar
                        </Button>
                    )}
                    <Button type='primary' htmlType='submit' icon={<Icon.Save />} loading={loading} disabled={loading || quoter.aprobada}>
                        Guardar
                    </Button>
                </div>
            </Form>
        </>
    );
};

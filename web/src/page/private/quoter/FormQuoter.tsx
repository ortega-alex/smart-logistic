import { Icon } from '@/components';
import { Aution, color, Costo, Crane, Customer, KeysCosto, Moneda, Port, Quoter, TypeVehicle, Vehicle } from '@/models';
import { httpGetAutions, httpGetCrane, httpGetCustomer, httpGetPorts, httpGetTypeVehicles } from '@/services';
import { Button, Divider, Form, FormInstance, FormProps, Input, message, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    quoter: Quoter;
}

export const FormQuoter: React.FC<Props> = ({ quoter }) => {
    const formRef = useRef<FormInstance<Quoter>>(null);

    const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [ports, setPorts] = useState<Array<Port>>([]);
    const [typeVehicles, setTypeVehicles] = useState<Array<TypeVehicle>>([]);
    const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);
    const [autions, setAutions] = useState<Array<Aution>>([]);
    const [cranes, setCranes] = useState({
        USD: [],
        GTQ: [],
        all: []
    });
    const [loading, setLoading] = useState(false);
    const [costs, setCosts] = useState<Costo>({});

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
        const values = formRef.current?.getFieldsValue();
        if (values && values.id_cliente) {
            const costos = { ...costs };
            const customer = customers.find(item => item.id_cliente === values.id_cliente);
            if (customer) {
                if (values.id_grua_usd) {
                    const crane_usd: Crane = cranes.USD.find((item: Crane) => item.id_grua === values.id_grua_usd)!;
                    if (crane_usd && crane_usd.costo > 0) {
                        const costo = Number(crane_usd.costo) + Number(crane_usd.costo) * (Number(customer.porcentaje_descuento) / 100);
                        costos[KeysCosto.USD] = crane_usd.moneda + ' ' + costo;
                    }
                } else delete costos[KeysCosto.USD];

                if (values.id_grua_gt) {
                    const crane_gt: Crane = cranes.GTQ.find((item: Crane) => item.id_grua === values.id_grua_gt)!;
                    if (crane_gt && crane_gt.costo > 0) {
                        const costo = Number(crane_gt.costo) + Number(crane_gt.costo) * (Number(customer.porcentaje_descuento) / 100);
                        costos[KeysCosto.GT] = crane_gt.moneda + ' ' + costo;
                    }
                } else delete costos[KeysCosto.GT];
            }
            setCosts(costos);
        }
    };

    const handleSubmit: FormProps<Quoter>['onFinish'] = async values => {
        try {
            setLoading(true);
            console.log({ ...quoter, ...values });
        } catch (error) {
            message.error(`Error add or edit ouoter: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (quoter.id_cotizacion === 0) {
            const _vehicles = [];
            _vehicles.push({});
            setVehicles(_vehicles);
        }

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
                setCranes({ ...cranes, GTQ, all });
            })
            .catch(err => message.error(`Error http get cranes: ${err.message}}`));
    }, []);

    return (
        <Form ref={formRef} layout='vertical' onFinish={handleSubmit} onValuesChange={handleValuesChange}>
            <div className='vh-75 overflow-y'>
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
                {vehicles.map((item, i) => (
                    <div key={i}>
                        {item.id && (
                            <>
                                <Divider>
                                    <Button
                                        icon={<Icon.ArrowDown />}
                                        size='small'
                                        type='link'
                                        htmlType='button'
                                        danger
                                        onClick={() => {
                                            const _vehicles = [...vehicles].filter(_item => _item.id !== item.id);
                                            setVehicles(_vehicles);
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </Divider>
                            </>
                        )}
                        <div className='flex flex-md-column gap-3 justify-between item-end'>
                            <Form.Item
                                label='Tipo de Vehículo'
                                name={`${item.id ? item.id + '-' : ''}id_tipo_vehiculo`}
                                rules={[{ required: true, message: 'El campo es requerido' }]}
                                className='w-100'
                            >
                                <Select
                                    className='w-100'
                                    placeholder='Selecciones una opción'
                                    options={typeVehicles.map(item => ({ label: item.tipo_vehiculo, value: item.id_tipo_vehiculo }))}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Año'
                                name={`${item.id ? item.id + '-' : ''}anio`}
                                rules={[{ required: true, message: 'El campo es requerido' }]}
                                className='w-100'
                            >
                                <Input placeholder='Ingrese un año' />
                            </Form.Item>
                        </div>
                        <div className='flex flex-md-column gap-3 justify-between item-end'>
                            <Form.Item
                                label='Marca'
                                name={`${item.id ? item.id + '-' : ''}marca`}
                                rules={[{ required: true, message: 'El campo es requerido' }]}
                                className='w-100'
                            >
                                <Input placeholder='Ingrese una Marca' />
                            </Form.Item>
                            <Form.Item
                                label='Modelo'
                                name={`${item.id ? item.id + '-' : ''}modelo`}
                                rules={[{ required: true, message: 'El campo es requerido' }]}
                                className='w-100'
                            >
                                <Input placeholder='Ingrese un Modelo' />
                            </Form.Item>
                        </div>
                    </div>
                ))}
                <div className='text-right'>
                    <Button
                        type='primary'
                        style={{ color: color.secondary, borderColor: color.secondary }}
                        ghost
                        size='small'
                        htmlType='button'
                        icon={<Icon.Plus />}
                        onClick={() => {
                            const _vehicles = [...vehicles];
                            _vehicles.push({
                                id: String(Math.random())
                            });
                            setVehicles(_vehicles);
                        }}
                    >
                        Agregar
                    </Button>
                </div>

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

                <Divider orientation='left'>Costos</Divider>
                {Object.keys(costs).map(key => (
                    <div key={key} className='flex flex-row justify-between gap-3 items-center'>
                        <strong className='flex-1'>{key}: </strong>
                        <span>{costs[key as keyof Costo]}</span>
                        <Button type='link' htmlType='button' icon={<Icon.Edit />} />
                    </div>
                ))}
            </div>

            <div className='text-right'>
                <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                    Generar
                </Button>
            </div>
        </Form>
    );
};

import { Icon } from '@/components';
import { Aution, Costo, Crane, Customer, KeysCosto, Moneda, Port, Quoter, Sesion, TypeVehicle, Vehicle } from '@/models';
import { RootState } from '@/redux';
import {
    httpAddQuoter,
    httpGetAutions,
    httpGetCrane,
    httpGetCustomer,
    httpGetPorts,
    httpGetTypeVehicles,
    httpUpdateQuoter
} from '@/services';
import { commaSeparateNumber } from '@/utilities';
import { Button, Divider, Form, FormInstance, FormProps, Input, message, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Cost } from './Cost';

interface Props {
    quoter: Quoter;
    onClose: () => void;
}

export const FormQuoter: React.FC<Props> = ({ quoter, onClose }) => {
    const formRef = useRef<FormInstance<Quoter>>(null);
    const sessionState: Sesion = useSelector((store: RootState) => store.session);

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
    const [costs, setCosts] = useState<Array<Costo>>([]);

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
            let costos = [...costs];
            const customer = customers.find(item => item.id_cliente === value.id_cliente);

            const port = ports.find(item => item.id_puerto === value.id_puerto);
            if (port) {
                const indexPort = costs.findIndex(item => item.nombre === KeysCosto.PORT_DOCUMENT_OR_EXP);
                if (indexPort > -1) {
                    const costo = costs[indexPort];
                    costo.valor = commaSeparateNumber(port.costo_aduanal);
                } else {
                    costos.push({
                        nombre: KeysCosto.PORT_DOCUMENT_OR_EXP,
                        moneda: Moneda.USD,
                        valor: commaSeparateNumber(port.costo_aduanal)
                    });
                }

                const typeVehicle = typeVehicles.find(item => item.id_tipo_vehiculo === value.id_tipo_vehiculo);
                if (typeVehicle) {
                    const indexTypeVehicle = costs.findIndex(item => item.nombre === KeysCosto.PORT_SHIPPING);
                    const value = Number(port.costo_embarque) + Number(port.costo_embarque) * (Number(typeVehicle.porcentaje_costo) / 100);

                    if (indexTypeVehicle > -1) {
                        const costo = costs[indexTypeVehicle];
                        costo.valor = commaSeparateNumber(value);
                    } else {
                        costos.push({
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
                        const index = costs.findIndex(item => item.nombre === KeysCosto.USD);
                        if (index > -1) {
                            const costo = costs[index];
                            costo.valor = commaSeparateNumber(value);
                        } else {
                            costos.push({
                                nombre: KeysCosto.USD,
                                moneda: crane_usd.moneda,
                                valor: commaSeparateNumber(value)
                            });
                        }
                    }
                } else costos = costos.filter(item => item.nombre !== KeysCosto.USD);

                if (value.id_grua_gt) {
                    const crane_gt: Crane = cranes.GTQ.find((item: Crane) => item.id_grua === value.id_grua_gt)!;
                    if (crane_gt && crane_gt.costo > 0) {
                        const value = Number(crane_gt.costo) + Number(crane_gt.costo) * (Number(customer.porcentaje_costo) / 100);
                        const index = costs.findIndex(item => item.nombre === KeysCosto.GT);
                        if (index > -1) {
                            const costo = costs[index];
                            costo.valor = commaSeparateNumber(value);
                        } else {
                            costos.push({
                                nombre: KeysCosto.GT,
                                moneda: crane_gt.moneda,
                                valor: commaSeparateNumber(value)
                            });
                        }
                    }
                } else costos = costos.filter(item => item.nombre !== KeysCosto.GT);
            }
            setCosts(costos);
        }
    };

    const handleSubmit: FormProps<Quoter>['onFinish'] = async value => {
        try {
            setLoading(true);
            let res;
            const _quoter = { ...quoter, ...value, costos: costs };
            if (quoter.id_cotizacion === 0) res = await httpAddQuoter({ ..._quoter, id_vendedor: sessionState.id_sesion });
            else res = await httpUpdateQuoter(_quoter);

            if (res.message) message.warning(res.message);
            else onClose();
        } catch (error) {
            message.error(`Error add or edit ouoter: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const _vehicles = [];
        _vehicles.push({});
        setVehicles(_vehicles);

        if (quoter.costos) setCosts(quoter.costos);

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
                onFinish={handleSubmit}
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
                                                options={typeVehicles.map(item => ({
                                                    label: item.tipo_vehiculo,
                                                    value: item.id_tipo_vehiculo
                                                }))}
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
                            {/* <div className='text-right'>
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
                            </div> */}
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

                            <Divider orientation='left'>Costos</Divider>
                            <Cost costs={costs} onSubmit={setCosts} />
                        </div>
                    </div>
                </div>

                <div className='text-right mt-3'>
                    <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                        Guardar
                    </Button>
                </div>
            </Form>
        </>
    );
};

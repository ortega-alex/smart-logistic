import { Icon } from '@/components';
import { Aution, color, Crane, Customer, Port, Quoter, TypeVehicle, Vehicle } from '@/models';
import { httpGetAutions, httpGetCrane, httpGetCustomer, httpGetPorts, httpGetTypeVehicles } from '@/services';
import { Button, Divider, Form, FormProps, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';

interface Props {
    quoter: Quoter;
}

export const FormQuoter: React.FC<Props> = ({ quoter }) => {
    const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [ports, setPorts] = useState<Array<Port>>([]);
    const [typeVehicles, setTypeVehicles] = useState<Array<TypeVehicle>>([]);
    const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);
    const [autions, setAutions] = useState<Array<Aution>>([]);
    const [cranes, setCranes] = useState<Array<Crane>>([]);
    const [loading, setLoading] = useState(false);

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
            .then(res => setCranes(res?.filter((item: Crane) => item.estado)))
            .catch(err => message.error(`Error http get cranes: ${err.message}}`));
    }, []);

    return (
        <Form layout='vertical' onFinish={handleSubmit}>
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
                        className='w-100'
                        placeholder='Selecciones una opción'
                        options={autions.map(item => ({ label: item.subasta, value: item.id_subasta }))}
                    />
                </Form.Item>
                <Form.Item label='Grua (optional)' name='id_puerto'>
                    <Select
                        className='w-100'
                        placeholder='Selecciones una opción'
                        options={cranes.map(item => ({ label: item.grua, value: item.id_grua }))}
                    />
                </Form.Item>

                <Divider orientation='left'>Tramites GT</Divider>
                <Form.Item label='Grua (optional)' name='id_grua_gt'>
                    <Select
                        className='w-100'
                        placeholder='Selecciones una opción'
                        options={cranes.map(item => ({ label: item.grua, value: item.id_grua }))}
                    />
                </Form.Item>

                <Divider orientation='left'>Costos</Divider>
            </div>

            <div className='text-right'>
                <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                    Generar
                </Button>
            </div>
        </Form>
    );
};

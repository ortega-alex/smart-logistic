import { Auction, Headquarter, HeadquarterFilter, State } from '@/interfaces';
import { httpAddAuctions, httpGetAllHeadquarter, httpGetAllStates, httpUpdateAuctions } from '@/services';
import { commaSeparateNumber } from '@/utilities';
import { Button, Form, FormProps, Input, InputNumber, message, Select, Switch } from 'antd';
import React, { useEffect, useState } from 'react';

interface Props {
    auction: Auction;
    onClose: () => void;
}

export const FormAution: React.FC<Props> = ({ auction, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState<Array<State>>([]);
    const [headquarter, setHeadquarter] = useState<Array<Headquarter>>([]);

    const handleSubmit: FormProps<Auction>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (auction.id > 0) res = await httpUpdateAuctions({ ...auction, ...values });
            else res = await httpAddAuctions(values);

            message[res.error ? 'warning' : 'success'](res.message);
            if (!res.error) onClose();
        } catch (error) {
            message.error(`Error http add or edit aution: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        httpGetAllStates()
            .then(res => setStates(res))
            .catch(err => message.error(`Error http get states: ${err.message}`));

        httpGetAllHeadquarter(HeadquarterFilter.ENG)
            .then(res => setHeadquarter(res))
            .catch(err => message.error(`Error http get sedes: ${err.message}`));
    }, []);

    return (
        <Form
            layout='vertical'
            initialValues={{
                ...auction,
                state_id: auction.state?.id,
                sede_id: auction.headquarter?.id
            }}
            onFinish={handleSubmit}
        >
            <Form.Item label='Nombre Subasta' name='name' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre' />
            </Form.Item>

            <Form.Item label='Estado EEUU' name='state_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    showSearch
                    optionFilterProp='label'
                    filterSort={(input, option) => (input?.label ?? '').toLowerCase().localeCompare((option?.label ?? '').toLowerCase())}
                    placeholder='Seleccione un estado'
                    options={states.map(item => ({ label: item.name, value: item.id }))}
                />
            </Form.Item>

            <Form.Item label='Sede' name='sede_id' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    showSearch
                    optionFilterProp='label'
                    filterSort={(input, option) => (input?.label ?? '').toLowerCase().localeCompare((option?.label ?? '').toLowerCase())}
                    placeholder='Seleccione una sede'
                    options={headquarter.map(item => ({ label: item.name, value: item.id }))}
                />
            </Form.Item>

            <Form.Item label='Tarifa' name='crane_rate' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <InputNumber className='w-100' min={0} formatter={value => commaSeparateNumber(value ?? '')} />
            </Form.Item>

            <Form.Item name='is_active' label='Estado' valuePropName='checked'>
                <Switch checkedChildren='Activo' unCheckedChildren='Inactivo' />
            </Form.Item>

            <div className='text-right'>
                <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
};

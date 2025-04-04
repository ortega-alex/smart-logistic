import { Department, Headquarter, State } from '@/interfaces';
import { httpAddHeadquarter, httpUpdateHeadquarter } from '@/services';
import { Button, Form, FormInstance, FormProps, Input, message, Select, Switch } from 'antd';
import React, { useState } from 'react';

type Props = {
    headquarter: Headquarter;
    states: Array<State>;
    departments: Array<Department>;
    onClose: () => void;
};

export const FormHeadquarter: React.FC<Props> = ({ headquarter, states, departments, onClose }) => {
    const formRef = React.useRef<FormInstance<Headquarter>>(null);

    const [required, setRequired] = useState({
        state: false,
        department: false
    });
    const [loading, setLoading] = useState(false);

    const handleValuesChange: FormProps<Headquarter>['onValuesChange'] = env => {
        const [key, _value] = Object.entries(env)[0];
        if (key === 'state_id' || key === 'department_id') {
            let _required = { ...required };
            if (key === 'state_id') _required = { state: true, department: false };
            else if (key === 'department_id') _required = { state: false, department: true };
            setRequired(_required);
            formRef.current?.validateFields();
        }
    };

    const handleSubmit: FormProps<Headquarter>['onFinish'] = async values => {
        try {
            if (values?.state_id && values?.department_id) return message.warning('Solo se puede asignar Estado o Departamento a una sede');
            if (!values.state_id || values.department) return message.warning('Seleccione el estado o el departamento');

            setLoading(true);
            const data = { ...headquarter, ...values };
            let res;
            if (headquarter.id > 0) res = await httpUpdateHeadquarter(data);
            else res = await httpAddHeadquarter(data);
            message[res.success ? 'success' : 'warning'](res.message);
            if (res.success) onClose();
        } catch (error) {
            message.error(`Error http add or edit headquarter: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            layout='vertical'
            onValuesChange={handleValuesChange}
            onFinish={handleSubmit}
            ref={formRef}
            initialValues={{
                ...headquarter,
                state_id: headquarter.state?.id,
                department_id: headquarter.department?.id
            }}
        >
            <Form.Item label='Nombre' name='name' rules={[{ required: true, message: 'Requerido' }]}>
                <Input placeholder='Ingrese el nombre de la sede' />
            </Form.Item>
            <Form.Item label='Direccion' name='address' tooltip='Opcional'>
                <Input.TextArea placeholder='Ingrese la direccion de la sede' rows={4} />
            </Form.Item>
            <Form.Item label='Estado EEUU' name='state_id' rules={[{ required: required.state, message: 'Requerido' }]}>
                <Select
                    allowClear
                    showSearch
                    optionFilterProp='label'
                    filterSort={(input, option) => (input?.label ?? '').toLowerCase().localeCompare((option?.label ?? '').toLowerCase())}
                    placeholder='Seleccione un estado'
                    options={states.map(item => ({ label: item.name, value: item.id }))}
                />
            </Form.Item>
            <Form.Item label='Departamento GT' name='department_id' rules={[{ required: required.department, message: 'Requerido' }]}>
                <Select
                    allowClear
                    showSearch
                    optionFilterProp='label'
                    filterSort={(input, option) => (input?.label ?? '').toLowerCase().localeCompare((option?.label ?? '').toLowerCase())}
                    placeholder='Seleccione un estado'
                    options={departments.map(item => ({ label: item.name, value: item.id }))}
                />
            </Form.Item>

            <Form.Item name='is_active' label='Estado' valuePropName='checked'>
                <Switch checkedChildren='Activo' unCheckedChildren='Inactivo' />
            </Form.Item>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' disabled={loading} loading={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
};

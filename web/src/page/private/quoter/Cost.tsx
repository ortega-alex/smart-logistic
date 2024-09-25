import { Icon } from '@/components';
import { color, Costo, EmptyCosto, Moneda } from '@/models';
import { commaSeparateNumber } from '@/utilities';
import { Button, Form, FormProps, Input, InputNumber, Modal, Select } from 'antd';
import { useState } from 'react';

interface Props {
    costs: Array<Costo>;
    onSubmit: (costs: Array<Costo>) => void;
}

export const Cost: React.FC<Props> = ({ costs, onSubmit }) => {
    const [cost, setCost] = useState<Costo>(EmptyCosto);
    const [modal, setModal] = useState(false);

    const handleSubmitCost: FormProps<Costo>['onFinish'] = async values => {
        const _costs = [...costs];
        _costs[cost.index ?? 0] = { ...values, valor: commaSeparateNumber(values.valor ?? '') };
        onSubmit(_costs);
        setModal(false);
    };

    return (
        <>
            {costs.map((item, i) => (
                <div key={i} className='flex flex-row justify-between gap-3 items-center'>
                    <strong className='flex-1'>{item.nombre}: </strong>
                    <span>{item.moneda}</span>
                    <span>{item.valor}</span>
                    <div>
                        <Button
                            type='link'
                            htmlType='button'
                            size='small'
                            icon={<Icon.Edit />}
                            onClick={() => {
                                setCost({ ...item, index: i });
                                setModal(true);
                            }}
                        />
                        <Button
                            danger
                            type='link'
                            size='small'
                            htmlType='button'
                            icon={<Icon.Trash />}
                            onClick={() => onSubmit(costs.filter((_item, index) => index !== i))}
                        />
                    </div>
                </div>
            ))}
            <div className='text-right mt-3'>
                <Button
                    type='primary'
                    style={{ color: color.secondary, borderColor: color.secondary }}
                    ghost
                    size='small'
                    htmlType='button'
                    icon={<Icon.Plus />}
                    onClick={() => {
                        const _costs = [...costs];
                        _costs.push(EmptyCosto);
                        onSubmit(_costs);
                        setCost({
                            ...EmptyCosto,
                            index: _costs.length - 1
                        });
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            <Modal open={modal} onCancel={() => setModal(false)} footer={null} title='Editar' destroyOnClose>
                <Form layout='vertical' initialValues={cost} onFinish={handleSubmitCost}>
                    <Form.Item label='Titulo' name='nombre' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Input placeholder='Ingrese un titulo' />
                    </Form.Item>
                    <Form.Item label='Moneda' name='moneda' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Select
                            allowClear
                            className='w-100'
                            placeholder='Selecciones una opción'
                            options={Object.keys(Moneda).map(item => ({ label: item, value: item }))}
                        />
                    </Form.Item>
                    <Form.Item label='Valor' name='valor' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <InputNumber
                            placeholder='Ingrese un valor'
                            className='w-100'
                            formatter={value => commaSeparateNumber(value ?? '')}
                        />
                    </Form.Item>
                    <div className='text-right mt-3'>
                        <Button type='primary' htmlType='submit'>
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

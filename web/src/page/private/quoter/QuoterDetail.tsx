import { Icon } from '@/components';
import { color, Costo, EmptyCosto, Moneda, QuoterDetail as TypeQuoterDetail } from '@/models';
import { commaSeparateNumber } from '@/utilities';
import { Button, Divider, Form, FormProps, Input, InputNumber, Modal, Select } from 'antd';
import { useState } from 'react';

interface Props {
    aprobado: boolean;
    details: Array<TypeQuoterDetail>;
    onSubmit: (details: Array<TypeQuoterDetail>) => void;
}

export const QuoterDetail: React.FC<Props> = ({ aprobado, details, onSubmit }) => {
    const [cost, setCost] = useState<Costo>(EmptyCosto);
    const [modal, setModal] = useState(false);

    const handleSubmitCost: FormProps<Costo>['onFinish'] = async values => {
        const _details = [...details];
        _details.push({ ...values, valor: commaSeparateNumber(values.valor ?? '') });
        onSubmit(_details);
        setModal(false);
    };

    const renderDetail = (_details: Array<TypeQuoterDetail>) => (
        <>
            {_details.map((item, i) => (
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
                            disabled={aprobado}
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
                            disabled={aprobado}
                            onClick={() => {
                                const values = details.filter(_item => _item.moneda !== item.moneda);
                                const deleted = _details.filter((_item, index) => index !== i);
                                onSubmit([...values, ...deleted]);
                            }}
                        />
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <>
            {details.some(item => item.moneda === Moneda.USD) && <Divider orientation='left'>Costos USD</Divider>}
            {renderDetail(details.filter(item => item.moneda === Moneda.USD))}

            {details.some(item => item.moneda === Moneda.GTQ) && <Divider orientation='left'>Costos GTQ</Divider>}
            {renderDetail(details.filter(item => item.moneda === Moneda.GTQ))}

            <div className='text-right mt-3'>
                <Button
                    type='primary'
                    style={{ color: color.secondary, borderColor: color.secondary }}
                    ghost
                    size='small'
                    htmlType='button'
                    icon={<Icon.Plus />}
                    onClick={() => setModal(true)}
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
                            options={Object.keys(Moneda).map(key => ({ label: key, value: Moneda[key as keyof typeof Moneda] }))}
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

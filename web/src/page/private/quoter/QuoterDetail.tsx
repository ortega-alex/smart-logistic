import { Icon } from '@/components';
import { color } from '@/constants';
import { useQuoter } from '@/hooks';
import { Coin, QuoterDetail as QuoterDetailInterface } from '@/interfaces';
import { commaSeparateNumber } from '@/utilities';
import { Button, Divider, Form, FormInstance, FormProps, Input, InputNumber, Modal, Select } from 'antd';
import { useRef, useState } from 'react';

export const QuoterDetail = () => {
    const formRef = useRef<FormInstance<QuoterDetailInterface>>(null);
    const { quoter, details, updateDetails, deleteDetails } = useQuoter();

    const [modal, setModal] = useState(false);

    const handleAdd = () => {
        setModal(true);
        setTimeout(() => {
            formRef.current?.resetFields();
        }, 100);
    };

    const handleEdit = async (detail: QuoterDetailInterface) => {
        setModal(true);
        setTimeout(() => {
            formRef.current?.setFieldsValue({
                id: detail.id,
                name: detail.name,
                value: detail.value,
                coin: detail.coin
            });
        }, 100);
    };

    const handleSubmit: FormProps<QuoterDetailInterface>['onFinish'] = async values => {
        if (!values.id) values.id = Math.random().toString();
        updateDetails(values);
        setModal(false);
    };

    const renderDetail = (details: Array<QuoterDetailInterface>, coin: Coin) => {
        const total = details.reduce((acum, item) => acum + Number(item.value), 0);
        return (
            <>
                {details.map((item, i) => (
                    <div key={i} className='flex flex-row justify-between gap-3 items-center'>
                        <span className='flex-1'>{item.name}: </span>
                        <span>{item.coin}</span>
                        <span>{commaSeparateNumber(item.value)}</span>
                        <div>
                            <Button
                                type='link'
                                htmlType='button'
                                size='small'
                                icon={<Icon.Edit />}
                                disabled={quoter.is_aproverd}
                                onClick={() => handleEdit(item)}
                            />
                            <Button
                                danger
                                type='link'
                                size='small'
                                htmlType='button'
                                icon={<Icon.Trash />}
                                disabled={quoter.is_aproverd}
                                onClick={() => deleteDetails(item)}
                            />
                        </div>
                    </div>
                ))}

                <div className='flex flex-row justify-between gap-3 items-center my-2 px-5'>
                    <strong className='flex-1'>Total: </strong>
                    <strong>
                        {coin}
                        {commaSeparateNumber(total)}
                    </strong>
                </div>
            </>
        );
    };

    return (
        <>
            {details[Coin.USD].length > 0 && (
                <>
                    <Divider orientation='left'>Costos USD</Divider>
                    {renderDetail(details[Coin.USD], Coin.USD)}
                </>
            )}

            {details[Coin.GTQ].length > 0 && (
                <>
                    <Divider orientation='left'>Costos GTQ</Divider>
                    {renderDetail(details[Coin.GTQ], Coin.USD)}
                </>
            )}

            <div className='text-right mt-3'>
                <Button
                    type='primary'
                    style={{ color: color.secondary, borderColor: color.secondary }}
                    ghost
                    size='small'
                    htmlType='button'
                    icon={<Icon.Plus />}
                    disabled={quoter.is_aproverd}
                    onClick={handleAdd}
                >
                    Agregar
                </Button>
            </div>

            <Modal open={modal} onCancel={() => setModal(false)} footer={null} title='Editar'>
                <Form ref={formRef} layout='vertical' onFinish={handleSubmit}>
                    <Form.Item name='id' hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Titulo' name='name' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Input placeholder='Ingrese un titulo' />
                    </Form.Item>
                    <Form.Item label='Moneda' name='coin' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Select
                            allowClear
                            className='w-100'
                            placeholder='Selecciones una opción'
                            options={Object.keys(Coin).map(key => ({ label: key, value: Coin[key as keyof typeof Coin] }))}
                        />
                    </Form.Item>
                    <Form.Item label='Valor' name='value' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <InputNumber
                            placeholder='Ingrese un valor'
                            className='w-100'
                            formatter={value => (value ? commaSeparateNumber(value ?? 0) : '')}
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

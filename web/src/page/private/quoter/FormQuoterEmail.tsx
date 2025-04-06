import { Icon } from '@/components';
import { useQuoter } from '@/hooks';
import { Email } from '@/interfaces';
import { httpSendQuoterEmail } from '@/services';
import { Button, Checkbox, Form, FormProps, Input, message, Select } from 'antd';
import React from 'react';

type Props = {
    onClose: () => void;
};

export const FormQuoterEmail: React.FC<Props> = ({ onClose }) => {
    const { quoter, session } = useQuoter();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit: FormProps<Email>['onFinish'] = async values => {
        setLoading(true);
        httpSendQuoterEmail({
            ...values,
            quoter_id: quoter.id,
            to: values.to.toString()
        })
            .then(res => {
                message[res.success ? 'success' : 'warning'](res.message);
                if (res.success) onClose();
            })
            .catch(err => message.error(`Error http send quoter email: ${(err as Error).message}`))
            .finally(() => setLoading(false));
    };

    return (
        <Form
            layout='vertical'
            initialValues={{
                from: session.email,
                to: quoter.customer?.email
            }}
            onFinish={handleSubmit}
        >
            <Form.Item name='from' label='De' rules={[{ required: true, message: 'El campo es requerido' }]}>
                <Input placeholder='Ingrese su correo' />
            </Form.Item>
            <Form.Item name='to' label='Para' tooltip='Opcional'>
                <Select
                    mode='tags'
                    options={quoter.customer?.email ? [{ label: quoter.customer.email, value: quoter.customer.email, disabled: true }] : []}
                />
            </Form.Item>
            <Form.Item name='subject' label='Asunto' rules={[{ required: true, message: 'El campo es requerido' }]}>
                <Input placeholder='Ingrese un asunto' />
            </Form.Item>
            <Form.Item name='body' label='Contendido' rules={[{ required: true, message: 'El campo es requerido' }]}>
                <Input.TextArea placeholder='Ingrese un texto' autoSize={{ minRows: 3, maxRows: 6 }} />
            </Form.Item>
            <Form.Item name='sendAttachment' valuePropName='checked' label={null}>
                <Checkbox>Adjuntar Cotización</Checkbox>
            </Form.Item>
            <div className='text-right mt-3'>
                <Button htmlType='submit' type='primary' icon={<Icon.EMail />} disabled={loading} loading={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
};

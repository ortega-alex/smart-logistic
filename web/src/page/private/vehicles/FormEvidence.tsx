import { Icon } from '@/components';
import { ImportHistoryEvidence, Sesion, Vehicles } from '@/models';
import { RootState } from '@/redux';
import { httpImportHistoryEvidence } from '@/services';
import { Button, Checkbox, Form, FormProps, Input, message, Upload } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
    vehicle: Vehicles;
    onClose: () => void;
}

export const FormEvidence: React.FC<Props> = ({ vehicle, onClose }) => {
    const sessionState: Sesion = useSelector((store: RootState) => store.session);

    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<ImportHistoryEvidence>['onFinish'] = async values => {
        setLoading(true);
        const data = {
            ...values,
            image: values.image?.[0]?.originFileObj,
            id_estado_importacion: vehicle.estado_importacion.id_estado_importacion,
            id_usuario: sessionState.id_sesion
        };
        httpImportHistoryEvidence(vehicle.id_vehiculo, data)
            .then(res => {
                message[res.success ? 'success' : 'warning'](res.message);
                if (res.success) onClose();
            })
            .catch(err => message.error(`Error http import history evidence: ${(err as Error).message}`))
            .finally(() => setLoading(false));
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Form layout='vertical' name='evidence' onFinish={handleSubmit}>
            <Form.Item
                label='Imagen'
                name='image'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'El campo es obligatorio' }]}
            >
                <Upload
                    accept={'.png, .jpg, .jpeg'}
                    onChange={info => (info.file.status = 'done')}
                    customRequest={() => {}}
                    listType='picture-card'
                    onPreview={() => {}}
                    maxCount={1}
                >
                    <button style={{ border: 0, background: 'none' }} type='button'>
                        <Icon.Plus />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                </Upload>
            </Form.Item>
            <Form.Item label='Descripcion' name='descripcion' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label='Visible por el cliente' name='visible_cliente' valuePropName='checked'>
                <Checkbox />
            </Form.Item>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' disabled={loading} loading={loading}>
                    Enviar
                </Button>
            </div>
        </Form>
    );
};

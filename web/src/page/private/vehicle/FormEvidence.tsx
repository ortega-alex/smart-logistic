import { Icon } from '@/components';
import { useVehicle } from '@/hooks';
import { ImportHistory, ImportState, Sesion } from '@/interfaces';
// import { ImportHistory, ImportState } from '@/models';
import { RootState } from '@/redux';
import { httpAddImportHistory, httpGetImportState } from '@/services';
import { Button, Checkbox, Form, FormProps, Input, message, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
    onClose: () => void;
}

export const FormEvidence: React.FC<Props> = ({ onClose }) => {
    const sessionState: Sesion = useSelector((store: RootState) => store.session);
    const { vehicle } = useVehicle();

    const [loading, setLoading] = useState(false);
    const [importState, setImportState] = useState<Array<ImportState>>([]);

    const handleSubmit: FormProps<ImportHistory>['onFinish'] = async values => {
        setLoading(true);
        const data = {
            ...values,
            path: values.path?.[0]?.originFileObj,
            user_id: sessionState.session_id,
            customer_id: vehicle.quoter.customer?.id
        };
        httpAddImportHistory(vehicle.id, data)
            .then(res => {
                message[res.success ? 'success' : 'warning'](res.message);
                if (res.success) onClose();
            })
            .catch(err => message.error(`Error http import history evidence: ${(err as Error).message}`))
            .finally(() => setLoading(false));
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    useEffect(() => {
        httpGetImportState()
            .then(res => setImportState(res))
            .catch(err => message.error(`Error http get import state ${err.message}`));
    }, []);

    return (
        <Form layout='vertical' name='evidence' onFinish={handleSubmit} initialValues={{ id_estado_importacion: vehicle.importState.id }}>
            <Form.Item
                tooltip='Permite cambiar el estado de la importación'
                label='Estado'
                name='import_state_id'
                rules={[{ required: true, message: 'El campo es obligatorio' }]}
            >
                <Select placeholder='Seleccione un estado' options={importState.map(item => ({ label: item.name, value: item.id }))} />
            </Form.Item>
            <Form.Item
                label='Archivo'
                name='path'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'El campo es obligatorio' }]}
            >
                <Upload
                    accept={'.png, .jpg, .jpeg, .tif, .tiff, .pdf'}
                    onChange={info => (info.file.status = 'done')}
                    customRequest={() => {}}
                    listType='picture-card'
                    onPreview={() => {}}
                    maxCount={1}
                >
                    <button style={{ border: 0, background: 'none' }} type='button'>
                        <Icon.Plus />
                        <div style={{ marginTop: 8 }}>Cargar</div>
                    </button>
                </Upload>
            </Form.Item>
            <Form.Item label='Descripcion' name='description' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label='Visible por el cliente' name='is_visible_customer' valuePropName='checked'>
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

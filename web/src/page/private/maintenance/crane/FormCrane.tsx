import { Aution, Crane, Moneda } from '@/models';
import { httpAddCrane, httpGetAutions, httpUpdateCrane } from '@/services';
import { Button, Form, FormProps, Input, InputNumber, message, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
    crane: Crane;
    onClose: () => void;
}

export const FormCrane: React.FC<Props> = ({ crane, onClose }) => {
    const [autions, setAutions] = useState<Array<Aution>>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<Crane>['onFinish'] = async values => {
        try {
            setLoading(true);
            let res;
            if (crane.id_grua > 0) res = await httpUpdateCrane({ ...crane, ...values });
            else res = await httpAddCrane(values);

            if (res.message) message.warning(res.message);
            else {
                message.success(`Grua ${crane.id_grua > 0 ? 'editada' : 'agregada'} correctamente`);
                onClose();
            }
        } catch (error) {
            message.error(`Error http add crane: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        httpGetAutions()
            .then(res => setAutions(res))
            .catch(err => message.error(`Error http get autions: ${err.message}`));
    }, []);

    return (
        <Form layout='vertical' initialValues={crane} onFinish={handleSubmit}>
            <Form.Item label='Nombre' name='grua' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre' />
            </Form.Item>

            <Form.Item label='Subasta (Opcional)' name='id_subasta'>
                <Select
                    allowClear
                    className='w-100'
                    placeholder='Seleccione una opción'
                    options={autions.filter(item => item.estado).map(item => ({ value: item.id_subasta, label: item.subasta }))}
                />
            </Form.Item>
            <Form.Item label='Costo' name='costo' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <InputNumber
                    className='w-100'
                    addonBefore={
                        <Form.Item name='moneda' style={{ margin: 0, padding: 0, width: 80 }}>
                            <Select
                                className='w-100'
                                options={Object.keys(Moneda).map(key => ({ value: key, label: Moneda[key as keyof typeof Moneda] }))}
                            />
                        </Form.Item>
                    }
                    min={0}
                    placeholder='Ingrese un costo'
                />
            </Form.Item>
            <Form.Item name='estado' label='Estado' valuePropName='checked'>
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

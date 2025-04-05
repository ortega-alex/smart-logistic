import { Icon } from '@/components';
import { Appointment, AppointmentStatus, AppointmentView as AppointmentViewInterface, Customer } from '@/interfaces';
import { httpAppointmentAdd, httpAppointmentUpdate } from '@/services';
import { Button, DatePicker, Form, FormInstance, FormProps, Input, message, Select } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

type Props = {
    appointment: AppointmentViewInterface;
    appointementsStatus: Array<AppointmentStatus>;
    customers: Array<Customer>;
    user_id: number;
    onClose: (appointment: Appointment) => void;
};

export const AppointmentView: React.FC<Props> = ({ appointment, appointementsStatus, customers, user_id, onClose }) => {
    const formRef = useRef<FormInstance<Appointment>>(null);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEdit = (appintment: Appointment) => {
        const values = {
            ...appintment,
            status_id: appintment.status?.id,
            customer_id: appintment.customer?.id,
            date: dayjs(appintment.date)
        };
        setEdit(true);
        formRef.current?.setFieldsValue(values);
    };

    const handleCancel = () => {
        setEdit(false);
        formRef.current?.resetFields();
    };

    const handleSubmit: FormProps<Appointment>['onFinish'] = async values => {
        try {
            setLoading(true);
            const data = {
                ...values,
                user_id,
                date: dayjs(values.date).format('YYYY-MM-DD HH:mm:ss')
            };
            let res;
            if (edit) res = await httpAppointmentUpdate(data);
            else res = await httpAppointmentAdd(data);

            message[res.success ? 'success' : 'warning'](res.message);
            if (res.success) {
                const status = appointementsStatus.find(item => item.id === data.status_id);
                const customer = customers.find(item => item.id === data.customer_id);
                const newAppointment = {
                    ...data,
                    id: edit ? values.id : res.id,
                    status,
                    customer
                };
                onClose(newAppointment);
                handleCancel();
            }
        } catch (error) {
            message.error(`Error http add or edit appointment: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-md-column gap-3 justify-between'>
            <div className='flex-1 '>
                <Form
                    layout='vertical'
                    ref={formRef}
                    onFinish={handleSubmit}
                    initialValues={{
                        status_id: appointementsStatus[0]?.id,
                        date: appointment.current
                    }}
                >
                    <Form.Item name='id' hidden>
                        {' '}
                        <Input />{' '}
                    </Form.Item>

                    <Form.Item label='Fecha' name='date' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <DatePicker className='w-100' showTime />
                    </Form.Item>

                    <Form.Item label='Estatus' name='status_id' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Select
                            placeholder='Seleccione un estatus'
                            options={appointementsStatus.map(item => ({ label: item.name, value: item.id }))}
                        />
                    </Form.Item>

                    <Form.Item label='Ciente' name='customer_id' tooltip='Opcional'>
                        <Select
                            allowClear
                            placeholder='Seleccione un estatus'
                            options={customers.filter(item => item.is_active).map(item => ({ label: item.name, value: item.id }))}
                        />
                    </Form.Item>

                    <Form.Item label='Titulo' name='title' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Input placeholder='Ingrese un titulo' max={45} />
                    </Form.Item>
                    <Form.Item label='Descripcion' name='description' rules={[{ required: true, message: 'El campo es requerido' }]}>
                        <Input.TextArea placeholder='Ingrese un texto' autoSize={{ minRows: 3, maxRows: 6 }} />
                    </Form.Item>
                    <div className='flex justify-end gap-3'>
                        {edit && (
                            <Button type='primary' htmlType='button' danger ghost onClick={handleCancel} disabled={loading}>
                                Cancelar
                            </Button>
                        )}
                        <Button type='primary' htmlType='submit' disabled={loading} loading={loading}>
                            {edit ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </div>
                </Form>
            </div>
            <div className='flex flex-column gap-3 flex-1'>
                {appointment.selected.length === 0 && <div className='w-100 mt-5 text-center text-linggray'>No hay citas programadas</div>}
                {appointment.selected.map(item => (
                    <div key={item.id} className='appointment-content' onClick={() => handleEdit(item)}>
                        <div className='appointment-time'>
                            <span>
                                <Icon.Clock /> {dayjs(item.date).format('HH:mm')}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <h4>{item.title}</h4>
                            <Icon.Edit />
                        </div>
                        {item.customer?.name && <strong className='text-gray'>Ciente: {item.customer.name}</strong>}
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

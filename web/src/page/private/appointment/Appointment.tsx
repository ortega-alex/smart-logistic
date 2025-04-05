import { Icon } from '@/components';
import {
    Appointment as AppointmentInterface,
    AppointmentStatus,
    AppointmentView as AppointmentViewInterface,
    Customer
} from '@/interfaces';
import { RootState } from '@/redux';
import { httpGetAppointmentByDateAndUserId, httpGetAppointmentStatus, httpGetCustomer } from '@/services';
import { Badge, Button, Calendar, CalendarProps, message, Modal, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppointmentView } from './AppointmentView';

export const Appointment = () => {
    const sessionState = useSelector((store: RootState) => store.session);
    const deviceState = useSelector((store: RootState) => store.device);

    const [appointment, setAppointment] = useState<AppointmentViewInterface>({
        modal: false,
        selected: [],
        current: dayjs()
    });
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const loadedRanges = useRef<string[]>([]);
    const [visibleDate, setVisibleDate] = useState<Dayjs>(dayjs());
    const [appointementsStatus, setAppointementsStatus] = useState<Array<AppointmentStatus>>([]);
    const [customers, setCustomers] = useState<Array<Customer>>([]);

    const handlePanelChange: CalendarProps<Dayjs>['onPanelChange'] = newDate => {
        setVisibleDate(newDate);
    };

    const handleOnClose = (appointment: AppointmentInterface) => {
        const current = dayjs(appointment.date);
        const _appointments = [...appointments];
        const newAppointments = [..._appointments.filter(item => item.id !== appointment.id), appointment];
        const selected = newAppointments.filter(a => dayjs(a.date).isSame(current, 'day'));
        setAppointments(newAppointments);
        setVisibleDate(current);
        setAppointment({
            modal: true,
            selected,
            current
        });
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = current => {
        const dayAppointments = appointments.filter(a => dayjs(a.date).isSame(current, 'day'));
        return (
            <div
                className='container-calendar'
                onClick={() =>
                    setAppointment({
                        modal: true,
                        selected: dayAppointments,
                        current: current
                    })
                }
            >
                {deviceState ? (
                    <div className='flex h-100 w-100 justify-center items-center'>
                        <Badge count={dayAppointments.length} />
                    </div>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {dayAppointments.map(item => (
                            <li key={item.id}>
                                <Badge color={item.status?.color} text={`${item.title} - ${dayjs(item.date).format('HH:mm').toString()}`} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    const loadAppointmentsForRange = async (date: Dayjs) => {
        try {
            const start = date.startOf('month').startOf('week').format('YYYY-MM-DD HH:mm');
            const end = date.endOf('month').endOf('week').format('YYYY-MM-DD HH:mm:ss');
            const key = `${start}_${end}`;
            // chache
            if (loadedRanges.current.includes(key)) return;
            const res = await httpGetAppointmentByDateAndUserId(start, end, sessionState.session_id);
            // lo que no este cachado lo agrega al listado
            setAppointments(prev => {
                const merged = [...prev, ...res];
                const uniqueMap = new Map<string, AppointmentInterface>();
                merged.forEach(item => uniqueMap.set(item.id, item));
                return Array.from(uniqueMap.values());
            });
            // guarda la referencia
            loadedRanges.current.push(key);
        } catch (error) {
            message.error(`Error http get appointments: ${(error as Error).message}`);
        }
    };

    useEffect(() => {
        httpGetAppointmentStatus()
            .then(res => setAppointementsStatus(res))
            .catch(err => message.error(`Error http get appointments: ${(err as Error).message}`));
        httpGetCustomer()
            .then(res => setCustomers(res))
            .catch(err => message.error(`Error http get customers: ${(err as Error).message}`));
    }, []);

    useEffect(() => {
        loadAppointmentsForRange(visibleDate);
    }, [visibleDate]);

    return (
        <div className='h-100 flex flex-column p-auto'>
            <Calendar
                value={visibleDate}
                onPanelChange={handlePanelChange}
                cellRender={cellRender}
                headerRender={({ value: current, onChange }) => {
                    const currentMonth = current.month();
                    const currentYear = current.year();

                    const changeMonth = (offset: number) => {
                        const newValue = current.add(offset, 'month');
                        onChange(newValue);
                    };

                    return (
                        <div className='flex justify-around items-center py-2'>
                            <Button icon={<Icon.ArrowLef />} onClick={() => changeMonth(-1)} />

                            <div className='flex gap-1'>
                                <Select
                                    value={currentMonth}
                                    onChange={month => onChange(current.month(month))}
                                    style={{ width: 120, marginRight: 8 }}
                                >
                                    {dayjs.months().map((month, i) => (
                                        <Select.Option key={i} value={i}>
                                            {month}
                                        </Select.Option>
                                    ))}
                                </Select>

                                <Select value={currentYear} onChange={year => onChange(current.year(year))} style={{ width: 100 }}>
                                    {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
                                        <Select.Option key={year} value={year}>
                                            {year}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Button onClick={() => onChange(dayjs())} disabled={current.isSame(dayjs(), 'month')}>
                                    Hoy
                                </Button>
                            </div>
                            <Button icon={<Icon.ArrowRight />} onClick={() => changeMonth(1)} />
                        </div>
                    );
                }}
            />

            <Modal
                title={<h3>Citas del día {appointment.current.format('DD/MM/YYYY')}</h3>}
                open={appointment.modal}
                onCancel={() =>
                    setAppointment({
                        ...appointment,
                        modal: false,
                        selected: []
                    })
                }
                centered
                footer={null}
                width={1000}
            >
                <AppointmentView
                    {...{ appointment, appointementsStatus, customers, user_id: sessionState.session_id }}
                    onClose={handleOnClose}
                />
            </Modal>
        </div>
    );
};

import { Appointment } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/appointment';

export const httpGetAppointmentByDateAndUserId = async (start_date: string, end_date: string, user_id: number) =>
    await httpRequest({
        path: `${path}/date`,
        method: 'POST',
        data: {
            start_date,
            end_date,
            user_id
        }
    });

export const httpGetAppointmentStatus = async () =>
    await httpRequest({
        path: `${path}/status`,
        method: 'GET'
    });

export const httpAppointmentAdd = async (data: Appointment) =>
    await httpRequest({
        path,
        method: 'POST',
        data
    });

export const httpAppointmentUpdate = async (data: Appointment) =>
    await httpRequest({
        path: `${path}/${data.id}`,
        method: 'PUT',
        data
    });

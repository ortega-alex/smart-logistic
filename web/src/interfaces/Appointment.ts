import { Dayjs } from 'dayjs';
import { Customer } from './Customer';
import { User } from './User';

export interface AppointmentStatus {
    id: string;
    name: string;
    color: string;
    is_active: boolean;
}

export interface Appointment {
    id?: string;
    title: string;
    description: string;
    is_active?: boolean;
    status_id?: string;
    customer_id?: number;
    user_id?: number;
    date: Date | string | Dayjs;
    user?: User;
    status?: AppointmentStatus;
    customer?: Customer;
}

export interface AppointmentView {
    modal: boolean;
    selected: Appointment[];
    current: Dayjs;
}

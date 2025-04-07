import { Customer } from '../../customer/entity/Customer';
import { User } from '../../user/entity/User';
import { AppointmentStatus } from '../entity/AppointmentStatus';

export interface Appointment {
    title: string;
    description: string;
    date: Date;
    is_active?: boolean;
    status: AppointmentStatus;
    user: User;
    customer: Customer | null;
}

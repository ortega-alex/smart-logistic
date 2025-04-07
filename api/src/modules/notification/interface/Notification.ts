import { Customer } from '../../customer/entity/Customer';
import { User } from '../../user/entity/User';

export enum NotificationPriority {
    LOW = '#096dd9',
    MEDIUM = '#FA541C',
    HIGH = '#F5222D'
}

export interface Notification {
    title: string;
    description: string;
    path?: string;
    priority: NotificationPriority;
    seen?: boolean;
    is_active?: boolean;
    customer_id?: number;
    user_id?: number;
    customer?: Customer | null;
    user?: User | null;
}

export type NotificationOptional = Partial<Notification>;

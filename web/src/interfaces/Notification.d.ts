import { Customer } from './Customer';
import { User } from './User';

export enum NotificationPriority {
    LOW = '#096dd9',
    MEDIUM = '#FA541C',
    HIGH = '#F5222D'
}

export interface Notification {
    id: string;
    title: string;
    description: string;
    path?: string;
    priority: NotificationPriority;
    seen: boolean;
    is_active: boolean;
    created_at: string;
    customer?: Customer;
    user?: User;
}

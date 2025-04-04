import { Customer } from '../../customer/entity/Customer';
import { User } from '../../user/entity/User';
import { OrderPaperStatus } from '../entity/OrderPaperStatus';

export interface OrderPaper {
    title: string;
    description: string;
    date: Date;
    is_active?: boolean;
    status: OrderPaperStatus;
    user: User;
    customer?: Customer;
}

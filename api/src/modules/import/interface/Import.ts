import { Customer } from '../../customer/entity/Customer';
import { User } from '../../user/entity/User';
import { Vehicle } from '../../vehicle/entity/Vehicle';
import { ImportState } from '../entity/ImportState';

export interface ImportHistory {
    id?: number;
    description: string;
    path: string;
    is_visible_customer: boolean;
    vehicle: Vehicle;
    importState: ImportState;
    user?: User;
    customer?: Customer;
}

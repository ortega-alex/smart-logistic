import { Vehicle } from '@/page/private/vehicle/Vehicle';
import { Quoter } from './Quoter';

export interface ImportState {
    id: number;
    name: string;
    index: number;
    color: string;
    is_active: boolean;
}

export interface ImportHistory {
    id?: string;
    description: string;
    path: string | Array<any>;
    is_visible_customer: boolean;
    vehicle_id?: number;
    import_state_id?: number;
    user_id?: number;
    customer_id?: number;
    created_at?: string;
}

export interface VehicleType {
    id: number;
    name: string;
    is_active: boolean;
}

export interface Vehicle {
    id: number;
    is_active: boolean;
    created_at?: string;
    quoter: Quoter;
    importState: ImportState;
    record?: ImportHistory[];
}

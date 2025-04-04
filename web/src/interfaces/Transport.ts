import { CustomerType } from './Customer';
import { Headquarter } from './Headquarter';
import { User } from './User';
import { VehicleType } from './Vehicle';

export interface TransportType {
    id: number;
    name: string;
    is_active: boolean;
}

export interface TransportRate {
    id: string;
    rate: number;
    is_active: boolean;
    user_id?: number;
    vehicle_type_id?: number;
    transport_type_id?: number;
    headquarter_id?: number;
    customer_type_id?: number;
    user?: User;
    vehicleType?: VehicleType;
    transportType?: TransportType;
    headquarter?: Headquarter;
    customerType?: CustomerType;
}

export interface TransportRateFilter {
    customer_type_id: number;
    transport_type_id: number;
    vehicle_type_id: number;
    headquarter_id: number;
}

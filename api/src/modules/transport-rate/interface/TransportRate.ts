import { CustomerType } from '../../customer-type/entity/CustomerType';
import { Headquarter } from '../../headquarter/entity/Headquarter';
import { TransportType } from '../../transport-type/entity/TransportType';
import { User } from '../../user/entity/User';
import { VehicleType } from '../../vehicle-type/entity/VehicleType';

export interface TransportRate {
    id?: string;
    rate: number;
    is_active?: boolean;
    user: User;
    vehicleType: VehicleType;
    transportType: TransportType;
    headquarter: Headquarter;
    customerType: CustomerType;
}

export type OptionalTransportRate = Partial<TransportRate>;

export interface FilterIds {
    vehicle_type_id: number;
    transport_type_id: number;
    headquarter_id: number;
    customer_type_id: number;
}

export interface TransportRateFilter {
    customer_type_id: number;
    transport_type_id: number;
    vehicle_type_id: number;
    headquarter_id: number;
}

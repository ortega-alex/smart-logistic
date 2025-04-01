import { CustomerType } from '../../customer-type/entity/CustomerType';
import { Sede } from '../../sede/entity/Sede';
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
    sede: Sede;
    customerType: CustomerType;
}

export type OptionalTransportRate = Partial<TransportRate>;

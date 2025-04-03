import { Customer } from './Customer';
import { Auction, Headquarter } from './Headquarter';
import { TransportType } from './Transport';
import { User } from './User';
import { VehicleType } from './Vehicle';

export enum Coin {
    USD = '$',
    GTQ = 'Q'
}

export type CoinKey = keyof typeof Coin;
export type CoinValue = (typeof Coin)[CoinKey];

export interface DetailsCoin {
    [key: string]: Array<QuoterDetail>;
}

export interface QuoterDetail {
    id: string;
    name: string;
    value: number;
    coin: Coin;
    quoter?: Quoter;
}

export interface Quoter {
    id: number;
    mark: string;
    model: string;
    year: string;
    lot: string;
    vin: string;
    description?: string;
    is_aproverd: boolean;
    is_active: boolean;
    customer_id?: number;
    transport_type_id?: number;
    vehicle_type_id?: number;
    headquarter_id?: number;
    created_at?: Date;
    customer?: Customer;
    createdBy?: User;
    seller?: User;
    vehicleType?: VehicleType;
    transportType?: TransportType;
    issuingHeadquarter?: Headquarter;
    headquarter?: Headquarter;
    auction?: Auction;
    details?: Array<QuoterDetail>;
}

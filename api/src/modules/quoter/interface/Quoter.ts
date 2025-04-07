import { Auction } from '../../auction/entity/Auction';
import { Customer } from '../../customer/entity/Customer';
import { Headquarter } from '../../headquarter/entity/Headquarter';
import { TransportType } from '../../transport-type/entity/TransportType';
import { User } from '../../user/entity/User';
import { VehicleType } from '../../vehicle-type/entity/VehicleType';
import { Quoter as QuoterEntity } from '../entity/Quoter';

export interface Quoter {
    mark: string;
    model: string;
    year: string;
    lot: string;
    vin: string;
    description?: string;
    is_aproverd?: boolean;
    is_active?: boolean;
    customer: Customer;
    createdBy: User;
    seller: User;
    vehicleType: VehicleType;
    transportType: TransportType;
    issuingHeadquarter: Headquarter;
    headquarter: Headquarter;
    auction?: Auction;
}

export type OptionalQuoter = Partial<Quoter>;

export interface QuoterDetail {
    id?: string;
    name: string;
    value: number;
    coin: Coin;
    quoter: QuoterEntity;
}

export enum Coin {
    USD = '$',
    GTQ = 'Q'
}

import { ImportState } from '../../import/entity/ImportState';
import { Quoter } from '../../quoter/entity/Quoter';

export interface Vehicle {
    is_active?: boolean;
    quoter: Quoter;
    importState: ImportState;
}

export type OptionalVehicle = Partial<Vehicle>;

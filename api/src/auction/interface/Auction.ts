import { Sede } from '../../sede/entity/Sede';
import { State } from '../../state/entity/State';

export interface Auction {
    id?: number;
    name: string;
    crane_rate: number;
    is_active?: boolean;
    state: State;
    sede: Sede;
}

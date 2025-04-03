import { Headquarter } from '../../headquarter/entity/Headquarter';
import { State } from '../../state/entity/State';

export interface Auction {
    id?: number;
    name: string;
    crane_rate: number;
    is_active?: boolean;
    state: State;
    headquarter: Headquarter;
}

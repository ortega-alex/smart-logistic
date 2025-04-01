import { Sede } from './entity/Sede';

export const getById = async (id: number) => await Sede.findOneBy({ id });

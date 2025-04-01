import { State } from './entity/State';

export const getAll = async () => await State.find();

export const getById = async (id: number) => await State.findOneBy({ id });

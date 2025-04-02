import { Municipality } from './entity/Municipality';

export const getAll = async () => await Municipality.find();

import { Permission } from './entity/Permission';

export const getAll = async () => await Permission.find();

export const getById = async (id: number) => await Permission.findOneBy({ id });

export default {
    getAll,
    getById
};

import { Department } from './entity/Department';

export const getAll = async () => await Department.find();
export const getById = async (id: number) => await Department.findOneBy({ id });

export default {
    getAll,
    getById
};

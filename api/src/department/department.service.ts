import { Department } from './entity/Department';

export const getAll = async () => await Department.find();

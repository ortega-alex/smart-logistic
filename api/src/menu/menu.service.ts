import { Menu } from './entity/Menu';

export const getAll = async () => await Menu.find({ order: { name: 'ASC' } });

export const getById = async (id: number) => await Menu.findOneBy({ id });

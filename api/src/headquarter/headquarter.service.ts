import { IsNull, Not } from 'typeorm';
import { Headquarter } from './entity/Headquarter';
import { HeadquarterFilter, Headquarter as HeadquarterInterface } from './interface/Headquarter';

export const getAll = async (filter?: HeadquarterFilter | string) => {
    let where = {};
    if (filter && filter == HeadquarterFilter.EEUU) where = { department: IsNull(), state: Not(IsNull()) };
    else if (filter && filter == HeadquarterFilter.GT) where = { department: Not(IsNull()), state: IsNull() };
    return await Headquarter.find({ where, relations: { state: true, department: true } });
};

export const getById = async (id: number) => await Headquarter.findOne({ where: { id }, relations: { state: true, department: true } });

export const add = async (headquarter: HeadquarterInterface) => {
    const newHeadquarter = new Headquarter();
    newHeadquarter.name = headquarter.name;
    newHeadquarter.is_active = headquarter.is_active ?? true;
    if (headquarter.state) newHeadquarter.state = headquarter.state;
    if (headquarter.department) newHeadquarter.department = headquarter.department;
    await newHeadquarter.save();
    return newHeadquarter;
};

export const update = async (id: number, headquarter: HeadquarterInterface) => await Headquarter.update({ id }, headquarter);

export default {
    getAll,
    getById,
    add,
    update
};

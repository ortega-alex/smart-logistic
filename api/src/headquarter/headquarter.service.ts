import { IsNull, Not } from 'typeorm';
import { Headquarter } from './entity/Headquarter';
import { HeadquarterFilter } from './interface/Headquarter';

export const getAll = async (filter?: HeadquarterFilter | string) => {
    let where = {};
    if (filter && filter == HeadquarterFilter.EEUU) where = { municipality: IsNull(), state: Not(IsNull()) };
    else if (filter && filter == HeadquarterFilter.GT) where = { municipality: Not(IsNull()), state: IsNull() };
    return await Headquarter.find({ where, relations: { state: true, municipality: true } });
};

export const getById = async (id: number) => await Headquarter.findOneBy({ id });

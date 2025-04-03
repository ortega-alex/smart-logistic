import { HeadquarterFilter } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/headquarter';

export const httpGetAllHeadquarter = async (filter?: HeadquarterFilter) =>
    await httpRequest({
        path: filter ? `${path}/${filter}` : path,
        method: 'GET'
    });

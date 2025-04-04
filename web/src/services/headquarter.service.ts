import { Headquarter, HeadquarterFilter } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/headquarter';

export const httpGetAllHeadquarter = async (filter?: HeadquarterFilter) =>
    await httpRequest({
        path: filter ? `${path}/${filter}` : path,
        method: 'GET'
    });

export const httpAddHeadquarter = async (headquarter: Headquarter) =>
    await httpRequest({
        path,
        method: 'POST',
        data: headquarter
    });

export const httpUpdateHeadquarter = async (headquarter: Headquarter) =>
    await httpRequest({
        path: `${path}/${headquarter.id}`,
        method: 'PUT',
        data: headquarter
    });

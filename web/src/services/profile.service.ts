import { Profile } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/profile';

export const httpGetProfiles = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpAddProfiles = async (data: Profile) =>
    await httpRequest({
        path,
        method: 'POST',
        data
    });

export const httpUpdateProfiles = async (data: Profile) =>
    await httpRequest({
        path: `${path}/${data.id}`,
        method: 'PUT',
        data
    });

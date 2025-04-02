import { httpRequest } from '@/utilities';

const path = '/permission';

export const httpGetPermissions = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpGetPermissionsMenusByProfileId = async (id: number) =>
    await httpRequest({
        path: `${path}/profile/${id}`,
        method: 'GET'
    });

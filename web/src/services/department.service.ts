import { httpRequest } from '@/utilities';

const path = '/department';

export const httpGetAllDepartments = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

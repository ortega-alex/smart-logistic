import { httpRequest } from '@/utilities';

const path = '/import-history';
export const httpAddImportHistory = async (id: number, data: any) =>
    await httpRequest({
        path: `${path}/${id}`,
        method: 'POST',
        data,
        type: 'multipart'
    });

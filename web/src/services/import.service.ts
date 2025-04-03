import { ImportHistory } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/import';

export const httpGetImportState = async () => await httpRequest({ path: `${path}/get-state`, method: 'GET' });

export const httpAddImportHistory = async (id: number, data: ImportHistory) =>
    await httpRequest({
        path: `${path}/history/${id}`,
        method: 'POST',
        data,
        type: 'multipart'
    });

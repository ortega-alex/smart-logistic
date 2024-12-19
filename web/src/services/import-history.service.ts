import { httpRequest } from '@/utilities';

const path = '/import-history';

export const httpImportHistoryUploadInvoice = async (id: number, data: any) =>
    await httpRequest({
        path: `${path}/${id}`,
        method: 'POST',
        data,
        type: 'multipart'
    });

export const httpImportHistoryEvidence = async (id: number, data: any) =>
    await httpRequest({
        path: `${path}/evidence/${id}`,
        method: 'POST',
        data,
        type: 'multipart'
    });

import { CustomerFile } from '@/models';
import { httpRequest } from '@/utilities';

const path = '/import-history';

export const httpImportHistoryUploadInvoice = async (id: number, file: CustomerFile) =>
    await httpRequest({
        path: `${path}/${id}`,
        method: 'POST',
        data: {
            file
        },
        type: 'multipart'
    });

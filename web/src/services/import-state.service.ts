import { httpRequest } from '@/utilities';

const path = '/import-state';

export const httpGetImportState = async () => await httpRequest({ path, method: 'GET' });

import { httpRequest } from '@/utilities';
const path = '/menu';

export const httpGetMenus = async () => await httpRequest({ path, method: 'GET' });

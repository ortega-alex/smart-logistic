import { Login } from '@/models';
import { httpRequest } from '@/utilities';

export const httpLogin = async (body: Login) => await httpRequest({ path: '/login', method: 'POST', data: body });

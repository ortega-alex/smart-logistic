import { Login, User } from '@/models';
import { httpRequest } from '@/utilities';

const path = '/user';

export const httpLogin = async (body: Login) => await httpRequest({ path: '/login', method: 'POST', data: body });

export const httpGelUser = async () => await httpRequest({ path, method: 'GET' });

export const httpAddUser = async (data: User) => await httpRequest({ path, data, method: 'POST' });

export const httpEditUser = async (data: User) => await httpRequest({ path: `${path}/${data.id_usuario}`, data, method: 'PUT' });

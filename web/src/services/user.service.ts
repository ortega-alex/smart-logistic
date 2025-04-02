import { Loogin, User, UserForgotPassword } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/user';

export const httpLogin = async (body: Loogin) => await httpRequest({ path: '/login', method: 'POST', data: body });

export const httpGelUser = async () => await httpRequest({ path, method: 'GET' });

export const httpAddUser = async (data: User) => await httpRequest({ path, data, method: 'POST' });

export const httpEditUser = async (data: User) => await httpRequest({ path: `${path}/${data.id}`, data, method: 'PUT' });

export const httpForgotPassword = async (data: UserForgotPassword) => await httpRequest({ path: `/forgot-password`, data, method: 'POST' });

export const httpResetPassword = async (id: number, body: any) =>
    await httpRequest({ path: `/auth/reset/${id}`, method: 'PUT', data: body });

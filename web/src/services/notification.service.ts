import { httpRequest } from '@/utilities';

const path = '/notification';

export const httpGetNotificationByUserId = async (id: number) => await httpRequest({ path: `${path}/user/${id}`, method: 'GET' });

export const httpGetNotificationByCustomerId = async (id: number) => await httpRequest({ path: `${path}/customer/${id}`, method: 'GET' });

export const httpUpdateNotification = async (id: number) => await httpRequest({ path: `${path}/${id}`, method: 'PUT' });

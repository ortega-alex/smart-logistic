import { IsNull } from 'typeorm';
import { Notification } from './entity/Notification';
import { Notification as NotificationInterface, NotificationOptional } from './interface/Notification';

export const getAll = async (notification: NotificationOptional) =>
    await Notification.createQueryBuilder('notification')
        .leftJoinAndSelect('notification.user', 'user')
        .leftJoinAndSelect('notification.customer', 'customer')
        .where('(customer.id = :customerId OR customer.id IS NULL)', { customerId: notification.customer_id })
        .andWhere('(user.id = :userId OR user.id IS NULL)', { userId: notification.user_id })
        .orderBy('notification.created_at', 'DESC')
        .limit(50)
        .getMany();

export const getById = async (id: string) => await Notification.findOne({ where: { id }, relations: { user: true, customer: true } });

export const add = async (notification: NotificationInterface) => {
    const newNotification = new Notification();
    newNotification.title = notification.title;
    newNotification.description = notification.description;
    newNotification.path = notification.path ?? null;
    newNotification.priority = notification.priority;
    newNotification.seen = notification.seen ?? false;
    newNotification.is_active = notification.is_active ?? true;
    if (notification.customer) newNotification.customer = notification.customer;
    if (notification.user) newNotification.user = notification.user;
    await newNotification.save();
    return newNotification;
};

export const update = async (id: string, notification: NotificationOptional) => await Notification.update({ id }, notification);

export default {
    getAll,
    getById,
    add,
    update
};

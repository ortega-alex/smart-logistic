import { Between } from 'typeorm';
import { Appointment } from './entity/Appointment';
import { AppointmentStatus } from './entity/AppointmentStatus';
import { Appointment as AppointmentInterface } from './interface/Appointment';

export const getAll = async () => await Appointment.find({ relations: { status: true } });

export const getById = async (id: string) =>
    await Appointment.findOne({ where: { id }, relations: { user: true, status: true, customer: true } });

export const getByDateAndUserId = async (startDate: Date, endDate: Date, user_id: number) =>
    await Appointment.find({
        where: {
            date: Between(startDate, endDate),
            user: {
                id: user_id
            },
            is_active: true
        },
        relations: { status: true, customer: true }
    });

export const getAllStatus = async () => await AppointmentStatus.find();

export const getStatusById = async (id: string) => await AppointmentStatus.findOneBy({ id });

export const add = async (orderPaper: AppointmentInterface) => {
    const newOrderPaper = new Appointment();
    newOrderPaper.title = orderPaper.title;
    newOrderPaper.description = orderPaper.description;
    newOrderPaper.date = orderPaper.date;
    newOrderPaper.is_active = orderPaper.is_active ?? true;
    newOrderPaper.status = orderPaper.status;
    newOrderPaper.user = orderPaper.user;
    if (orderPaper.customer) newOrderPaper.customer = orderPaper.customer;
    await newOrderPaper.save();
    return newOrderPaper;
};

export const update = async (id: string, orderPaper: AppointmentInterface) => await Appointment.update({ id }, orderPaper);

export default {
    getAll,
    getById,
    getByDateAndUserId,
    getAllStatus,
    getStatusById,
    add,
    update
};

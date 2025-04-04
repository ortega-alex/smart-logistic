import { OrderPaper } from './entity/OrderPaper';
import { OrderPaperStatus } from './entity/OrderPaperStatus';
import { OrderPaper as OrderPaperInterface } from './interface/OrderPaper';

export const getAll = async () => await OrderPaper.find({ relations: { status: true } });

export const getById = async (id: number) =>
    await OrderPaper.findOne({ where: { id }, relations: { user: true, status: true, customer: true } });

export const getAllStatus = async () => await OrderPaperStatus.find();

export const getStatusById = async (id: number) => await OrderPaperStatus.findOneBy({ id });

export const add = async (orderPaper: OrderPaperInterface) => {
    const newOrderPaper = new OrderPaper();
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

export const update = async (id: number, orderPaper: OrderPaperInterface) => await OrderPaper.update({ id }, orderPaper);

export default {
    getAll,
    getById,
    getAllStatus,
    getStatusById,
    add,
    update
};

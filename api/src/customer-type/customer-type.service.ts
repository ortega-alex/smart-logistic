import { CustomerType } from '../customer-type/entity/CustomerType';
import { CustomerType as CustomerTypeInterface } from './interface/CustomerType';

export const getAll = async () => await CustomerType.find();

export const getById = async (id: number) => await CustomerType.findOneBy({ id });

export const add = async (customerType: CustomerTypeInterface) => {
    const newCustomerType = new CustomerType();
    newCustomerType.name = customerType.name;
    newCustomerType.is_active = customerType.is_active ?? true;
    await newCustomerType.save();
    return newCustomerType;
};

export const update = async (id: number, customerType: CustomerTypeInterface) =>
    await CustomerType.update({ id: Number(id) }, customerType);

export default {
    getAll,
    getById,
    add,
    update
};

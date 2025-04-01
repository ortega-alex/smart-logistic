import { CustomerType } from '../customer-type/entity/CustomerType';
import { CustomerType as CustomerTypeInterface } from './interface/CustomerType';

export const getAll = async () => await CustomerType.find();

export const getById = async (id: number) => await CustomerType.findOneBy({ id });

export const save = async (customerType: CustomerTypeInterface) => {
    const newCustomerType = new CustomerType();
    newCustomerType.name = customerType.name;
    newCustomerType.is_active = customerType.is_active ?? true;
    await newCustomerType.save();
    return newCustomerType;
};

export const update = async (id: number, customerType: CustomerTypeInterface, currentCustomerType: CustomerType) => {
    return await CustomerType.update(
        { id: Number(id) },
        {
            name: customerType.name ?? currentCustomerType.name,
            is_active: customerType.is_active ?? currentCustomerType.is_active
        }
    );
};

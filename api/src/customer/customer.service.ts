import { CustomerType } from '../customer-type/entity/CustomerType';
import { Customer } from './entity/Customer';
import { Customer as CustomerInterface } from './interface/Customer';

export const getAll = async () => await Customer.find({ relations: { type: true } });

export const getByEmail = async (email: string) => await Customer.findOne({ where: { email } });

export const getById = async (id: number) => await Customer.findOne({ where: { id }, relations: { type: true, files: true } });

export const save = async (customer: CustomerInterface) => {
    const newCustomer = new Customer();
    newCustomer.name = customer.name;
    newCustomer.phone_number = customer.phone_number;
    if (customer.landline) newCustomer.landline = customer.landline;
    newCustomer.address = customer.address;
    newCustomer.nit = customer.nit;
    newCustomer.dpi = customer.dpi;
    newCustomer.email = customer.email;
    newCustomer.type = customer.type;

    await newCustomer.save();
    return newCustomer;
};

export const update = async (id: number, customer: CustomerInterface) => await Customer.update({ id: Number(id) }, customer);

export const pagination = async (filter: string, sortField: string, sortOrder: string, current: number, pageSize: number) => {
    // Crear la consulta base
    const query = Customer.createQueryBuilder('customer').leftJoinAndSelect('customer.type', 'type');

    // Aplicar filtro si es necesario
    if (filter != '') {
        query
            .where('customer.name LIKE :filter', { filter: `%${filter}%` })
            .orWhere('customer.dpi LIKE :filter', { filter: `%${filter}%` })
            .orWhere('customer.nit LIKE :filter', { filter: `%${filter}%` })
            .orWhere('customer.phone_number LIKE :filter', { filter: `%${filter}%` })
            .orWhere('customer.email LIKE :filter', { filter: `%${filter}%` })
            .orWhere('type.name LIKE :filter', { filter: `%${filter}%` });
    }

    if (sortField.includes('type')) {
        query.orderBy(`type.name`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    } else {
        query.orderBy(`customer.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }

    // Aplicar paginación
    query.skip((current - 1) * pageSize).take(pageSize);

    // Ejecutar la consulta
    return await query.getManyAndCount();
};

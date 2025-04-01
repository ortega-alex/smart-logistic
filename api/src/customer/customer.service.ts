import { CustomerType } from '../customer-type/entity/CustomerType';
import { Customer } from './entity/Customer';
import { Customer as CustomerInterface } from './interface/Customer';

export const getAll = async () => await Customer.find({ relations: { type: true } });

export const getByEmail = async (email: string) => await Customer.findOne({ where: { email } });

export const getById = async (id: number) => await Customer.findOne({ where: { id }, relations: { type: true, files: true } });

export const save = async (customer: CustomerInterface, customerType: CustomerType) => {
    const newCustomer = new Customer();
    newCustomer.name = customer.name;
    newCustomer.phone_number = customer.phone_number;
    if (customer.landline) newCustomer.landline = customer.landline;
    newCustomer.address = customer.address;
    newCustomer.nit = customer.nit;
    newCustomer.dpi = customer.dpi;
    newCustomer.email = customer.email;
    newCustomer.type = customerType;

    await newCustomer.save();
    return newCustomer;
};

export const update = async (id: number, customer: CustomerInterface, currentCustomer: Customer, customerType: CustomerType | null) => {
    return await Customer.update(
        { id: Number(id) },
        {
            name: customer.name ?? currentCustomer.name,
            phone_number: customer.phone_number ?? currentCustomer.phone_number,
            landline: customer.landline ?? currentCustomer.landline,
            address: customer.address ?? currentCustomer.address,
            nit: customer.nit ?? currentCustomer.nit,
            dpi: customer.dpi ?? currentCustomer.dpi,
            email: customer.email ?? currentCustomer.email,
            type: customerType || currentCustomer.type,
            token_fcm: customer.token_fcm ?? currentCustomer.token_fcm
        }
    );
};

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
        query.orderBy(`type.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    } else {
        query.orderBy(`customer.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }

    // Aplicar paginación
    query.skip((current - 1) * pageSize).take(pageSize);

    // Ejecutar la consulta
    return await query.getManyAndCount();
};

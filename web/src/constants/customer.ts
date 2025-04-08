import { Customer, CustomerFile, CustomerType } from '@/interfaces';

export const EmptyCustomerType: CustomerType = {
    id: 0,
    name: '',
    is_active: true
};

export const EmptyCustomerFile: CustomerFile = {
    id: '',
    name: '',
    path: '',
    is_active: true
};

export const EmptyCustomer: Customer = {
    id: 0,
    name: '',
    phone_number: '',
    landline: '',
    address: '',
    nit: '',
    dpi: '',
    email: '',
    is_active: true
};

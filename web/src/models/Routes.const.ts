import { ObjectCustomer } from './Utilityes';

export const privateRoutes: ObjectCustomer = {
    PRIVATE: 'private',
    HOME: 'home',
    VEHICLES: 'vehicles',
    QUOTER: 'quoter',
    CUSTOMERS: 'customers',
    USERS: 'users',
    CRANES: 'cranes',
    PORTS: 'ports',
    TYPES_OF_VEHICLES: 'type-of-vehicles',
    PROFILES: 'profiles',
    REPORTS: 'reports',
    ACUTION: 'aution',
    TYPES_OF_CUSTOMERS: 'types-of-customers',
    PRIVATE_CUSTOMER: 'private-customer',
    CUSTOMER_ORDER: 'customer-order',
    CUSTOMER_ORDER_DETAIL: 'customer-order-detail'
} as const;

export const publicRoutes = {
    SING_IN: 'sing-in',
    SING_IN_CUSTOMER: 'sing-in-customer',
    INVOUCE: 'validation'
} as const;

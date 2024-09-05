import { ObjectCustomer } from './Utilityes';

export const privateRoutes: ObjectCustomer = {
    PRIVATE: 'privado',
    HOME: 'home',
    VEHICLES: 'vehicles',
    QUOTER: 'quoter',
    CUSTOMERS: 'customers',
    USERS: 'users',
    CRANES: 'cranes',
    PORTS: 'ports',
    TYPES_OF_VEHICLES: 'type-of-vehicles',
    PROFILES: 'profiles',
    REPORTS: 'reports'
} as const;

export const publicRoutes = {
    SING_IN: 'sing-in'
} as const;

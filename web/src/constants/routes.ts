export const privateRoutes = {
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
    CUSTOMER_TYPE: 'customer-type',
    PRIVATE_CUSTOMER: 'private-customer',
    CUSTOMER_ORDER: 'customer-order',
    CUSTOMER_ORDER_DETAIL: 'customer-order-detail'
} as const;

export const publicRoutes = {
    SING_IN: 'sing-in',
    SING_IN_CUSTOMER: 'sing-in-customer',
    INVOUCE: 'validation',
    FORGOT_PASS: 'forgot-password'
} as const;

export type PrivateRouteKeys = keyof typeof privateRoutes;
export type PublicRouteKeys = keyof typeof publicRoutes;

export type PrivateRouteValue = (typeof privateRoutes)[PrivateRouteKeys];
export type PublicRouteValue = (typeof publicRoutes)[PublicRouteKeys];

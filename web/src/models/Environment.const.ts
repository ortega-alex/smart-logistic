const version = process.env.VERSION_API ?? 'v1';
const port = process.env.REACT_APP_NODE_PORT || '4000';
const host = process.env.REACT_APP_NODE_HOST || 'localhost';
let domain;

if (process.env.NODE_ENV === 'development') domain = `//${host}:${port}/`;
else {
    const url = window.location.href;
    domain = url.split('#')[0];
}

export const _SERVER = {
    baseUrl: domain,
    apiUrl: `${domain}api/${version}`
} as const;

export const _KEYS = {
    SESSION: process.env.SESSION || 'ddc8af48-6a5d-11ef-80f9-0242ac130002',
    SESSION_CUSTOMER: process.env.SESSION_CUSTOMER || '1c238ba4-a764-11ef-b097-0242ac130002',
    SECRET: process.env.SECRET || 'e1f86c0b-6a5d-11ef-80f9-0242ac130002',
    IV: process.env.IV || 'f1873205-6a5d-11ef-80f9-0242ac130002',
    TOKEN: process.env.IV || '6f5b5c3a-6a61-11ef-80f9-0242ac130002',
    FIREBASE_TOKEN: import.meta.env.VITE_FIREBASE_TOKEN || '6f5b5c3a-6a61-11ef-80f9-0242ac130002'
} as const;

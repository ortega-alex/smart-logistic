let domain;

const {
    VERSION_API = 'v1',
    REACT_APP_NODE_PORT = '4000',
    REACT_APP_NODE_HOST = 'localhost',
    NODE_ENV = 'development',
    SESSION = 'ddc8af48-6a5d-11ef-80f9-0242ac130002',
    SESSION_CUSTOMER = '1c238ba4-a764-11ef-b097-0242ac130002',
    SECRET = 'e1f86c0b-6a5d-11ef-80f9-0242ac130002',
    IV = 'f1873205-6a5d-11ef-80f9-0242ac130002',
    TOKEN = '6f5b5c3a-6a61-11ef-80f9-0242ac130002'
} = process.env;
const { VITE_FIREBASE_TOKEN = '6f5b5c3a-6a61-11ef-80f9-0242ac130002' } = import.meta.env;

if (NODE_ENV === 'development') domain = `//${REACT_APP_NODE_HOST}:${REACT_APP_NODE_PORT}/`;
else {
    const url = window.location.href;
    domain = url.split('#')[0];
}

export const _SERVER = {
    baseUrl: domain,
    apiUrl: `${domain}api/${VERSION_API}`,
    NODE_ENV
} as const;

export const _KEYS = {
    SESSION,
    SESSION_CUSTOMER,
    SECRET,
    IV,
    TOKEN,
    FIREBASE_TOKEN: VITE_FIREBASE_TOKEN
} as const;

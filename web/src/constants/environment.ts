const {
    VERSION_API = 'v1',
    NODE_ENV = 'development',
    SESSION = 'ddc8af48-6a5d-11ef-80f9-0242ac130002',
    SESSION_CUSTOMER = '1c238ba4-a764-11ef-b097-0242ac130002',
    SECRET = 'e1f86c0b-6a5d-11ef-80f9-0242ac130002',
    IV = 'f1873205-6a5d-11ef-80f9-0242ac130002',
    TOKEN = '6f5b5c3a-6a61-11ef-80f9-0242ac130002'
} = process.env;
const {
    VITE_FIREBASE_TOKEN = '6f5b5c3a-6a61-11ef-80f9-0242ac130002',
    VITE_API_URL = '//localhost:4000/api',
    VITE_SOCKET_URL = ''
} = import.meta.env;

export const _SERVER = {
    socketUrl: VITE_SOCKET_URL,
    baseUrl: VITE_API_URL.replace('/api', ''),
    apiUrl: `${VITE_API_URL}/${VERSION_API}`,
    NODE_ENV
} as const;

console.log(_SERVER);

export const _KEYS = {
    SESSION,
    SESSION_CUSTOMER,
    SECRET,
    IV,
    TOKEN,
    FIREBASE_TOKEN: VITE_FIREBASE_TOKEN
} as const;

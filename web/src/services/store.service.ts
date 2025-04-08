import { decryptData, encryptData } from '../utilities';

export const saveStorage = (key: string, value: string | object) => {
    const encrypt = encryptData(value);
    window.sessionStorage.setItem(key, encrypt);
};

export const getStorage = (key: string) => {
    const storage = window.sessionStorage.getItem(key);
    return storage ? decryptData(storage) : null;
};

export const removeStorage = (key: string) => {
    window.sessionStorage.removeItem(key);
};

export const clearStorage = () => window.sessionStorage.clear();

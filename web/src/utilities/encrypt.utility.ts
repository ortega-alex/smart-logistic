import { _KEYS } from '@/models';
import * as CryptoJS from 'crypto-js';

const _KEY = CryptoJS.enc.Hex.parse(_KEYS.SECRET.replace(/-/g, ''));
const _IV = CryptoJS.enc.Hex.parse(_KEYS.IV.replace(/-/g, ''));

export const encryptData = (data: object | string) => CryptoJS.AES.encrypt(JSON.stringify(data), _KEY, { iv: _IV }).toString();

export const decryptData = (data: string) => {
    const bytes = CryptoJS.AES.decrypt(data.toString(), _KEY, { iv: _IV });
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

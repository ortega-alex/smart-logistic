import crypto from 'crypto-js';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { enviroment } from '../utils';

const key = crypto.enc.Hex.parse(String(enviroment.SECRET).replace(/-/g, ''));

const encryptData = (data: object | string): { iv: string; content: string } => {
    const iv = String(uuidv4()).replace(/-/g, '');
    const _IV = crypto.enc.Hex.parse(iv);
    const content = crypto.AES.encrypt(JSON.stringify(data), key, { iv: _IV }).toString();
    return { iv, content };
};

const decryptData = (data: { iv: string; content: string }) => {
    const _IV = crypto.enc.Hex.parse(data.iv);
    const bytes = crypto.AES.decrypt(data.content, key, { iv: _IV });
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
};

export const encrypt = (_req: Request, res: Response, nex: NextFunction) => {
    const originalSend = res.json;

    res.json = function (body) {
        if (enviroment.NODE_ENV !== 'development') {
            const encrypResponse = encryptData(body);
            return originalSend.call(this, encrypResponse);
        }
        return originalSend.call(this, body);
    };
    nex();
};

export const decrypt = (req: Request, _res: Response, nex: NextFunction) => {
    const { iv } = req.body;
    if (iv) {
        const decrypt = decryptData(req.body);
        req.body = { ...decrypt, iv };
    }
    nex();
};

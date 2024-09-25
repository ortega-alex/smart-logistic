import crypto from 'crypto-js';
import { Request } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { enviroment } from '../utils';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const ImageStorage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: DestinationCallback): void => {
        try {
            let ruta = path.join(__dirname, `../public/`);
            if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
            ruta = path.join(ruta, `${enviroment.URI_IMAGES}/`);
            if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
            cb(null, ruta);
        } catch (error) {
            return cb(new Error('Ha ocurrido un error interno al momento de cargar la imagen' + error), '');
        }
    },
    filename: (_res: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
        const uuid = String(crypto.lib.WordArray.random(16));
        const name = uuid + path.extname(file.originalname);
        cb(null, name);
    }
});

export const fileStorage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: DestinationCallback): void => {
        try {
            let ruta = path.join(__dirname, `../public/`);
            if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
            ruta = path.join(ruta, `${enviroment.URI_FILE}/`);
            if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
            cb(null, ruta);
        } catch (error) {
            return cb(new Error('Ha ocurrido un error interno al momento de cargar la imagen' + error), '');
        }
    },
    filename: (_res: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
        const uuid = String(crypto.lib.WordArray.random(16));
        const name = uuid + path.extname(file.originalname);
        cb(null, name);
    }
});

export const imageUpload = multer({
    storage: ImageStorage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (_res: Request, file: Express.Multer.File, cb): void => {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Porfavor seleccione una imagen'));
        }
        cb(null, true);
    }
});

export const fileUpload = multer({
    storage: fileStorage
});

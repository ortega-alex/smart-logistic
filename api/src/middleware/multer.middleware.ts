import crypto from 'crypto-js';
import { Request } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { enviroment } from '../utils';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const remaneFile = (originalname: string): string => {
    const uuid = String(crypto.lib.WordArray.random(16));
    return uuid + path.extname(originalname);
};

export const validatePath = (_path: string): string => {
    let ruta = path.join(__dirname, `../public/`);
    if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
    ruta = path.join(ruta, `${_path}/`);
    if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
    return ruta;
};

export const ImageStorage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: DestinationCallback): void => {
        try {
            const ruta = validatePath(enviroment.URI_IMAGES);
            cb(null, ruta);
        } catch (error) {
            return cb(new Error('Ha ocurrido un error interno al momento de cargar la imagen' + error), '');
        }
    },
    filename: (_res: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
        const name = remaneFile(file.originalname);
        cb(null, name);
    }
});

export const fileStorage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: DestinationCallback): void => {
        try {
            const ruta = validatePath(enviroment.URI_FILE);
            cb(null, ruta);
        } catch (error) {
            return cb(new Error('Ha ocurrido un error interno al momento de cargar la imagen' + error), '');
        }
    },
    filename: (_res: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
        const name = remaneFile(file.originalname);
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

export const imagesBufferUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1000000
    },
    fileFilter: (_res: Request, file: Express.Multer.File, cb): void => {
        if (!file.originalname.match(/\.(png|jpg|jpeg|tif|tiff)$/)) {
            return cb(new Error('Porfavor seleccione una imagen'));
        }
        cb(null, true);
    }
});

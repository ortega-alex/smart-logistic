import crypto from 'crypto-js';
import { Request } from 'express';
import fs from 'fs';
import { Jimp } from 'jimp';
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
    let ruta = path.join(__dirname, `../../uploads`);
    if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
    ruta = path.join(ruta, `/${_path}`);
    if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
    return ruta;
};

export const saveFile = async (file: Express.Multer.File) => {
    let buffer = file.buffer;
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
        try {
            const image = await Jimp.read(file.buffer);
            buffer = await image.resize({ w: 512 }).getBuffer('image/jpeg');
        } catch (error) {
            throw new Error('Error al procesar la imagen.');
        }
    }
    const name = remaneFile(file.originalname);
    const path = file.mimetype === 'application/pdf' ? enviroment.URI_FILE : enviroment.URI_IMAGES;
    const ruta = validatePath(path);
    await fs.writeFileSync(`${ruta}/${name}`, buffer);
    return `${path}/${name}`;
};

export const imageUpload = multer({
    storage: multer.diskStorage({
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
    }),
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
    storage: multer.diskStorage({
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
    })
});

export const fileBufferUpload = multer({
    storage: multer.memoryStorage(),
    // limits: {
    //     fileSize: 1000000
    // },
    fileFilter: (_res: Request, file: Express.Multer.File, cb): void => {
        if (!file.originalname.match(/\.(png|jpg|jpeg|tif|tiff|pdf)$/)) {
            return cb(new Error('Archivo no soportado'));
        }
        cb(null, true);
    }
});

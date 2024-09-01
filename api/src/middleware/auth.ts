import jwtoken from 'jsonwebtoken';
import { enviroment } from '../utils';
import { User } from '../model';
import { NextFunction, Request, Response } from 'express';

export const generateToken = (user: User) => {
    return jwtoken.sign({ usuario: user.usuario, correo: user.correo }, enviroment.TOKEN_SECRET);
};

export const authToken = (req: Request, res: Response, nex: NextFunction) => {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader && String(authHeader).split('')[1];
    if (!token) return res.json({ message: 'Token no valido' }).sendStatus(401);
    jwtoken.verify(token, enviroment.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        nex();
    });
};

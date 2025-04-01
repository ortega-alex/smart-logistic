import jwtoken from 'jsonwebtoken';
import { enviroment } from '../utils';
import { TokenUser } from '../interfaces';
import { NextFunction, Request, Response } from 'express';

export const generateToken = (user: TokenUser) => {
    return jwtoken.sign(user, enviroment.TOKEN_SECRET);
};

export const authToken = (req: Request, res: Response, nex: NextFunction) => {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader && String(authHeader).split(' ')[1];
    if (!token) return res.json({ message: 'Token no valido' }).sendStatus(401);
    jwtoken.verify(token, enviroment.TOKEN_SECRET, err => {
        if (err) return res.sendStatus(403);
        nex();
    });
};

import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import { Server } from 'socket.io';
import { authToken, decrypt, encrypt } from './middleware';
import { privateRoutes, publicRoutes } from './routes';
import { setupSocket } from './utils';

const uri = '/api/v1';

// INITIALIZE
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000,
        skipMiddlewares: true
    }
});
setupSocket(io);

// MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(decrypt);
app.use(encrypt);

// STATIC FILES
app.use(express.static(path.join(__dirname, './public')));

// PUBLIC ROUTES
app.use(uri, publicRoutes);

// PRIVATE ROUTES
app.use(authToken);
app.use(uri, privateRoutes);

// GLOBAL ENVIRONMENT
app.locals.io = io;

export default server;

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { privateRoutes, publicRoutes } from './routes';
import { authToken } from './middleware';

const app = express();
const uri = '/api/v1';

// MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC FILES
app.use(express.static(path.join(__dirname, '/public')));

// PUBLIC ROUTES
app.use(uri, publicRoutes);

// PRIVATE ROUTES
app.use(authToken);
app.use(uri, privateRoutes);

export default app;

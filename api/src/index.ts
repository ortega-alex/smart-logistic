import 'reflect-metadata';
import app from './app';
import AppDataSource from './db';
import { enviroment } from './utils';

const port = enviroment.NODE_ENV === 'development' ? enviroment.PORT : enviroment.PORT_POD;
const main = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Databa is connected');
        app.listen(Number(port), '0.0.0.0');
        console.log(`server on port ${port}`);
    } catch (error) {
        console.log(error);
    }
};

main();

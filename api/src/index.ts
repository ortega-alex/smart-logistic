import 'reflect-metadata';
import app from './app';
import AppDataSource from './db';
import { enviroment } from './utils';

const port = enviroment.NODE_ENV === 'development' ? enviroment.PORT : enviroment.PORT_POD;
const main = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Databa is connected');
        app.listen(port);
        console.log(`server on port ${port}`);
    } catch (error) {
        console.log(error);
    }
};

main();

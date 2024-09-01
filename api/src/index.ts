import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './db';

const port = 4000;

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

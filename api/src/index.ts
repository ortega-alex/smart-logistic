import 'reflect-metadata';
import app from './app';

const port = 4000;

const main = () => {
    try {
        app.listen(port);
        console.log(`server on port ${port}`);
    } catch (error) {
        console.log(error);
    }
};

main();

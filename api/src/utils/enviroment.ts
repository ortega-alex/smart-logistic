import { config } from 'dotenv';
config();

export const enviroment = {
    MYSQL_HOST: process.env.MYSQL_HOST || 'db',
    MYSQL_PORT: process.env.MYSQL_SERVER_PORT || 3306,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'smart_logistic',
    MYSQL_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    MYSQL_USER: process.env.MYSQL_ROOT_USER || 'root',
    TOKEN_SECRET: '2bcb7dc9-7236-11ec-8b4d-0025220dcb60'
};

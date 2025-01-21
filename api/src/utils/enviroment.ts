import { config } from 'dotenv';
config();

export const enviroment = {
    PORT: process.env.PORT || 4000,
    PORT_POD: process.env.PORT_POD || 4001,
    MYSQL_HOST: process.env.MYSQL_HOST || 'db',
    MYSQL_PORT: process.env.MYSQL_SERVER_PORT || 3306,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'smart_logistic',
    MYSQL_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    MYSQL_USER: process.env.MYSQL_ROOT_USER || 'root',
    TOKEN_SECRET: '2bcb7dc9-7236-11ec-8b4d-0025220dcb60',
    URI_FILE: 'files',
    URI_IMAGES: 'images',
    NODE_ENV: process.env.NODE_ENV || 'development',
    SECRET: process.env.SECRET || 'e1f86c0b-6a5d-11ef-80f9-0242ac130002',
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    EMAIL_PORT: process.env.EMAIL_PORT || 465,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM || 'ays.saavedra@gmail.com',
    FIREBASE_ADMIN_CREDENTIAL:
        process.env.FIREBASE_ADMIN_CREDENTIAL ||
        '{"type":"service_account","project_id":"smart-logistic","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/smart-logistic-b668e%40smart-logistic-b668e.iam.gserviceaccount.com"}'
};

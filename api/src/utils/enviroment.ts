import { config } from 'dotenv';
config();

const {
    PORT = 4000,
    PORT_POD = 4001,
    MYSQL_HOST = 'db',
    MYSQL_PORT = 3306,
    MYSQL_DATABASE = 'smart_logistic',
    MYSQL_PASSWORD,
    MYSQL_USER = 'root',
    TOKEN_SECRET = '2bcb7dc9-7236-11ec-8b4d-0025220dcb60',
    URI_FILE = 'files',
    URI_IMAGES = 'images',
    NODE_ENV = 'development',
    SECRET = 'e1f86c0b-6a5d-11ef-80f9-0242ac130002',
    EMAIL_HOST = 'smtp.gmail.com',
    EMAIL_PORT = 465,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM = 'ays.saavedra@gmail.com',
    FIREBASE_ADMIN_CREDENTIAL = '{"type":"service_account","project_id":"smart-logistic","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/smart-logistic-b668e%40smart-logistic-b668e.iam.gserviceaccount.com"}'
} = process.env;

export const enviroment = {
    PORT,
    PORT_POD,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_PASSWORD,
    MYSQL_USER,
    TOKEN_SECRET,
    URI_FILE,
    URI_IMAGES,
    NODE_ENV,
    SECRET,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM,
    FIREBASE_ADMIN_CREDENTIAL
};

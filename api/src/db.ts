import { DataSource } from 'typeorm';
import { enviroment } from './utils';
import { Perfil, Usuario } from './entities';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: enviroment.MYSQL_HOST,
    username: enviroment.MYSQL_USER,
    password: enviroment.MYSQL_PASSWORD,
    port: 3306,
    database: enviroment.MYSQL_DATABASE,
    entities: [Perfil, Usuario],
    synchronize: true
});

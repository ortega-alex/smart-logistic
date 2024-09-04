import { DataSource } from 'typeorm';
import { Profile, User } from './entities';
import { enviroment } from './utils';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: enviroment.MYSQL_HOST,
    username: enviroment.MYSQL_USER,
    password: enviroment.MYSQL_PASSWORD,
    database: enviroment.MYSQL_DATABASE,
    entities: [Profile, User],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
});
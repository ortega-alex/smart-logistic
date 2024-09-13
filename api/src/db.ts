import { DataSource } from 'typeorm';
import {
    Aution,
    Crane,
    Customer,
    CustomerFile,
    Menu,
    Permission,
    Port,
    Profile,
    ProfileMenuPermission,
    TypeOfCustomer,
    TypeVehicle,
    User
} from './entities';
import { enviroment } from './utils';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: enviroment.MYSQL_HOST,
    username: enviroment.MYSQL_USER,
    password: enviroment.MYSQL_PASSWORD,
    database: enviroment.MYSQL_DATABASE,
    entities: [
        Profile,
        User,
        Menu,
        TypeOfCustomer,
        Customer,
        CustomerFile,
        Aution,
        Crane,
        Port,
        TypeVehicle,
        Permission,
        ProfileMenuPermission
    ],
    synchronize: enviroment.NODE_ENV === 'development',
    namingStrategy: new SnakeNamingStrategy()
});

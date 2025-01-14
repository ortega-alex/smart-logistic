import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {
    Aution,
    Crane,
    Customer,
    CustomerFile,
    ImportHistory,
    ImportState,
    Menu,
    Notification,
    Permission,
    Port,
    Profile,
    ProfileMenuPermission,
    Quoter,
    QuoterDetail,
    TypeOfCustomer,
    TypeVehicle,
    User,
    Vehicles
} from './entities';
import { enviroment } from './utils';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: enviroment.MYSQL_HOST,
    username: enviroment.MYSQL_USER,
    password: enviroment.MYSQL_PASSWORD,
    database: enviroment.MYSQL_DATABASE,
    port: Number(enviroment.MYSQL_PORT),
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
        ProfileMenuPermission,
        Quoter,
        QuoterDetail,
        ImportState,
        ImportHistory,
        Vehicles,
        Notification
    ],
    synchronize: enviroment.NODE_ENV === 'development',
    namingStrategy: new SnakeNamingStrategy()
});

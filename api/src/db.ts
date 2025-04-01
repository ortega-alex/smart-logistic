import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { enviroment } from './utils';

import { CustomerFile } from './customer-file/entity/CustomerFile';
import { CustomerType } from './customer-type/entity/CustomerType';
import { Customer } from './customer/entity/Customer';
import { Department } from './department/entity/Department';
import { MenuPermissionProfile } from './menu-permission-profile/entity/MenuPermissionProfile';
import { Menu } from './menu/entity/Menu';
import { Municipality } from './municipality/entity/Municipality';
import { Permission } from './permission/entity/Permission';
import { Profile } from './profile/entity/Profile';
import { Sede } from './sede/entity/Sede';
import { State } from './state/entity/State';
import { TransportRate } from './transport-rate/entity/TransportRate';
import { TransportType } from './transport-type/entity/TransportType';
import { User } from './user/entity/User';
import { VehicleType } from './vehicle-type/entity/VehicleType';
import { Auction } from './auction/entity/Auction';

export default new DataSource({
    type: 'mysql',
    host: enviroment.MYSQL_HOST,
    username: enviroment.MYSQL_USER,
    password: enviroment.MYSQL_ROOT_PASSWORD,
    database: enviroment.MYSQL_DATABASE,
    port: Number(enviroment.MYSQL_SERVER_PORT),
    entities: [
        Menu,
        Customer,
        CustomerType,
        CustomerFile,
        Profile,
        Permission,
        MenuPermissionProfile,
        User,
        VehicleType,
        TransportType,
        State,
        Department,
        Municipality,
        Sede,
        TransportRate,
        Auction
    ],
    migrations: ['./migrations/*.ts'],
    migrationsTableName: 'custom_migrations_table',
    synchronize: enviroment.NODE_ENV === 'development',
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
        timezone: 'America/Guatemala'
    }
});

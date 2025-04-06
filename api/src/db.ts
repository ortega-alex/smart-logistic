import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { enviroment } from './utils';

import { Appointment } from './appointment/entity/Appointment';
import { AppointmentStatus } from './appointment/entity/AppointmentStatus';
import { Auction } from './auction/entity/Auction';
import { CustomerFile } from './customer-file/entity/CustomerFile';
import { CustomerType } from './customer-type/entity/CustomerType';
import { Customer } from './customer/entity/Customer';
import { Department } from './department/entity/Department';
import { Headquarter } from './headquarter/entity/Headquarter';
import { ImportHistory } from './import/entity/ImportHistory';
import { ImportState } from './import/entity/ImportState';
import { MenuPermissionProfile } from './menu-permission-profile/entity/MenuPermissionProfile';
import { Menu } from './menu/entity/Menu';
import { Notification } from './notification/entity/Notification';
import { Permission } from './permission/entity/Permission';
import { Profile } from './profile/entity/Profile';
import { Role } from './profile/entity/Role';
import { Quoter } from './quoter/entity/Quoter';
import { QuoterDetail } from './quoter/entity/QuoterDetail';
import { State } from './state/entity/State';
import { TransportRate } from './transport-rate/entity/TransportRate';
import { TransportType } from './transport-type/entity/TransportType';
import { User } from './user/entity/User';
import { VehicleType } from './vehicle-type/entity/VehicleType';
import { Vehicle } from './vehicle/entity/Vehicle';

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
        Role,
        Profile,
        Permission,
        MenuPermissionProfile,
        User,
        VehicleType,
        TransportType,
        State,
        Department,
        Headquarter,
        TransportRate,
        Auction,
        Quoter,
        QuoterDetail,
        ImportState,
        Vehicle,
        ImportHistory,
        AppointmentStatus,
        Appointment,
        Notification
    ],
    migrations: ['./migrations/*.ts'],
    migrationsTableName: 'custom_migrations_table',
    synchronize: enviroment.NODE_ENV === 'development',
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
        timezone: 'America/Guatemala'
    }
});

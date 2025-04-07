import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { enviroment } from './utils';

import { Appointment } from './modules/appointment/entity/Appointment';
import { AppointmentStatus } from './modules/appointment/entity/AppointmentStatus';
import { Auction } from './modules/auction/entity/Auction';
import { CustomerFile } from './modules/customer-file/entity/CustomerFile';
import { CustomerType } from './modules/customer-type/entity/CustomerType';
import { Customer } from './modules/customer/entity/Customer';
import { Department } from './modules/department/entity/Department';
import { Headquarter } from './modules/headquarter/entity/Headquarter';
import { ImportHistory } from './modules/import/entity/ImportHistory';
import { ImportState } from './modules/import/entity/ImportState';
import { MenuPermissionProfile } from './modules/menu-permission-profile/entity/MenuPermissionProfile';
import { Menu } from './modules/menu/entity/Menu';
import { Notification } from './modules/notification/entity/Notification';
import { Permission } from './modules/permission/entity/Permission';
import { Profile } from './modules/profile/entity/Profile';
import { Role } from './modules/profile/entity/Role';
import { Quoter } from './modules/quoter/entity/Quoter';
import { QuoterDetail } from './modules/quoter/entity/QuoterDetail';
import { State } from './modules/state/entity/State';
import { TransportRate } from './modules/transport-rate/entity/TransportRate';
import { TransportType } from './modules/transport-type/entity/TransportType';
import { User } from './modules/user/entity/User';
import { VehicleType } from './modules/vehicle-type/entity/VehicleType';
import { Vehicle } from './modules/vehicle/entity/Vehicle';

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

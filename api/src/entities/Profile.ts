import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './User';
import { Menu } from './Menu';
import { ProfileMenuPermission } from './ProfimeMenuPermissions';

@Entity('perfil')
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_perfil: number;

    @Column({
        nullable: false
    })
    perfil: string;

    @Column({
        default: true
    })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;

    @OneToMany(() => User, perfiles => perfiles.perfil)
    perfiles: Profile[];

    @OneToMany(() => ProfileMenuPermission, permisos => permisos.perfil)
    permisos: Profile[];
}

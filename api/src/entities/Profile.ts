import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileMenuPermission, User } from './';

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

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_creacion: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    fecha_edicion: Date;

    @OneToMany(() => User, perfiles => perfiles.perfil)
    perfiles: Profile[];

    @OneToMany(() => ProfileMenuPermission, permisos => permisos.perfil)
    permisos: Profile[];
}

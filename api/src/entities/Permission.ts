import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileMenuPermission } from './ProfimeMenuPermissions';

@Entity('permiso')
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_permiso: number;

    @Column('varchar', { length: 45 })
    permiso: string;

    @Column({ default: true })
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

    @OneToMany(() => ProfileMenuPermission, permisos => permisos.permiso)
    permisos: Permission[];
}

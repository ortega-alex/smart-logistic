import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProfileMenuPermission } from './ProfimeMenuPermissions';

@Entity('permiso')
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_permiso: number;

    @Column('varchar', { length: 45 })
    permiso: string;

    @Column({ default: true })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;

    @OneToMany(() => ProfileMenuPermission, permisos => permisos.permiso)
    permisos: Permission[];
}

import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProfileMenuPermission } from './ProfimeMenuPermissions';

@Entity()
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_menu: number;

    @Column('varchar', { length: 45 })
    menu: string;

    @Column('varchar', { length: 45 })
    icon: string;

    @Column('varchar', { length: 45 })
    path: string;

    @Column({
        default: false
    })
    es_mantenimiento: boolean;

    @Column({
        default: true
    })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;

    @OneToMany(() => ProfileMenuPermission, menus => menus.menu)
    menus: Menu[];
}

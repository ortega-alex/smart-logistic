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

    @Column({ default: true })
    menu_principal: boolean;

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
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_edicion: Date;

    @OneToMany(() => ProfileMenuPermission, menus => menus.menu)
    menus: Menu[];
}

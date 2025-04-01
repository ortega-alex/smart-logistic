import { MenuPermissionProfile } from '../../menu-permission-profile/entity/MenuPermissionProfile';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 45 })
    name: string;

    @Column('varchar', { length: 45 })
    icon: string;

    @Column('varchar', { length: 45 })
    path: string;

    @Column({ default: false })
    is_maintenance: boolean;

    @Column({ default: true })
    is_main_menu: boolean;

    @Column({ default: true })
    is_active: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    edited_at: Date;

    @OneToMany(() => MenuPermissionProfile, menuProfilePermission => menuProfilePermission.menu, { cascade: true })
    permissionProfiles: MenuPermissionProfile[];
}

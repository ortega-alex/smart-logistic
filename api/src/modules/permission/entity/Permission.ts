import { MenuPermissionProfile } from '../../menu-permission-profile/entity/MenuPermissionProfile';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 45 })
    name: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    edited_at: Date;

    @OneToMany(() => MenuPermissionProfile, menuProfilePermission => menuProfilePermission.permission, { cascade: true })
    menuProfiles: MenuPermissionProfile[];
}

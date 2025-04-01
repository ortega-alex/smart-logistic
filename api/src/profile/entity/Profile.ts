import { MenuPermissionProfile } from '../../menu-permission-profile/entity/MenuPermissionProfile';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/User';

@Entity()
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
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

    @OneToMany(() => MenuPermissionProfile, menuProfilePermission => menuProfilePermission.profile, { cascade: true })
    menuProfiles: MenuPermissionProfile[];

    @OneToMany(() => User, user => user.profile, { cascade: true })
    users: User[];
}

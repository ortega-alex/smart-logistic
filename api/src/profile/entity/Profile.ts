import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MenuPermissionProfile } from '../../menu-permission-profile/entity/MenuPermissionProfile';
import { User } from '../../user/entity/User';
import { Role } from './Role';

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

    @ManyToOne(() => Role, { nullable: false })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => MenuPermissionProfile, menuProfilePermission => menuProfilePermission.profile, { cascade: true })
    menuProfiles: MenuPermissionProfile[];

    @OneToMany(() => User, user => user.profile, { cascade: true })
    users: User[];
}

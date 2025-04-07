import { Menu } from '../../menu/entity/Menu';
import { Permission } from '../../permission/entity/Permission';
import { Profile } from '../../profile/entity/Profile';
import { BaseEntity, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class MenuPermissionProfile extends BaseEntity {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @ManyToOne(() => Profile)
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @ManyToOne(() => Menu)
    @JoinColumn({ name: 'menu_id' })
    menu: Menu;

    @ManyToOne(() => Permission)
    @JoinColumn({ name: 'permission_id' })
    permission: Permission;
}

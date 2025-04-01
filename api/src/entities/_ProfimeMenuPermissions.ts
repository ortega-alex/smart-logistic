import { BaseEntity, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Menu, Permission, Profile } from '.';

@Entity('perfil_memu_permiso')
export class ProfileMenuPermission extends BaseEntity {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @ManyToOne(() => Profile, perfil => perfil.permisos)
    @JoinColumn({ name: 'id_perfil' })
    perfil: Profile;

    @ManyToOne(() => Menu, menu => menu.menus)
    @JoinColumn({ name: 'id_menu' })
    menu: Menu;

    @ManyToOne(() => Permission, permiso => permiso.permisos)
    @JoinColumn({ name: 'id_permiso' })
    permiso: Permission;
}

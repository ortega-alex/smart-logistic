import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImportHistory, Notification, Profile, Quoter } from './';

@Entity('usuario')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @ManyToOne(() => Profile, perfil => perfil.perfiles)
    @JoinColumn({ name: 'id_perfil' })
    perfil: Profile;

    @Column()
    nombre: string;

    @Column({
        unique: true
    })
    usuario: string;

    @Column()
    contrasenia: string;

    @Column()
    telefono: string;

    @Column()
    correo: string;

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
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    fecha_edicion: Date;

    @OneToMany(() => Quoter, vendedores => vendedores.vendedor)
    vendedores: Quoter[];

    @OneToMany(() => ImportHistory, import_history => import_history.usuario)
    usuarios_importacion_historial: ImportHistory[];

    @OneToMany(() => Notification, notification => notification.usuario)
    notificacion_usuario: Notification[];
}

import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Profile } from './Profile';

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

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;
}

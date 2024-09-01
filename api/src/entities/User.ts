import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Perfil } from './Profile';

@Entity()
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Perfil, perfil => perfil.perfiles)
    perfil: Perfil;

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

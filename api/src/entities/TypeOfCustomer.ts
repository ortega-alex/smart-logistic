import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from './Customer';

@Entity('tipo_cliente')
export class TypeOfCustomer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_cliente: number;

    @Column('varchar', { length: 45 })
    tipo_cliente: string;

    @Column({
        default: true
    })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;

    @OneToMany(() => Customer, tipos_clientes => tipos_clientes.tipo_cliente)
    tipos_clientes: TypeOfCustomer[];
}

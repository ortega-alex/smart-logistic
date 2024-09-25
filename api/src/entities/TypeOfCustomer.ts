import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

    @OneToMany(() => Customer, tipos_clientes => tipos_clientes.tipo_cliente)
    tipos_clientes: TypeOfCustomer[];
}

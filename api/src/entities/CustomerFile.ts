import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './Customer';

@Entity('archivo_cliente')
export class CustomerFile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_archivo: number;

    @ManyToOne(() => Customer, cliente => cliente.archivos)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Customer;

    @Column('varchar', { length: 200 })
    ruta: string;

    @Column('varchar', { length: 100 })
    nombre: string;

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
}

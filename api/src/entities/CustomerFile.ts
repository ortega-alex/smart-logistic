import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from './Customer';

@Entity('archivo_cliente')
export class CustomerFile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_archivo: number;

    @Column('varchar', { length: 200 })
    ruta: string;

    @Column('varchar', { length: 100 })
    nombre: string;

    @Column({
        default: true
    })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;

    @ManyToOne(() => Customer, cliente => cliente.archivos)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Customer;
}

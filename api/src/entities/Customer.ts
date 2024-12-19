import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerFile } from './CustomerFile';
import { Quoter } from './Quoter';
import { TypeOfCustomer } from './TypeOfCustomer';
import { ImportHistory } from './ImportHistory';

@Entity('cliente')
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_cliente: number;

    @ManyToOne(() => TypeOfCustomer, tipo_cliente => tipo_cliente.tipos_clientes)
    @JoinColumn({ name: 'id_tipo_cliente' })
    tipo_cliente: TypeOfCustomer;

    @Column('varchar', { length: 100 })
    cliente: string;

    @Column('varchar', { length: 45 })
    telefono_celular: string;

    @Column('varchar', { length: 45, nullable: true })
    telefono_fijo: string;

    @Column('varchar', { length: 200 })
    direccion: string;

    @Column('varchar', { length: 45 })
    nit: string;

    @Column('varchar', { length: 45 })
    dpi: string;

    @Column('varchar', { length: 45 })
    correo: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    porcentaje_costo: number;

    @Column({ default: true })
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

    @OneToMany(() => CustomerFile, archivos => archivos.cliente)
    archivos: CustomerFile[];

    @OneToMany(() => Quoter, clientes => clientes.cliente)
    clientes: Quoter[];

    @OneToMany(() => ImportHistory, clientes => clientes.cliente)
    clientes_importacion_historial: Quoter[];
}

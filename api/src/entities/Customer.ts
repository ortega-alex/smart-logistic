import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { CustomerFile } from './CustomerFile';
import { TypeOfCustomer } from './TypeOfCustomer';

@Entity('cliente')
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_cliente: number;

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
    porcentaje_descuento: number;

    @Column({ default: true })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;

    @OneToMany(() => CustomerFile, archivos => archivos.cliente)
    archivos: CustomerFile[];

    @ManyToOne(() => TypeOfCustomer, tipo_cliente => tipo_cliente.tipos_clientes)
    @JoinColumn({ name: 'id_tipo_cliente' })
    tipo_cliente: TypeOfCustomer;
}

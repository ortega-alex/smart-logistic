import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Costo } from '../model';
import { Aution, Crane, Customer, Port, TypeVehicle, User } from './';

@Entity('cotizacion')
export class Quoter extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_cotizacion: number;

    @ManyToOne(() => Customer, customer => customer.clientes, { nullable: false })
    @JoinColumn({ name: 'id_cliente' })
    cliente: Customer;

    @ManyToOne(() => User, user => user.vendedores, { nullable: false })
    @JoinColumn({ name: 'id_vendedor' })
    vendedor: User;

    @ManyToOne(() => TypeVehicle, tipo_vehiculo => tipo_vehiculo.tipos_vehiculos, { nullable: false })
    @JoinColumn({ name: 'id_tipo_vehiculo' })
    tipo_veniculo: TypeVehicle;

    @ManyToOne(() => Port, puerto => puerto.puertos)
    @JoinColumn({ name: 'id_puerto' })
    puerto: Port;

    @ManyToOne(() => Aution, subasta => subasta.subastas, { nullable: true })
    @JoinColumn({ name: 'id_subasta' })
    subasta: Aution;

    @ManyToOne(() => Crane, grua_usd => grua_usd.gruas_usd)
    @JoinColumn({ name: 'id_grua_usd' })
    grua_usd: Crane;

    @ManyToOne(() => Crane, grua_gt => grua_gt.gruas_gt)
    @JoinColumn({ name: 'id_grua_gt' })
    grua_gt: Crane;

    @Column('varchar', { length: 45 })
    marca: string;

    @Column('varchar', { length: 45 })
    modelo: string;

    @Column('varchar', { length: 45 })
    anio: string;

    @Column('varchar', { length: 45 })
    serie: string;

    @Column('varchar', { length: 45 })
    vin: string;

    @Column('json', { default: null })
    costos?: Array<Costo>;

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
}

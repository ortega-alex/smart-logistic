import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quoter } from './Quoter';

@Entity('tipo_vehiculo')
export class TypeVehicle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_vehiculo: number;

    @Column('varchar', { length: 45 })
    tipo_vehiculo: string;

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

    @OneToMany(() => Quoter, tipos_vehiculos => tipos_vehiculos.tipo_veniculo)
    tipos_vehiculos: Quoter[];
}

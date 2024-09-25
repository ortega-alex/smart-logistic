import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;

    @OneToMany(() => Quoter, tipos_vehiculos => tipos_vehiculos.tipo_veniculo)
    tipos_vehiculos: Quoter[];
}

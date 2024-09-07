import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tipo_vehiculo')
export class TypeVehicle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_vehiculo: number;

    @Column('varchar', { length: 45 })
    tipo_vehiculo: string;

    @Column({ default: true })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;
}

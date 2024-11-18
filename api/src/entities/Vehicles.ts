import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImportState, Quoter } from './';

@Entity('vehiculos')
export class Vehicles extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_vehiculo: number;

    @ManyToOne(() => Quoter, quoter => quoter.cotizaciones, { nullable: false })
    @JoinColumn({ name: 'id_cotizacion' })
    cotizacion: Quoter;

    @ManyToOne(() => ImportState, inport_state => inport_state.estados_importacion, { nullable: false })
    @JoinColumn({ name: 'id_estado_importacion' })
    estado_importacion: ImportState;

    @Column('varchar', { length: 45 })
    lote: string;

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

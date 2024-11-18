import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quoter } from '.';

@Entity('cotizacion_detalle')
export class QuoterDetail extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id_cotizacion_detalle: string;

    @ManyToOne(() => Quoter, quoter => quoter.detalles, { nullable: false })
    @JoinColumn({ name: 'id_cotizacion' })
    detalle: Quoter;

    @Column('varchar', { length: 45 })
    nombre: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @Column('varchar', { length: 45 })
    moneda: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_creacion: Date;
}

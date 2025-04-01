import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Aution, Quoter } from '.';

@Entity('grua')
export class Crane extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_grua: number;

    @ManyToOne(() => Aution, aution => aution.gruas, { nullable: true })
    @JoinColumn({ name: 'id_subasta' })
    subasta: Aution;

    @Column('varchar', { length: 45 })
    grua: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    costo: number;

    @Column('varchar', { length: 10 })
    moneda: string;

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

    @OneToMany(() => Quoter, gruas_usd => gruas_usd.grua_usd)
    gruas_usd: Quoter[];

    @OneToMany(() => Quoter, gruas_gt => gruas_gt.grua_gt)
    gruas_gt: Quoter[];
}

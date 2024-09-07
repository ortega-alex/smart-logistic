import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Aution } from './Aution';

@Entity('grua')
export class Crane extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_grua: number;

    @Column('varchar', { length: 45 })
    grua: string;

    @Column({ default: true })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;

    @ManyToOne(() => Aution, aution => aution.gruas)
    @JoinColumn({ name: 'id_subasta' })
    subasta: Aution;
}

import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Crane, Quoter } from './';

@Entity('subasta')
export class Aution extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_subasta: number;

    @Column('varchar', { length: 45 })
    subasta: string;

    @Column('varchar', { length: 45, nullable: true })
    alias: string;

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

    @OneToMany(() => Crane, gruas => gruas.grua)
    gruas: Crane[];

    @OneToMany(() => Quoter, subastas => subastas.subasta)
    subastas: Quoter[];
}

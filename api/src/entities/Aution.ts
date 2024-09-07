import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Crane } from './Crane';

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

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;

    @OneToMany(() => Crane, gruas => gruas.grua)
    gruas: Crane[];
}

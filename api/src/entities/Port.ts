import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('puerto')
export class Port extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_puerto: number;

    @Column('varchar', { length: 45 })
    puerto: string;

    @Column({ default: true })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_edicion: Date;
}

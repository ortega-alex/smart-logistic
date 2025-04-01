import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quoter } from './Quoter';

@Entity('puerto')
export class Port extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_puerto: number;

    @Column('varchar', { length: 45 })
    puerto: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    costo_embarque: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    costo_aduanal: number;

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

    @OneToMany(() => Quoter, puertos => puertos.puerto)
    puertos: Quoter[];
}

import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicles } from './Vehicles';
import { ImportHistory } from './ImportHistory';

@Entity('estado_importacion')
export class ImportState extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_estado_importacion: number;

    @Column('varchar', { length: 45 })
    estado_importacion: string;

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

    @OneToMany(() => Vehicles, vehiculos => vehiculos.estado_importacion)
    estados_importacion: Vehicles[];

    @OneToMany(() => ImportHistory, import_history => import_history.historial_estado)
    historial_estados: Vehicles[];
}

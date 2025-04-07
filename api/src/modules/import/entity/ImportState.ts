import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../../vehicle/entity/Vehicle';

@Entity()
export class ImportState extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 45 })
    name: string;

    @Column('int', { default: 0 })
    index: number;

    @Column('varchar', { length: 7 })
    color: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    edited_at: Date;

    @OneToMany(() => Vehicle, vehicle => vehicle.importState, { cascade: true })
    vehicles: Vehicle[];

    // @OneToMany(() => ImportHistory, import_history => import_history.estado_importacion)
    // historial_estados: Vehicles[];
}

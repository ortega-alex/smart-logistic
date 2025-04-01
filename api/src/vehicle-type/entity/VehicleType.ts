import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransportRate } from '../../transport-rate/entity/TransportRate';

@Entity()
export class VehicleType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 45 })
    name: string;

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

    @OneToMany(() => TransportRate, rransportRate => rransportRate.vehicleType, { cascade: true })
    transportRates: TransportRate[];

    // @OneToMany(() => Quoter, tipos_vehiculos => tipos_vehiculos.tipo_veniculo)
    // tipos_vehiculos: Quoter[];
}

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerType } from '../../customer-type/entity/CustomerType';
import { Headquarter } from '../../headquarter/entity/Headquarter';
import { TransportType } from '../../transport-type/entity/TransportType';
import { User } from '../../user/entity/User';
import { VehicleType } from '../../vehicle-type/entity/VehicleType';

@Entity()
export class TransportRate extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    rate: number;

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
    updated_at: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => VehicleType, { nullable: false })
    @JoinColumn({ name: 'vehicle_type_id' })
    vehicleType: VehicleType;

    @ManyToOne(() => TransportType, { nullable: false })
    @JoinColumn({ name: 'transport_type_id' })
    transportType: TransportType;

    @ManyToOne(() => Headquarter, { nullable: false })
    @JoinColumn({ name: 'headquarter_id' })
    headquarter: Headquarter;

    @ManyToOne(() => CustomerType, { nullable: false })
    @JoinColumn({ name: 'customer_type_id' })
    customerType: CustomerType;
}

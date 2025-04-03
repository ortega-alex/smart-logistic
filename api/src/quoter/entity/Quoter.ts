import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customer/entity/Customer';
import { User } from '../../user/entity/User';
import { VehicleType } from '../../vehicle-type/entity/VehicleType';
import { TransportType } from '../../transport-type/entity/TransportType';
import { Headquarter } from '../../headquarter/entity/Headquarter';
import { Auction } from '../../auction/entity/Auction';
import { QuoterDetail } from './QuoterDetail';

// cotizaciones de vehículos
@Entity()
export class Quoter extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 45 })
    mark: string;

    @Column('varchar', { length: 45 })
    model: string;

    @Column('varchar', { length: 45 })
    year: string;

    @Column('varchar', { length: 45 })
    lot: string;

    @Column('varchar', { length: 45 })
    vin: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ default: false })
    is_aproverd: boolean;

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

    @ManyToOne(() => Customer, { nullable: false })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    createdBy: User;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'seller_id' })
    seller: User;

    @ManyToOne(() => VehicleType, { nullable: false })
    @JoinColumn({ name: 'vehicle_type_id' })
    vehicleType: VehicleType;

    @ManyToOne(() => TransportType, { nullable: false })
    @JoinColumn({ name: 'transport_type_id' })
    transportType: TransportType;

    @ManyToOne(() => Headquarter, { nullable: false })
    @JoinColumn({ name: 'issuing_headquarter_id' })
    issuingHeadquarter: Headquarter;

    @ManyToOne(() => Headquarter, { nullable: false })
    @JoinColumn({ name: 'headquarter_id' })
    headquarter: Headquarter;

    @ManyToOne(() => Auction, { nullable: true })
    @JoinColumn({ name: 'auction_id' })
    auction: Auction;

    @OneToMany(() => QuoterDetail, quoterDetail => quoterDetail.quoter, { cascade: true })
    details: QuoterDetail[];
}

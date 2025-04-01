import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerFile } from '../../customer-file/entity/CustomerFile';
import { CustomerType } from '../../customer-type/entity/CustomerType';

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 45 })
    phone_number: string;

    @Column('varchar', { length: 45, nullable: true })
    landline: string;

    @Column('varchar', { length: 200 })
    address: string;

    @Column('varchar', { length: 45 })
    nit: string;

    @Column('varchar', { length: 45 })
    dpi: string;

    @Column('varchar', { length: 45 })
    email: string;

    @Column('varchar', { nullable: true })
    token_fcm: string;

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

    @ManyToOne(() => CustomerType)
    @JoinColumn({ name: 'customer_type_id' })
    type: CustomerType;

    @OneToMany(() => CustomerFile, customerFile => customerFile.customer)
    files: CustomerFile[];

    // @OneToMany(() => Quoter, clientes => clientes.cliente)
    // clientes: Quoter[];

    // @OneToMany(() => ImportHistory, clientes => clientes.cliente)
    // clientes_importacion_historial: Quoter[];

    // @OneToMany(() => Notification, notification => notification.cliente)
    // notificacion_cliente: Notification[];
}

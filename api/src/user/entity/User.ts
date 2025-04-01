import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profile/entity/Profile';
import { TransportRate } from '../../transport-rate/entity/TransportRate';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    phone_number: string;

    @Column()
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

    @ManyToOne(() => Profile)
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @OneToMany(() => TransportRate, transportRate => transportRate.user, { cascade: true })
    transportRates: TransportRate[];

    // @OneToMany(() => Quoter, vendedores => vendedores.vendedor)
    // vendedores: Quoter[];

    // @OneToMany(() => ImportHistory, import_history => import_history.usuario)
    // usuarios_importacion_historial: ImportHistory[];

    // @OneToMany(() => Notification, notification => notification.usuario)
    // notificacion_usuario: Notification[];
}

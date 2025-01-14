import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicles, Customer, User } from './';

export enum NotificationPriority {
    LOW = '#096dd9',
    MEDIUM = '#FA541C',
    HIGH = '#F5222D'
}

@Entity('notificacion')
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id_notificacion: string;

    @ManyToOne(() => Vehicles, vehicles => vehicles.notificacion_vechiculo, { nullable: true })
    @JoinColumn({ name: 'id_vehiculo' })
    vehiculo: Vehicles;

    @ManyToOne(() => Customer, customers => customers.notificacion_cliente, { nullable: true })
    @JoinColumn({ name: 'id_cliente' })
    cliente: Customer;

    @ManyToOne(() => User, users => users.notificacion_usuario, { nullable: true })
    @JoinColumn({ name: 'id_usuario' })
    usuario: User;

    @Column('varchar', { length: 100 })
    titulo: string;

    @Column('varchar', { length: 500 })
    contenido: string;

    @Column({
        type: 'enum',
        enum: NotificationPriority,
        default: NotificationPriority.LOW
    })
    prioridad: NotificationPriority;

    @Column({ default: false })
    visto: boolean;

    @Column({ default: true })
    estado: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_creacion: Date;
}

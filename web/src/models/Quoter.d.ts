import { Crane, Customer, Port, TypeVehicle, User } from './';

export interface QuoterDetail {
    nombre: string;
    valor: string;
    moneda: string;
}

export interface Quoter {
    id_cotizacion: number;
    id_cliente: number | Customer.id_cliente;
    cliente?: Customer;
    id_vendedor: number | User.id_vendedor;
    vendedor?: User;
    id_tipo_vehiculo: number | TypeVehicle.id_tipo_vehiculo;
    tipo_veniculo?: TypeVehicle;
    marca: string;
    modelo: string;
    anio: string;
    id_puerto: number | Port.id_puerto;
    puerto?: Port;
    estado: boolean;
    subasta?: Aution;
    id_subasta?: number | Aution.id_subasta;
    grua_usd?: Crane;
    id_grua_usd?: number | Crane.id_grua;
    grua_gt?: Crane;
    id_grua_gt?: number | Crane.id_grua;
    details?: Array<QuoterDetail>;
}

export const EmptyQuoter: Quoter = {
    id_cotizacion: 0,
    id_cliente: 0,
    id_vendedor: 0,
    id_tipo_vehiculo: 0,
    marca: '',
    modelo: '',
    anio: '',
    id_puerto: 0,
    estado: true
};

export const EmptyQuoterDetail: QuoterDetail = {
    nombre: '',
    valor: '',
    moneda: ''
};

export enum KeysCosto {
    USD = 'Grua EE.UU',
    GTQ = 'Grua GT',
    PORT_SHIPPING = 'Embarque',
    PORT_DOCUMENT_OR_EXP = 'ADUANA Y DOCS. EXP'
}

export interface Costo {
    index?: number;
    nombre: KeysCosto | string;
    moneda: string;
    valor: string | number;
}

export const EmptyCosto: Costo = {
    nombre: '',
    moneda: '',
    valor: 0
};

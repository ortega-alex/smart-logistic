export interface TypeOfCustomer {
    id_tipo_cliente: number;
    tipo_cliente: string;
    estado: boolean;
}

export const EmptyTypeOfCustomer: TypeOfCustomer = {
    id_tipo_cliente: 0,
    tipo_cliente: '',
    estado: true
};

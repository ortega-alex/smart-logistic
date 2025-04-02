export interface CustomerType {
    id?: number;
    name: string;
    is_active: boolean;
}

export interface CustomerFile {
    id: number;
    name: string;
    path: string;
    is_active: boolean;
}

export interface Customer {
    id: number;
    name: string;
    phone_number: string;
    landline: string;
    address: string;
    nit: string;
    dpi: string;
    email: string;
    is_active: boolean;
    token_fcm?: string;
    type?: CustomerType;
    files?: Array<CustomerFile>;
}

export interface Customer {
    name: string;
    phone_number: string;
    landline: string;
    address: string;
    nit: string;
    dpi: string;
    email: string;
    token_fcm?: string;
    is_active?: boolean;
    customer_type_id?: number;
}

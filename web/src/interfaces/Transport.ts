export interface TransportType {
    id: number;
    name: string;
    is_active: boolean;
}

export interface TransportRateFilter {
    customer_type_id: number;
    transport_type_id: number;
    vehicle_type_id: number;
    headquarter_id: number;
}

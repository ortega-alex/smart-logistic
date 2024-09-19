import type { GetProp, TableProps } from 'antd';
import { Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

export interface Map {
    [key: string]: JSX.Element;
}

export interface ObjectCustomer {
    [key: string]: string;
}

export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'] | string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export enum KeysCosto {
    USD = 'Grua EE.UU',
    GT = 'Grua GT'
}

export interface Costo {
    [KeysCosto.USD]?: string;
    [KeysCosto.GT]?: string;
}

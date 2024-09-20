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
    GT = 'Grua GT',
    PORT_SHIPPING = 'Embarque',
    PORT_DOCUMENT_OR_EXP = 'ADUANA Y DOCS. EXP'
}

export interface Costo {
    [KeysCosto.USD]?: string;
    [KeysCosto.GT]?: string;
    [KeysCosto.PORT_SHIPPING]?: string;
    [KeysCosto.PORT_DOCUMENT_OR_EXP]?: string;
}

export enum ValidatorName {
    OnlyNumbers = 'onlyNumbers',
    Mail = 'mailIsValied',
    Password = 'passwordIsValid',
    PhoneNumber = 'phoneNumberIsValid',
    Nit = 'nitIsValid',
    Dpi = 'noDpiIsValid'
}

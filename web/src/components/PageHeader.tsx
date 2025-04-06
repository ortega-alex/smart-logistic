import { Button, Tooltip } from 'antd';
import React from 'react';
import { Icon } from './Icon';
import { Search } from './Search';

type Props = {
    title: string;
    onGet: () => void;
    onSearch: (value: string) => void;
    onAdd: () => void;
};

export const PageHeader: React.FC<Props> = ({ title, onGet, onSearch, onAdd }) => {
    return (
        <div className='flex flex-md-column gap-3 justify-between'>
            <h3>{title}</h3>
            <div className='flex gap-1'>
                <Tooltip title='Recargar'>
                    <Button type='text' htmlType='button' icon={<Icon.Reload />} onClick={onGet} />
                </Tooltip>
                <Search onSearch={onSearch} onReset={() => onSearch('')} />
            </div>
            <Button type='primary' htmlType='button' onClick={onAdd}>
                Agregar
            </Button>
        </div>
    );
};

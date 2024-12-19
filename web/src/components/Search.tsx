import { Button, Input } from 'antd';
import { useState } from 'react';
import { Icon } from './Icon';

interface Props {
    onSearch: (value: string) => void;
    onReset: () => void;
}

export const Search: React.FC<Props> = ({ onSearch, onReset }) => {
    const [search, setSearch] = useState('');

    return (
        <Input
            prefix={<Icon.Search />}
            placeholder={'Buscar'}
            value={search}
            className='search'
            onChange={env => setSearch(env.target.value)}
            onKeyDown={e => {
                if (e.key === 'Enter') onSearch(search);
            }}
            suffix={
                search ? (
                    <Button
                        size='small'
                        type='text'
                        icon={<Icon.Close />}
                        onClick={() => {
                            setSearch('');
                            onReset();
                        }}
                    />
                ) : null
            }
        />
    );
};

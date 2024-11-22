import { QuoterDetail } from '@/models';
import { commaSeparateNumber } from '@/utilities';
import { Table } from 'antd';

interface Props {
    detail: Array<QuoterDetail>;
}

export const TableDetail: React.FC<Props> = ({ detail }) => {
    return (
        <Table
            size='small'
            rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
            pagination={false}
            className='table mb-3 px-5'
            showSorterTooltip={false}
            rowKey='id_subasta'
            dataSource={detail}
            columns={[
                {
                    title: 'Concepto',
                    dataIndex: 'nombre',
                    ellipsis: true
                },
                {
                    width: 200,
                    title: 'Valor',
                    render: (_, { moneda, valor }) => (
                        <span>
                            {moneda}. {commaSeparateNumber(valor)}
                        </span>
                    )
                }
            ]}
        />
    );
};

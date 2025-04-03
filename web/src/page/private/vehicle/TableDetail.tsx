import { QuoterDetail } from '@/interfaces';
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
            showSorterTooltip={false}
            rowKey='id_subasta'
            dataSource={detail}
            columns={[
                {
                    title: 'Concepto',
                    dataIndex: 'name',
                    ellipsis: true
                },
                {
                    width: 200,
                    title: 'Valor',
                    render: (_, { coin, value }) => (
                        <span>
                            {coin}. {commaSeparateNumber(value)}
                        </span>
                    )
                }
            ]}
            summary={pageData => {
                let total = 0;
                const coin = pageData?.[0].coin ?? '';
                pageData.forEach(item => (total += Number(item.value)));
                return (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>
                            <strong>Total</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                            <strong>
                                {coin} {commaSeparateNumber(total)}
                            </strong>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                );
            }}
        />
    );
};

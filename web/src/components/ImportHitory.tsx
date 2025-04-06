import { Icon, ViewFiles } from '@/components';
import { ImportHistory } from '@/interfaces';
import { RootState } from '@/redux';
import { getDateFormat } from '@/utilities';
import { Button, List, Modal, Table, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
    details: Array<ImportHistory>;
    loading: boolean;
};

export const ImportHitory: React.FC<Props> = ({ details, loading }) => {
    const [modal, setModal] = useState(false);
    const [path, setPath] = useState('');
    const deviceState = useSelector((store: RootState) => store.device);

    const handleViewFile = (path: string) => {
        setPath(path);
        setModal(true);
    };

    return (
        <div className='py-3'>
            {deviceState ? (
                <>
                    <List
                        dataSource={details}
                        loading={loading}
                        rowKey='id'
                        renderItem={item => (
                            <div key={item.id} className='item-list text-capitalize'>
                                <div className='flex gap-1 items-center'>
                                    <Icon.Calendar />
                                    {getDateFormat(item.created_at ?? '', 'DD/MM/YYYY HH:mm')}
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <Icon.InfoCircle />
                                    {item.description}
                                </div>

                                <div className='flex justify-between'>
                                    <div className='flex gap-1 items-center'>
                                        <Icon.Eye />
                                        {item.is_visible_customer ? 'Si' : 'No'}
                                    </div>
                                    <div>
                                        {item.path && (
                                            <Button type='link' danger htmlType='button' onClick={() => handleViewFile(String(item.path))}>
                                                Ver
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                    <br />
                    <br />
                </>
            ) : (
                <Table
                    size='small'
                    rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                    pagination={false}
                    className='table mb-3 px-5'
                    showSorterTooltip={false}
                    rowKey='id_subasta'
                    dataSource={details}
                    loading={loading}
                    scroll={{ y: 250 }}
                    columns={[
                        {
                            title: 'Fecha',
                            dataIndex: 'created_at',
                            render: value => <span>{getDateFormat(value, 'DD/MM/YYYY HH:mm')}</span>
                        },
                        {
                            title: 'Descripcion',
                            dataIndex: 'description',
                            ellipsis: true
                        },
                        {
                            title: 'Visible por el cliente',
                            dataIndex: 'is_visible_customer',
                            align: 'center',
                            render: value => <Tag color={value ? 'green' : 'red'}>{value ? 'Si' : 'No'}</Tag>
                        },
                        {
                            title: 'Archivo',
                            align: 'center',
                            dataIndex: 'path',
                            render: value => (
                                <div className='text-center'>
                                    {value && (
                                        <Tooltip title='Ver' placement='right'>
                                            <Button type='link' onClick={() => handleViewFile(value)}>
                                                Ver
                                            </Button>
                                        </Tooltip>
                                    )}
                                </div>
                            )
                        }
                    ]}
                />
            )}

            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
                closeIcon={
                    <div className='bg-secondary px-2 border-sm'>
                        <Icon.Close color='white' />
                    </div>
                }
                width={1000}
                footer={false}
                className='bg-transparent'
            >
                <ViewFiles path={path} download={true} />
            </Modal>
        </div>
    );
};

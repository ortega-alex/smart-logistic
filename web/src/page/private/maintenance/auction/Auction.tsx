import { Icon, Search } from '@/components';
import { Auction as AuctionInterface } from '@/interfaces';
import { RootState } from '@/redux';
import { httpGetAllAuctions } from '@/services';
import { commaSeparateNumber } from '@/utilities';
import { Button, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormAution } from './FormAuction';

export const EmptyAuction: AuctionInterface = {
    id: 0,
    name: '',
    is_active: true,
    crane_rate: 0
};

export const Auction = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Subastas';

    const [auction, setAuction] = useState<AuctionInterface>(EmptyAuction);
    const [auctions, setAuctions] = useState<Array<AuctionInterface>>([]);
    const [auctionsCopy, setAuctionsCopy] = useState<Array<AuctionInterface>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = (value: string = '') => {
        let _autions = [...auctionsCopy];
        if (value !== '')
            _autions = _autions.filter(item => item.id === Number(value) || item.name?.toLowerCase().indexOf(value.toLowerCase()) !== -1);

        setAuctions(_autions);
    };

    const handleEdit = (item: AuctionInterface) => {
        setAuction(item);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetAllAuctions()
            .then(res => {
                setAuctions(res);
                setAuctionsCopy(res);
            })
            .catch(err => message.error(`Erro http get autions: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className='h-100 flex flex-column p-auto'>
            <div className='flex flex-md-column gap-3 justify-between'>
                <h3>{title}</h3>
                <div>
                    <Search onSearch={handleSearch} onReset={() => handleSearch('')} />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setAuction(EmptyAuction);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={auctions}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.name}
                            </div>

                            <div>
                                <strong>Estadp EEUU: </strong>&nbsp;{item.state?.name}
                            </div>
                            <div>
                                <strong>Sede: </strong>&nbsp;{item.sede?.name}
                            </div>
                            <div className='flex-1'>
                                <strong>Tarifa: </strong>&nbsp;{commaSeparateNumber(item.crane_rate)}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.is_active ? 'Activo' : 'Inactivo'}
                                </div>
                                <Button type='link' danger htmlType='button' icon={<Icon.Edit />} onClick={() => handleEdit(item)}>
                                    Editar
                                </Button>
                            </div>
                        </div>
                    )}
                />
            ) : (
                <Table
                    size='small'
                    rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                    pagination={false}
                    className='table'
                    loading={loading}
                    showSorterTooltip={false}
                    rowKey='id'
                    dataSource={auctions}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'name',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Estado EEUU',
                            dataIndex: 'state',
                            ellipsis: true,
                            sorter: true,
                            render: state => <span>{state?.name ?? 'Sin estado'}</span>
                        },
                        {
                            title: 'Sede',
                            dataIndex: 'sede',
                            ellipsis: true,
                            sorter: true,
                            render: sede => <span>{sede?.name ?? 'Sin sede'}</span>
                        },
                        {
                            title: 'Tarifa',
                            dataIndex: 'crane_rate',
                            render: value => <span className='text-right'>{commaSeparateNumber(value)}</span>
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'is_active',
                            render: value => <span className={value ? 'text-success' : 'text-danger'}>{value ? 'Activo' : 'Inactivo'}</span>
                        },
                        {
                            title: 'Opciones',
                            dataIndex: 'operacion',
                            width: 80,
                            render: (_, item) => (
                                <div className='text-center'>
                                    <Button
                                        style={{ width: 40 }}
                                        icon={<Icon.Edit />}
                                        type='primary'
                                        size='small'
                                        onClick={() => handleEdit(item)}
                                    />
                                </div>
                            )
                        }
                    ]}
                />
            )}

            <Modal
                open={modal}
                title={
                    <h3>
                        {auction.id > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormAution
                    auction={auction}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

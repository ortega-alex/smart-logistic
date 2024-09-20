import { Icon, Search } from '@/components';
import { EmptyPort, Port as TypePort } from '@/models';
import { RootState } from '@/redux';
import { httpGetPorts } from '@/services';
import { Button, List, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormPorts } from './FormPort';
import { commaSeparateNumber } from '@/utilities';

export const Port = () => {
    const deviceState = useSelector((store: RootState) => store.device);
    const title = 'Puertos';

    const [port, setPort] = useState<TypePort>(EmptyPort);
    const [ports, setPorts] = useState<Array<TypePort>>([]);
    const [portsCopy, setPortsCopy] = useState<Array<TypePort>>([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnSearch = (value: string) => {
        let _ports = [...portsCopy];
        if (value.trim() !== '')
            _ports = _ports.filter(
                item => item.id_puerto === Number(value) || item.puerto.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
        setPorts(_ports);
    };

    const handleEdit = (item: TypePort) => {
        setPort(item);
        setModal(true);
    };

    const handleGet = () => {
        setLoading(true);
        httpGetPorts()
            .then(res => {
                setPorts(res);
                setPortsCopy(res);
            })
            .catch(err => message.error(`Error http get ports: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className='h-100 flex flex-column p-3'>
            <div className='flex flex-md-column gap-3 justify-between'>
                <h3>{title}</h3>
                <div>
                    <Search onSearch={handleOnSearch} onReset={() => handleOnSearch('')} />
                </div>
                <Button
                    type='primary'
                    htmlType='button'
                    onClick={() => {
                        setPort(EmptyPort);
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>

            {deviceState ? (
                <List
                    dataSource={ports}
                    loading={loading}
                    renderItem={item => (
                        <div className='item-list' key={item.id_puerto}>
                            <div className='flex-1'>
                                <strong>Nombre: </strong>&nbsp;{item.puerto}
                            </div>
                            <div className='flex-1'>
                                <strong>Costo Embarque: </strong>&nbsp;${commaSeparateNumber(item.costo_embarque)}
                            </div>
                            <div className='flex-1'>
                                <strong>Costo Aduanal: </strong>&nbsp;${commaSeparateNumber(item.costo_aduanal)}
                            </div>

                            <div className='flex flex-row justify-between'>
                                <div>
                                    <strong>Estado: </strong>&nbsp;{item.estado ? 'Activo' : 'Inactivo'}
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
                    rowKey='id_subasta'
                    dataSource={ports}
                    columns={[
                        {
                            title: 'No',
                            dataIndex: 'id_puerto'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'puerto',
                            ellipsis: true,
                            sorter: true
                        },
                        {
                            title: 'Costo Embarque',
                            dataIndex: 'costo_embarque',
                            sorter: true,
                            render: (_, item) => commaSeparateNumber(item.costo_embarque)
                        },
                        {
                            title: 'Costo Aduanal (Doc/Exp)',
                            dataIndex: 'costo_aduanal',
                            sorter: true,
                            render: (_, item) => commaSeparateNumber(item.costo_aduanal)
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'estado',
                            render: value => <span className={value ? 'text-success' : 'text-danger'}>{value ? 'Actuvi' : 'Inactivo'}</span>
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
                        {port.id_puerto > 0 ? 'Editar' : 'Agregar'} {title.substring(0, title.length - 1)}
                    </h3>
                }
                footer={null}
                onCancel={() => setModal(false)}
                centered
                destroyOnClose
            >
                <FormPorts
                    port={port}
                    onClose={() => {
                        handleGet();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

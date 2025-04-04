import { Customer, Quoter, QuoterDetail, Session, Coin, DetailsCoin } from '@/interfaces';
import { RootState } from '@/redux';
import { httpAddQuoter, httpDowloadInvoice, httpGetCustomer, httpUpdateQuoter } from '@/services';
import { downloadFile } from '@/utilities';
import { message, Modal } from 'antd';
import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface Response {
    error?: boolean;
    message?: string;
}

export type QuoterContextType = {
    loading: boolean;
    quoter: Quoter;
    details: DetailsCoin;
    customers: Array<Customer>;
    session: Session;
    onDownloadInvoice: (quoter: Quoter) => void;
    onAproveQuoter: (quoter: Quoter) => Promise<Response>;
    addOrUpdate: (quoter: Quoter) => Promise<Response>;
    updateQuoter: (quoter: Quoter) => void;
    rebootQuoter: () => void;
    updateDetails: (detail: QuoterDetail) => void;
    deleteDetails: (detail: QuoterDetail) => void;
};

export const EmptyQuoter: Quoter = {
    id: 0,
    mark: '',
    model: '',
    year: '',
    lot: '',
    vin: '',
    is_aproverd: false,
    is_active: false
};

export const QuoterContext = createContext<QuoterContextType | null>(null);
export const QuoterState: React.FC<{ children: React.ReactNode }> = props => {
    const sessionState: Session = useSelector((store: RootState) => store.session);
    const [quoter, setQuoter] = useState(EmptyQuoter);
    const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [details, setDetails] = useState<DetailsCoin>({
        [Coin.USD]: [],
        [Coin.GTQ]: []
    });
    const [loading, setLoading] = useState(false);

    const handleUpdateQuoter = (quoter: Quoter) => {
        setQuoter(quoter);
        const usd = quoter.details?.filter(item => item.coin === Coin.USD);
        const gtq = quoter.details?.filter(item => item.coin === Coin.GTQ);
        setDetails({
            [Coin.USD]: usd ?? [],
            [Coin.GTQ]: gtq ?? []
        });
    };
    const handleRebootQuoter = () => setQuoter(EmptyQuoter);

    const handleAddOrUpdate = (values: Quoter): Promise<Response> => {
        return new Promise(async (resolve, reject) => {
            try {
                setLoading(true);
                const _details = [...details[Coin.USD], ...details[Coin.GTQ]];
                const data = {
                    user_id: sessionState.session_id,
                    ...quoter,
                    ...values,
                    details: _details
                };
                let res;
                if (data.id > 0) res = await httpUpdateQuoter(data);
                else res = await httpAddQuoter(data);
                message[res?.error ? 'warning' : 'success'](res.message);
                resolve(res);
            } catch (error) {
                reject({ error: true, message: (error as Error).message });
            } finally {
                setLoading(false);
            }
        });
    };

    const handleDownloadInvoice = async (quoter: Quoter) => {
        console.log(quoter);
        try {
            setLoading(true);
            const res = await httpDowloadInvoice(quoter.id);
            downloadFile(res, `${quoter.customer?.name ?? 'cotizacion'}-invoice.zip`);
        } catch (error) {
            message.error(`Error http download invoice: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAproveQuoter = (quoter: Quoter): Promise<Response> => {
        return new Promise(async (resolve, reject) => {
            setLoading(true);
            Modal.confirm({
                title: '¿Estás seguro de aprobar esta cotización?',
                content: 'Esta acción no se puede deshacer',
                okText: 'Si',
                cancelText: 'No',
                onCancel: () => {
                    resolve({ error: true, message: 'Cancelado' });
                    setLoading(false);
                },
                onOk: async () => {
                    try {
                        const res = await handleAddOrUpdate({ ...quoter, is_aproverd: true });
                        resolve(res);
                    } catch (error) {
                        reject({ error: true, message: (error as Error).message });
                    }
                }
            });
        });
    };

    const handleUpdateDetails = (detail: QuoterDetail) => {
        const newDetails = [...details[detail.coin]];
        const index = newDetails.findIndex(item => item.id === detail.id);
        if (index > -1) newDetails[index] = detail;
        else newDetails.push(detail);
        setDetails(item => ({ ...item, [detail.coin]: newDetails }));
    };

    const handleDeleteDetail = (detail: QuoterDetail) => {
        const newDetails = [...details[detail.coin]];
        setDetails(item => ({ ...item, [detail.coin]: newDetails.filter(item => item.id !== detail.id) }));
    };

    useEffect(() => {
        httpGetCustomer()
            .then(res => setCustomers(res?.filter((item: Customer) => item.is_active)))
            .catch(err => message.error(`Error http get customers: ${err.message}}`));
    }, []);

    return (
        <QuoterContext.Provider
            value={{
                quoter,
                details,
                customers,
                session: sessionState,
                loading,
                onDownloadInvoice: handleDownloadInvoice,
                onAproveQuoter: handleAproveQuoter,
                addOrUpdate: handleAddOrUpdate,
                updateQuoter: handleUpdateQuoter,
                rebootQuoter: handleRebootQuoter,
                updateDetails: handleUpdateDetails,
                deleteDetails: handleDeleteDetail
            }}
        >
            {props.children}
        </QuoterContext.Provider>
    );
};

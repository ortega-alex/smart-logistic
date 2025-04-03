import { TransportRateFilter } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/transport-rate';

export const httpGetTransportRateFiler = async (body: TransportRateFilter) =>
    await httpRequest({
        path: `${path}/get-rate`,
        method: 'POST',
        data: body
    });

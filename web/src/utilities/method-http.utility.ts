import { _SERVER, RequesParam } from '@/models';
import axios from 'axios';
import { decryptResponse, encryptRequest } from './encrypt.utility';

export const httpRequest = async (payload: RequesParam) => {
    try {
        let data: any;
        if (payload?.type === 'multipart') {
            data = new FormData();
            Object.keys(payload?.data).forEach(key => {
                if (key === 'files' && Array.isArray(payload?.data[key]?.fileList))
                    payload?.data[key].fileList.forEach((file: any) => data.append('files', file.originFileObj));
                else data.append(key, payload?.data[key]);
            });
        } else data = payload?.data;

        // CIFRA LA INFORMACION POST | PUT, PRODUCCION
        if (process.env.NODE_ENV !== 'development' && data && payload?.type !== 'multipart' && payload?.responseType !== 'blob')
            data = encryptRequest(data);

        const res = await axios({
            method: payload.method,
            url: _SERVER.apiUrl + payload.path,
            data,
            timeout: 20000,
            responseType: payload.responseType || 'json'
        });

        // VALIDA SI LA RESPUESTA ESTA CIFRADA
        if (res.data?.iv) return decryptResponse(res.data);

        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

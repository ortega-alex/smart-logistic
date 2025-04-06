import { _SERVER } from '@/constants';
import axios from 'axios';
import { decryptResponse, encryptRequest } from './encrypt.utility';

export interface RequesParam {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: Record<string, any>; // Permite cualquier objeto o FormData
    type?: 'multipart' | 'json';
    responseType?: 'json' | 'blob' | 'text';
}

export const httpRequest = async (payload: RequesParam): Promise<any> => {
    try {
        let data: FormData | Record<string, any> | undefined = payload?.data || {};
        if (payload?.type === 'multipart' && payload.data) {
            data = new FormData();
            Object.keys(payload.data).forEach(key => {
                if (key === 'files' && Array.isArray(payload.data?.[key]?.fileList)) {
                    payload?.data[key].fileList.forEach(
                        (file: any) => data instanceof FormData && data.append('files', file.originFileObj)
                    );
                } else if (data instanceof FormData) {
                    data.append(key, payload.data?.[key]);
                }
            });
        }

        // CIFRA LA INFORMACION POST | PUT, PRODUCCION
        if (_SERVER.NODE_ENV !== 'development' && data && payload?.type !== 'multipart') data = encryptRequest(data);

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

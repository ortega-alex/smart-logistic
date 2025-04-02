import { _SERVER } from '@/models';
import { CustomerFile } from '@/interfaces';

interface Options {
    file: CustomerFile;
    download?: Boolean;
}

export const ViewFiles: React.FC<Options> = ({ file, download }) => {
    const arr = file.path.split('.');
    const extension = arr[arr.length - 1];
    const url = `${_SERVER.baseUrl}${file.path}`;

    return (
        <object data={`${url}#toolbar=${download ? 1 : 0}`} style={{ width: '100%', height: '90vh', objectFit: 'contain' }}>
            <p className='p-3 text-center'>
                Su navegador web no tiene un complemento de {extension}. En cambio, puede
                <a href={url} target='_blank' rel='noreferrer'>
                    &nbsp;Hacer clic aquí para descargar el archivo {extension}
                </a>
            </p>
        </object>
    );
};

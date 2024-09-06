import { _SERVER, CustomerFile } from '@/models';

interface Options {
    file: CustomerFile;
    download?: Boolean;
}

export const ViewFiles: React.FC<Options> = ({ file, download }) => {
    const arr = file.ruta.split('.');
    const extension = arr[arr.length - 1];
    const url = `${_SERVER.baseUrl}/${file.ruta}`;

    return (
        <object data={`${url}#toolbar=${download ? 1 : 0}`} type={`application/${extension}`} style={{ width: '100%', height: '90vh' }}>
            <p className='p-3 text-center'>
                Su navegador web no tiene un complemento de PDF. En cambio, puede
                <a href={url} target='_blank' rel='noreferrer'>
                    &nbsp;Hacer clic aquí para descargar el archivo PDF
                </a>
            </p>
        </object>
    );
};

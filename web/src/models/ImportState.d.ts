export interface ImportState {
    id_estado_importacion: number;
    estado_importacion: string;
    estado: boolean;
    index: number;
    color: string;
}

export const EmptyImportState: ImportState = {
    id_estado_importacion: 0,
    estado_importacion: '',
    estado: true,
    index: 0,
    color: ''
};

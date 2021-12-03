export class modelResponse<T> {
    codigoRespuesta: number;
    mensaje: string;
    data: T[];

    constructor(init?: Partial<modelResponse<T>>) {
        Object.assign(this, init);
    }
}

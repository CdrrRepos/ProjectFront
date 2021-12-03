export class vehiculoModel {
    id: number;
    estacion: string;
    sentido: string;
    hora: number;
    categoria: string;
    fecha: string;
    cantidad: number;
    valorTabulado: number;

    constructor(init?: Partial<vehiculoModel>) {
        Object.assign(this, init);
    }
}
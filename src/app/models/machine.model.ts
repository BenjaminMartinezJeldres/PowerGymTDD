export interface Machine{
    name: string,
    tipoMaquina: string,
    musculo: string,
    instrucciones: string,
    precauciones: string,
    soldUnits:number,
    price: number,
    image: string
    id: string,
    nameLowerCase?: string; // Agrega esta línea
}
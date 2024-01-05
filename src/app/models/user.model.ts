export interface User{
    uid: string,
    email: string,
    password: string,
    name: string,
    lastname:string,
    image: string,
    rut: string;
    height: string;
    weight: string;
    birthDate?: Date; // Hacer opcional
}
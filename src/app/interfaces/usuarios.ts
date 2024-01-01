//usuarios.ts
export interface Usuarios {
    id: string,
    email: string,
    name: string,
    profile: 'user' | 'admin',
    expirationDate?: string; // Opcional si algunos usuarios pueden no tenerlo
    birthdate: string; // Opcional si algunos usuarios pueden no tenerlo
    phoneNumber: string; // Opcional si algunos usuarios pueden no tenerlo
    RUT: string; // Opcional si algunos usuarios pueden no tenerlo
    memberSince?: string; // Esto debería coincidir con el campo en Firestore
}
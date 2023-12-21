import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// Importa otros módulos necesarios, como HttpClient si estás haciendo peticiones HTTP

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  constructor() { 
    // Inyecta dependencias si es necesario, por ejemplo, HttpClient
  }

  getMachines(): Observable<any[]> {
    // Aquí debes implementar la lógica para obtener los datos de las máquinas.
    // Por ejemplo, puedes devolver un Observable de un array de máquinas.
    // Esta es una implementación simulada con datos estáticos:
    const machines = [
      { name: 'Máquina 1', /* otros datos de la máquina */ },
      { name: 'Máquina 2', /* otros datos de la máquina */ },
      // ... más máquinas
    ];
    return of(machines);
  }
}

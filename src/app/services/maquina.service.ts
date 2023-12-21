import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, orderBy, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs'
import { Maquinas } from '../interfaces/maquinas';
import { InteractionService } from './interaction.service';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  constructor(
    private firestore: Firestore,
    private interactionService: InteractionService
  ) { }

  addMaquina(cliente: Maquinas) {
    const placeRef = collection(this.firestore, 'maquinas')
    return addDoc(placeRef, cliente)
  }

  getMaquinas(): Observable<Maquinas[]> {
    const maquinasRef = query(collection(this.firestore, 'maquinas'), orderBy('nombre', ))
    return collectionData(maquinasRef) as Observable<Maquinas[]>
  }


}
import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, where, query, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs'
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firestore: Firestore,
  ) { }

  addUsuario(usuario: Usuarios) {
    const usuarioRef = collection(this.firestore, 'users')
    const docRef = doc(this.firestore, "users", usuario.id );
    setDoc(docRef, usuario).then(() => {
      console.log("Document has been added successfully")
    })
    .catch(error => { console.log(error); })
    return  addDoc(usuarioRef, usuario)
  }

  getUsuario(uid:string): Observable<Usuarios[]> {
    const usuarioRef = query(collection(this.firestore, 'users'), where('id', '==', uid))
    return collectionData(usuarioRef) as Observable<Usuarios[]>
  }


}
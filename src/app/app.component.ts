import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { InteractionService } from './services/interaction.service';
import { UsuarioService } from './services/usuario.service';
import { Observable } from 'rxjs'
import { collection, Firestore, addDoc, collectionData, where, query, doc, getDoc } from '@angular/fire/firestore';
import { Usuarios } from './interfaces/usuarios';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  // user$ = this.auth.authState$.pipe(
  //   filter(state => state ? true : false)
  // )

  profile: 'user' | 'admin' | null = null


  constructor(
    private auth: AuthService,
    private router: Router,
    private interaction: InteractionService,
    private usuarioService: UsuarioService,
    private firestore: Firestore
  ) {

    this.auth.stateUser().subscribe(res =>{
      if(res) {
        console.log('logeado')
        this.getDatosUsuario(res.uid)
        
      } else {
        console.log('no logeado')
      }
    })
  }


  async logout() {
    await this.auth.logout();
    this.interaction.presentToast('Sesión finalizada')
    this.router.navigate(['/login']);
  }

  getUsuario(uid:string): Observable<Usuarios[]> {
    const usuarioRef = query(collection(this.firestore, 'users'), where('id', '==', uid))
    return collectionData(usuarioRef) as Observable<Usuarios[]>
  }

  
  async getDatosUsuario(uid:string) {
    const docRef = doc(this.firestore, 'users', uid)
    try {
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()) {
          console.log(docSnap.data());
          this.profile = docSnap.data()?.['profile'];
      } else {
          console.log("Document does not exist")
      }
  
    } catch(error) {
      console.log(error)
    }

  }

  

}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFireModule
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Importa la configuración de Firebase desde tu archivo firebase-config.ts
import { firebaseConfig } from './firebase-config'; // Importa tu configuración de Firebase

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    // Configura AngularFireModule con las credenciales de Firebase
    AngularFireModule.initializeApp(firebaseConfig), // Configura AngularFire con tus credenciales de Firebase
    AngularFirestoreModule
  
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}

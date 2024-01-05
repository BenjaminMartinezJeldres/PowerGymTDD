import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
   lastname:new FormControl('', [Validators.required, Validators.minLength(4)]),
    rut: new FormControl('', [Validators.required,this.rutValidator]), // Añade validaciones específicas para RUT si es necesario
    height: new FormControl('', [Validators.required, Validators.min(50), Validators.max(250)]),
    weight: new FormControl('', [Validators.required, Validators.min(20), Validators.max(300)]),
    
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }
// Agrega la función de validador de RUT aquí dentro de la clase
 // Agrega la función de validador de RUT aquí dentro de la clase
 rutValidator(control: FormControl): { [key: string]: any } | null {
  const valid = /^\d{7,8}-[\dkK]$/.test(control.value);
  return valid ? null : { 'invalidRut': { value: control.value } };

}
 async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {

       await this.firebaseSvc.updateUser(this.form.value.name);

       let uid = res.user.uid;
       this.form.controls.uid.setValue(uid);

       this.setUserInfo(uid);
        
      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
        
      }).finally(() => {
        loading.dismiss();
      })
    }


  }


  async setUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();
       
        
      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
        
      }).finally(() => {
        loading.dismiss();
      })
    }


  }
}

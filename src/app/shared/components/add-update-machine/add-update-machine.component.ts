import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Machine } from 'src/app/models/machine.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-machine',
  templateUrl: './add-update-machine.component.html',
  styleUrls: ['./add-update-machine.component.scss'],
})
export class AddUpdateMachineComponent  implements OnInit {

  @Input() machine: Machine;

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    piso: new FormControl(null, [Validators.required, Validators.min(1),Validators.max(3)]),
    cantMaquina: new FormControl(null, [Validators.required, Validators.min(0),Validators.max(5)]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;

  ngOnInit() {

    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.machine) this.form.setValue(this.machine);
  }


  // ======== Tomar/Seleccionar Imagen =======
 async takeImage() {
  const dataUrl = (await this.utilsSvc.takePicture('Imagen de la Máquina')).dataUrl;
  this.form.controls.image.setValue(dataUrl);
  }


submit(){
  if (this.form.valid) {

    if(this.machine) this.updateMachine();
    else this.createMachine()

  }
}


  // ======== Convierte valores de tipo string a number =======
  setNumberInputs() {

    let { cantMaquina, piso } = this.form.controls;

    if(cantMaquina.value) cantMaquina.setValue(parseFloat(cantMaquina.value));
    if(piso.value) piso.setValue(parseFloat(piso.value));
    
  }

  // ======== Crear Máquinas =======
 async createMachine() {
 

      let path = `users/${this.user.uid}/machines`

      const loading = await this.utilsSvc.loading();
      await loading.present();

      // === Subir la imagen y obtener la url ===
      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      delete this.form.value.id

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dismissModal({ success: true });
      
        this.utilsSvc.presentToast({
          message: 'Máquina creada exitosamente',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        })
        
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

 // ======== Actualizar Máquina =======
  async updateMachine() {

      let path = `users/${this.user.uid}/machines/${this.machine.id}`

      const loading = await this.utilsSvc.loading();
      await loading.present();

    // === Si cambió la imagen, subir la nueva y obtener la url ===
      if(this.form.value.image !== this.machine.image){
        let dataUrl = this.form.value.image;
        let imagePath = await this.firebaseSvc.getFilePath(this.machine.image);
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
        this.form.controls.image.setValue(imageUrl);

      }
      

      delete this.form.value.id

      this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dismissModal({ success: true });
      
        this.utilsSvc.presentToast({
          message: 'Máquina actualizada exitosamente',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        })
        
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

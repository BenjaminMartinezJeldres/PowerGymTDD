//home.page.ts
import { Component, OnInit, inject } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateMachineComponent } from 'src/app/shared/components/add-update-machine/add-update-machine.component';
import { orderBy, where } from 'firebase/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {


  filteredMachines: Machine[] = []; // Esta será la lista filtrada que se mostrará
  filterText: string = ''; // Este será el texto de búsqueda
  searchTerm: string = '';
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);


  machines: Machine[] = [];
  loading: boolean = false;

  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }
  
  ionViewWillEnter() {
    this.getMachines();
  }


  doRefresh(event) {
    setTimeout(() => {
      this.getMachines();
      event.target.complete();
    }, 1000);
  }

  // ====== Obtener ganancias =====
  getProfits() {
    return this.machines.reduce((index, machine) => index + machine.piso * machine.cantMaquina, 0);
  }

  // ====== Obtener Máquinas =====
  // ====== Obtener Máquinas =====
getMachines() {
  let path = `users/${this.user().uid}/machines`;

  this.loading = true;

  let query = [
    orderBy('cantMaquina', 'desc'),
    // Puedes incluir otras condiciones aquí si es necesario
  ];

  let sub = this.firebaseSvc.getCollectionData(path, query).subscribe({
    next: (res: any) => {
      console.log(res);
      this.machines = res;
      this.filteredMachines = [...this.machines]; // Aquí se hace la copia inicial
      this.loading = false;
      sub.unsubscribe();
    },
    error: err => {
      console.error(err);
      this.loading = false;
    }
  });
}


  // ====== Agregar o actualizar máquina =====
  async addUpdateMachine(machine?: Machine) {

    let success = await this.utilsSvc.presentModal({
      component: AddUpdateMachineComponent,
      cssClass: 'add-update-modal',
      componentProps: { machine }
    })

    if (success) this.getMachines();
  }


  // ====== Confirmar eliminación del máquina =====
  async confirmDeleteMachine(machine: Machine) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Máquina',
      message: '¿Quieres eliminar esta máquina?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteMachine(machine)
          }
        }
      ]
    });

  }


  // ======== Eliminar Máquina =======
  async deleteMachine(machine: Machine) {

    let path = `users/${this.user().uid}/machines/${machine.id}`

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = await this.firebaseSvc.getFilePath(machine.image);
    await this.firebaseSvc.deleteFile(imagePath);

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.machines = this.machines.filter(p => p.id !== machine.id);

      this.utilsSvc.presentToast({
        message: 'Máquina eliminada exitosamente',
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
  constructor(
    
    private router: Router // Inyecta el servicio Router aquí
  ) { }


  // Función para manejar el clic en la imagen
openMachineDetails(machineId: string) {
  this.router.navigate(['/machine-details', { id: machineId }]);
}

//barra buscador filtrado
filterMachines(event) {
  const val = event.target.value.toLowerCase();
  if (val && val.trim() !== '') {
    this.filteredMachines = this.machines.filter(machine => {
      return machine.name.toLowerCase().includes(val) || machine.piso.toString().includes(val);
    });
  } else {
    this.filteredMachines = this.machines;
  }
}









  
}

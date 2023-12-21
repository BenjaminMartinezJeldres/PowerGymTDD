import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  loading: any


  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(mensaje:string) {
    this.loading = await this.loadingController.create({
      message: mensaje,
      spinner: 'bubbles'
    });
    await this.loading.present();
  }

  async closeLoading() {
    await this.loading.dismiss()
  }
}

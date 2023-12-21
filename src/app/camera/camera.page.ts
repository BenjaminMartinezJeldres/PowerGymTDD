import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  scannedData: any; // Asegúrate de que esta línea está presente

  constructor() {}

  async startScan() {
    // Configurar y empezar el escaneo de QR aquí
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      console.log(result.content);
      // Aquí manejas el contenido del código QR escaneado
    }
  }

  async stopScan() {
    // Detener el escaneo de QR aquí
    await BarcodeScanner.stopScan();
  }
}
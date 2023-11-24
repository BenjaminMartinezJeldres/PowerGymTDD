import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfileImage: string = 'path-to-default-image.jpg'; // Asegúrate de cambiar esto a una ruta válida de imagen por defecto.
  userEmail: string | null = null;

  constructor(
    
    private authService: AuthService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.authService.authState$.subscribe((user: User | null) => {
      if (user) {
        this.userEmail = user.email; // Aquí obtienes el correo electrónico del usuario
        // Si deseas cargar la imagen de perfil del usuario desde un servidor, aquí sería el lugar para hacerlo.
      } else {
        // Manejar el caso en que no hay usuario autenticado.
        this.userEmail = null;
        this.userProfileImage = 'path-to-default-image.jpg'; // Vuelve a la imagen por defecto si no hay sesión.
      }
    });
  }

  async changePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt // Esto permitirá al usuario seleccionar la cámara o la galería.
      });

      // Si 'image.webPath' no es undefined, actualiza 'userProfileImage'.
      if (image.webPath) {
        this.userProfileImage = image.webPath;
      }
      // Si no, 'userProfileImage' permanecerá con su valor por defecto.
    } catch (error) {
      console.error('Error al obtener foto:', error);
      // Si hay un error o el proceso se cancela, 'userProfileImage' permanecerá con su valor por defecto.
    }
  }
}

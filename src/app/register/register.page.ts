//register.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, NonNullableFormBuilder, Validators,AbstractControl,ValidationErrors  } from '@angular/forms';
import {AuthService} from './../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuarios } from '../interfaces/usuarios';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  Usuario: Usuarios = {
    id: 'null',
    email: 'null',
    name: 'null',
    profile: 'user',
    expirationDate: '', // Puedes inicializar con un valor por defecto o dejarlo vacío si es opcional.
    birthdate: '', // Debe ser proporcionado por el usuario.
    phoneNumber: '', // Debe ser proporcionado por el usuario.
    RUT: '', // Debe ser proporcionado por el usuario.
    memberSince: new Date().toISOString(), // Normalmente se establece en el momento del registro.
  }

  form= this.formBuilder.group({
    name: ['',[Validators.required]],
    lastname: ['',[Validators.required]],
    rut: ['', [Validators.required,this.validateRUT]],
    birthdate: ['', [Validators.required]], // Añade un control de formulario para la fecha de nacimiento
    phoneNumber: ['', [Validators.required]],
    email:['',[Validators.email,Validators.required]],
    password: ['',[Validators.required,Validators.minLength(7) ]],
    confirmPassword:['',[Validators.required]],
  },NonNullableFormBuilder)
  
  validateRUT(control: AbstractControl): ValidationErrors | null {
  const rutPattern = /^\d{7,8}-[\dKk]$/;
  return rutPattern.test(control.value) ? null : { invalidRut: true };
  }

  constructor(
    private formBuilder : FormBuilder,
    private auth: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private toastController: ToastController

      ) { }

  ngOnInit() {
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

   register() {
    this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
    if (this.form.valid) {
      const formValue = this.form.value;
      // Es una buena práctica recoger todos los valores del formulario juntos
      this.Usuario = {
        ...this.Usuario, // Conserva los valores existentes
        email: formValue.email,
        name: `${formValue.name} ${formValue.lastname}`, // Asumiendo que quieres el nombre completo
        RUT: formValue.rut,
        birthdate: formValue.birthdate,
        phoneNumber: formValue.phoneNumber,
        // Asegúrate de que el profile es 'user' a menos que tu lógica determine que debe ser 'admin'
        profile: 'user', 
        memberSince: new Date().toISOString(),
      };

      this.auth.register(this.Usuario.email, formValue.password)
        .then((userCredential) => {
          this.Usuario.id = userCredential.user.uid; // Asigna el ID de Firebase al usuario
          this.usuarioService.addUsuario(this.Usuario)
            .then(() => {
              this.router.navigate(['/home']);
            })
            .catch(error => {
              console.error('Error al añadir usuario:', error);
              this.presentToast('Error al añadir usuario.'); // Mostrar toast si hay un error
            });
        })
        .catch(error => {
          console.error('Error en el registro:', error);
          this.presentToast('Error en el registro.'); // Mostrar toast si hay un error
        });
    } else {
      // Mostrar un toast para cada error de validación
      for (const key in this.form.controls) {
        if (this.form.controls[key].errors) {
          let message = '';
          if (this.form.controls[key].hasError('required')) {
            message = 'Todos los campos son obligatorios.';
          } else if (this.form.controls[key].hasError('minlength')) {
            message = 'La contraseña debe tener al menos 7 caracteres.';
          } else if (this.form.controls[key].hasError('email')) {
            message = 'Por favor, introduce un correo electrónico válido.';
          } else if (this.form.controls[key].hasError('invalidRut')) {
      message = 'El RUT debe tener el siguiente formato 11111111-1.';
        }

          // ...otros mensajes para otros errores...
          if (message) {
            this.presentToast(message);
            break; // Solo muestra el primer error
          }
        }
      }
    }
  }
}


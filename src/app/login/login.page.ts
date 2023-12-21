import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { InteractionService } from '../services/interaction.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  loading:any

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private interaction: InteractionService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.interaction.presentLoading('Cargando...')
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      if (email && password) {
        this.authService.login(email, password)
          .then(() => {
            this.interaction.closeLoading()
            this.router.navigate(['/home'])
            this.interaction.presentToast('Sesión iniciada con éxito!')
          })
          .catch(error => {
            console.log(error.code)
            if(error.code == 'auth/invalid-login-credentials') {
              this.interaction.closeLoading()
              console.log('Email o contraseña incorrecta')
              this.interaction.presentToast('Email o contraseña incorrecta')
            }
          });
      } else console.error('Email y contraseña son campos requeridos')
    } else this.form.markAllAsTouched();
  }

  signInWithGoogle() {
    this.interaction.presentLoading('Esperando respuesta')
    this.authService.loginWithGoogle()
    .then((result) => {
      if (result.user) {
        console.log(result)
        this.interaction.closeLoading()
        this.router.navigate(['/home'])
        this.interaction.presentToast('Sesión iniciada con éxito!')
      }
    }).catch(error => {
      console.error(error)
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, // Nombre de instancia corregido
    private router: Router,
  ) {}

  ngOnInit() {
  }

  // Método para iniciar sesión con email y contraseña
  login() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      if (email && password) {
        this.authService.login(email, password)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error('Email and password are required');
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  // Método para iniciar sesión con Google
  signInWithGoogle() {
    this.authService.loginWithGoogle().then((result) => {
      if (result.user) {
        this.router.navigate(['/home']);
      }
    }).catch(error => {
      console.error(error);
    });
  }
}

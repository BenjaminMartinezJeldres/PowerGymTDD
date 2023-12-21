import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import {AuthService} from './../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuarios } from '../interfaces/usuarios';

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
    profile: 'user'
  }

  form= this.formBuilder.group({
    name: ['',[Validators.required]],
    lastname: ['',[Validators.required]],
    email:['',[Validators.email,Validators.required]],
    password: ['',[Validators.required]],
    confirmPassword:['',[Validators.required]],
  },NonNullableFormBuilder)

  constructor(
    private formBuilder : FormBuilder,
    private auth: AuthService,
    private router: Router,
    private usuarioService: UsuarioService 
      ) { }

  ngOnInit() {
  }

  register(){
    if(this.form.valid){


      const name = this.form.get('name')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      if (email && password) {
        this.auth.register(email, password)
          .then((user) => {
            this.Usuario.email=email
            this.Usuario.id=user.user.uid
            this.usuarioService.addUsuario(this.Usuario)
            this.router.navigate(['/home']);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error('Email and password are required');
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form= this.formBuilder.group({
    email:['',[Validators.email,Validators.required]],
    password: ['',[Validators.required]],

  });

  constructor( 
    private formBuilder : FormBuilder,
    private auth: AuthService,
    private router: Router, 
    ) {}

  ngOnInit() {
  }

  login(){
    if (this.form.valid){
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      if (email && password) {
        this.auth.login(email, password) // Cambiar 'register' por 'login'
          .then(() => {
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

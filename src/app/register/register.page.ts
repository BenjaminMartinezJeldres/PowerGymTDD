import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],

})
export class RegisterPage implements OnInit {

  form= this.formBuilder.group({
    email:['',[Validators.email,Validators.required]],
    password: ['',[Validators.required]],

  })


  constructor(
    private formBuilder : FormBuilder
      ) { }

  ngOnInit() {
  }

  register(){
    if(this.form.valid){
      const{email,password,/*confirmpassword*/}=this.form.getRawValue();
      console.log(email,password);
      
    }else{
      this.form.markAllAsTouched();
    }
  }

}


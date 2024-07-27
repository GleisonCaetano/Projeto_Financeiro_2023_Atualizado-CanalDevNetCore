import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  
  constructor(public formBuilder: FormBuilder, private router: Router){
  
    this.loginForm = this.formBuilder.group({
        email: ['',[Validators.required, Validators.email]],
        senha: ['',[Validators.required]]
      });
    }

    ngOnInit():void{}

    get dadosForm(){
      return this.loginForm.controls;
    }

    loginUser(){
      alert("OK")
    }
}
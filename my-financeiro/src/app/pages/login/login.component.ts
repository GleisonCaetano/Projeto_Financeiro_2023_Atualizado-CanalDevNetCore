import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder, 
    private router: Router, 
    private loginService: LoginService, 
    public authService: AuthService){
  
    this.loginForm = this.formBuilder.group({
        email: ['',[Validators.required, Validators.email]],
        senha: ['',[Validators.required]]
    });
  }

  get dadosForm(){
    return this.loginForm.controls;
  }

  loginUser(){
    this.loginService.login(this.dadosForm["email"].value, this.dadosForm["senha"].value).subscribe(
      token => {
        this.authService.setToken(token);
        this.authService.usuarioAutenticado(true);
        this.router.navigate(['/dashboard']);
      },
      err => {
        alert('Ocorreu um erro');
      }
    )}
}
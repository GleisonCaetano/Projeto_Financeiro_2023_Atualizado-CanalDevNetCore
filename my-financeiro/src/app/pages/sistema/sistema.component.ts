import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiroModel';
import { SistemaService } from '../../services/sistema.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sistema',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sistema.component.html',
  styleUrl: './sistema.component.scss'
})
export class SistemaComponent implements OnInit {
  sistemaForm!: FormGroup;
  
  constructor(
    public menuService: MenuService, 
    public formBuilder: FormBuilder, 
    public sistemaService: SistemaService, 
    public authService: AuthService
  ) {}
  
  ngOnInit(){
    this.menuService.menuSelecionado = 2;
    this.sistemaForm = this.formBuilder.group({
      name:['', [Validators.required]]
    })
  }

  dadosForm(){
    return this.sistemaForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();
    let item = new SistemaFinanceiro();
    item.id = 0;
    item.Nome = dados["name"].value;
    item.Mes = 0;
    item.Ano = 0;
    item.DiaFechamento = 0;
    item.GerarCopiaDespesa=true;
    item.MesCopia = 0;
    item.AnoCopia = 0;
    item.Excluido = false;

    item.NomePropriedade = "";
    item.Mensagem = "";
    
    this.sistemaService.AdicionarSistemaFinanceiro(item).subscribe((response: SistemaFinanceiro) => {
      this.sistemaForm.reset();
      this.sistemaService.CadastrarUsuarioNoSistema(response.id, this.authService.getEmailUser()).subscribe((response: any) => {
        debugger
      },
      (error) => console.error(error), () => {})
    },
    (error) => console.error(error), () => {})
  }
}
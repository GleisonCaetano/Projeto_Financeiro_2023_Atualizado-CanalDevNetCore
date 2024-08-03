import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiroModel';
import { SistemaService } from '../../services/sistema.service';

@Component({
  selector: 'sistema',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sistema.component.html',
  styleUrl: './sistema.component.scss'
})
export class SistemaComponent {
  sistemaForm: FormGroup;
  
  constructor(public menuService: MenuService, public formBuilder: FormBuilder, public sistemaService: SistemaService){
    this.sistemaForm = this.formBuilder.group({
      name:['', [Validators.required]]
    });
  }
  
  ngOnInit(){
    this.menuService.menuSelecionado = 2;
  }

  dadosForm(){
    return this.sistemaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();
    let item = new SistemaFinanceiro();
    item.Id = 0;
    item.Nome = dados["name"].value;
    item.Mes = 0;
    item.Ano = 0;
    item.DiaFechamento = 0;
    item.GerarCopiaDespesa=true;
    item.MesCopia = 0;
    item.AnoCopia = 0;

    item.NomePropriedade = "";
    item.Mensagem = "";
    item.Notificacoes = [];
    
    this.sistemaService.AdicionarSistemaFinanceiro(item).subscribe((response: SistemaFinanceiro) => {
      this.sistemaForm.reset();
      this.sistemaService.CadastratarUsuarioNoSistema(response.Id, "gleison.resident@hotmail.com").subscribe((response: any) => {
        debugger
      },
      (error) => console.error(error), () => {})
    },
    (error) => console.error(error), () => {})
  }
}

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
    item.Nome = dados["name"].value;
    
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

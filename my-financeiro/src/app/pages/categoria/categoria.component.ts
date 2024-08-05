import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectModel } from '../../models/SelectModel';
import { SistemaService } from '../../services/sistema.service';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiroModel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'categoria',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  categoriaForm: FormGroup;
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  
  constructor(
    public menuService: MenuService, 
    public formBuilder: FormBuilder, 
    public sistemaService: SistemaService, 
    public autService: AuthService) {
      this.categoriaForm = this.formBuilder.group({
        name:['', [Validators.required]],
        sistemaSelect:['', [Validators.required]]//,
        //listSistemas: ['', [Validators.required]]
      });
    }
  
  ngOnInit(){
    this.menuService.menuSelecionado = 3;
    this.ListaSistemasUsuario();
  }

  dadosForm(){
    return this.categoriaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();
    alert(dados["name"].value);
  }

  ListaSistemasUsuario() {
    this.sistemaService.ListarSistemasUsuario(this.autService.getEmailUser()).subscribe((response: Array<SistemaFinanceiro>) => {
      var listaSistemaFinanceiro: [];
      
      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.Id.toString();
        item.name = x.Nome;

        listaSistemaFinanceiro.push(item);
      });

      this.listSistemas = listaSistemaFinanceiro;
    });
  }
}

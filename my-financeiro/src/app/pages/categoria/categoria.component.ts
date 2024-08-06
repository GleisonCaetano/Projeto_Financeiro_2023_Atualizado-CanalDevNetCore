import { Component, OnInit } from '@angular/core';
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
import { ItemsList } from '@ng-select/ng-select/lib/items-list';

@Component({
  selector: 'categoria',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {
  categoriaForm!: FormGroup;
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  
  constructor(
    public menuService: MenuService, 
    public formBuilder: FormBuilder, 
    public sistemaService: SistemaService, 
    public autService: AuthService) {
      this.categoriaForm = this.formBuilder.group({
        name:['', [Validators.required]]
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
      let listaSistemaFinanceiro: SelectModel[] = [];
      
      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.id ? x.id.toString() : '';
        item.name = x.nome;

        listaSistemaFinanceiro.push(item);
      });

      this.listSistemas = listaSistemaFinanceiro;
    }, error => {
      console.error('Erro ao listar sistemas do usuário:', error); // Log de erro para debug
    });
  }
}

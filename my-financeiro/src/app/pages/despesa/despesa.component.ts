import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'despesa',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule, FormsModule, NgSelectModule ],
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.scss'
})
export class DespesaComponent implements OnInit {
  despesaForm: FormGroup;
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  
  constructor(public menuService: MenuService, public formBuilder: FormBuilder){
    this.despesaForm = this.formBuilder.group({
      name:['', [Validators.required]],
      valor:['', Validators.required],
      data:['', Validators.required],
      sistemaSelect:['', Validators.required],
      categoriaSelect:['', Validators.required]
    })
  }
  
  ngOnInit(){
    this.menuService.menuSelecionado = 4;
  }

  dadosForm(){
    return this.despesaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();
    alert(dados["name"].value)
  }
}

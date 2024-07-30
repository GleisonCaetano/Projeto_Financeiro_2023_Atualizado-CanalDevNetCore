import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectModel } from '../../models/SelectModel';

@Component({
  selector: 'categoria',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  
  constructor(public menuService: MenuService, public formBuilder: FormBuilder){
    this.categoriaForm = this.formBuilder.group({
      name:['', [Validators.required]],
      sistemaSelect: [null]
    });
  }
  
  ngOnInit(){
    this.menuService.menuSelecionado = 3;
  }

  dadosForm(){
    return this.categoriaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();
    alert(dados["name"].value);
  }
}

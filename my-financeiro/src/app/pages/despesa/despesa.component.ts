import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { AuthService } from '../../services/auth.service';
import { Categoria } from '../../models/CategoriaModel';
import { Despesa } from '../../models/DespesaModel';
import { DespesaService } from '../../services/despesa.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'despesa',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidebarComponent, 
    ReactiveFormsModule, 
    CommonModule, 
    FormsModule, 
    NgSelectModule, 
    MatSlideToggleModule
  ],
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.scss'
})
export class DespesaComponent implements OnInit {
  despesaForm!: FormGroup;
  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  color = "accent";
  checked = false;
  disabled = false;
  
  constructor(
    public menuService: MenuService, 
    public formBuilder: FormBuilder,
    public categoriaService: CategoriaService,
    public authService: AuthService,
    public despesaService: DespesaService
  ){
    this.despesaForm = this.formBuilder.group({
      name:['', [Validators.required]],
      valor:['', [Validators.required]],
      data:['', [Validators.required]],
      categoriaSelect:['', [Validators.required]]
    });
  }
  
  ngOnInit(){
    this.menuService.menuSelecionado = 4;
    this.ListaCategorias();
  }

  dadosForm(){
    return this.despesaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();
    let item = new Despesa();
    item.Id = 0;
    item.Nome = dados["name"].value;
    item.Valor = dados["valor"].value;
    item.DataVencimento = dados["data"].value;
    item.Pago = this.checked;
    item.Excluido = false;

    console.log('Categoria Selecionada:', this.categoriaSelect);

    if (this.categoriaSelect && this.categoriaSelect.id) {
      item.CategoriaId = parseInt(this.categoriaSelect.id);
    } else {
      console.error('Categoria não selecionada ou ID não encontrado.');
      return; // Adicione um retorno para evitar enviar o formulário se o ID não for válido
    }

    item.NomePropriedade = "";
    item.Mensagem = "";
    
    this.despesaService.AdicionarDespesa(item).subscribe((response: Despesa) => {
      this.despesaForm.reset();
    },
    (error) => console.error(error), () => {})
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }

  ListaCategorias() {
    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser()).subscribe((response: Array<Categoria>) => {
      let listaCategorias: SelectModel[] = [];
      
      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.id ? x.id.toString() : '';
        item.name = x.nome;

        listaCategorias.push(item);
      });

      this.listCategorias = listaCategorias;
      console.log('Lista de Sistemas:', this.listCategorias); // Verifique se os itens estão sendo preenchidos corretamente
    }, error => {
      console.error('Erro ao listar sistemas do usuário:', error); // Log de erro para debug
    });
  }
}

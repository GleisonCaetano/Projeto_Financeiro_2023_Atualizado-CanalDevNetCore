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
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/CategoriaModel';

@Component({
  selector: 'categoria',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  categoriaForm!: FormGroup;
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  
  constructor(
    public menuService: MenuService, 
    public formBuilder: FormBuilder, 
    public sistemaService: SistemaService, 
    public authService: AuthService, 
    public categoriaService: CategoriaService) {
      this.categoriaForm = this.formBuilder.group({
        name:['', [Validators.required]],
        sistemaSelect:['', [Validators.required]]
      })
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
    let item = new Categoria();
    item.id = 0;
    item.nome = dados["name"].value;
    item.Excluido = false;
    
    console.log('Sistema Selecionado:', this.sistemaSelect);

    if (this.sistemaSelect && this.sistemaSelect.id) {
      item.sistemaId = parseInt(this.sistemaSelect.id);
    } else {
      console.error('Sistema não selecionado ou ID não encontrado.');
      return; // Adicione um retorno para evitar enviar o formulário se o ID não for válido
    }

    item.NomePropriedade = "";
    item.Mensagem = "";
    
    this.categoriaService.AdicionarCategoria(item).subscribe((response: Categoria) => {
      this.categoriaForm.reset();
    },
    (error) => console.error(error), () => {})
  }

  ListaSistemasUsuario() {
    this.sistemaService.ListarSistemasUsuario(this.authService.getEmailUser()).subscribe((response: Array<SistemaFinanceiro>) => {
      let listaSistemaFinanceiro: SelectModel[] = [];
    
    response.forEach(x => {
      var item = new SelectModel();
      item.id = x.id ? x.id.toString() : '';
      item.name = x.nome;

      listaSistemaFinanceiro.push(item);
    });

    this.listSistemas = listaSistemaFinanceiro;
    console.log('Lista de Sistemas:', this.listSistemas); // Verifique se os itens estão sendo preenchidos corretamente
    }, error => {
      console.error('Erro ao listar sistemas do usuário:', error); // Log de erro para debug
    });
  }
}

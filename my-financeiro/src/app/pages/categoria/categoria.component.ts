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
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/CategoriaModel';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'categoria',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidebarComponent, 
    ReactiveFormsModule, 
    CommonModule, 
    FormsModule, 
    NgSelectModule,
    NgxPaginationModule,
    MatIconModule
  ],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  categoriaForm!: FormGroup;
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  tipoTela: number = 1; //1 = listagem, 2 = cadastro, 3 = edição
  tableListCategorias: Array<Categoria> = [];
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itensPorPagina: number = 10;
  id: string = "";
  itemEdicao!: Categoria | null;
  
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
    this.configPage();
    this.ListaSistemasUsuario();
    this.ListaCategoriasUsuario();
  }

  configPage() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itensPorPagina
    }
  }

  gerarIdParaConfigDePaginacao(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  cadastro() {
    this.tipoTela = 2;
    this.categoriaForm.reset();
  }

  mudarItensPorPagina() {
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itensPorPagina;
  }

  mudarPagina(event: any) {
    this.page = event;
    this.config.currentPage =this.page;
  }

  dadosForm(){
    return this.categoriaForm.controls;
  }

  enviar(){
    var dados = this.dadosForm();
    
    if (this.itemEdicao) {
      this.itemEdicao.nome = dados["name"].value;
      this.itemEdicao.sistemaId = parseInt(this.sistemaSelect.id);

      this.itemEdicao.NomePropriedade = "";
      this.itemEdicao.Mensagem = "";
      
      this.categoriaService.AtualizarCategoria(this.itemEdicao).subscribe((response: Categoria) => {
        this.categoriaForm.reset();
        this.ListaCategoriasUsuario();
        },
      (error) => console.error(error), () => {})
    }
    else {
      let item = new Categoria();
      item.id = 0;
      item.nome = dados["name"].value;
      item.excluido = false;
      
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
        this.ListaCategoriasUsuario();
      },
      (error) => console.error(error), () => {})
    }
  }

  edicao(id: number) {
    this.categoriaService.ObterCategoria(id).subscribe((response: Categoria) => {
      if (response) {
        this.itemEdicao = response;
        this.tipoTela = 2;

        var dados = this.dadosForm();
        dados["name"].setValue(this.itemEdicao.nome)
        this.ListaSistemasUsuario(response.sistemaId)
      }
    },
    (error) => console.error(error), () => {})
  }

  ListaCategoriasUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser()).subscribe((response: Array<Categoria>) => {
      this.tableListCategorias = response;
    },
    (error) => console.error(error), () => {})
  }

  ListaSistemasUsuario(id: number = 0) {
    this.sistemaService.ListarSistemasUsuario(this.authService.getEmailUser()).subscribe((response: Array<SistemaFinanceiro>) => {
      let listaSistemaFinanceiro: SelectModel[] = [];
    
    response.forEach(x => {
      var item = new SelectModel();
      item.id = x.id ? x.id.toString() : '';
      item.name = x.nome;
      listaSistemaFinanceiro.push(item);

      if (id && id == x.id) {
        this.sistemaSelect = item;
      }
    });

    this.listSistemas = listaSistemaFinanceiro;
    console.log('Lista de Sistemas:', this.listSistemas); // Verifique se os itens estão sendo preenchidos corretamente
    }, error => {
      console.error('Erro ao listar sistemas do usuário:', error); // Log de erro para debug
    });
  }
}

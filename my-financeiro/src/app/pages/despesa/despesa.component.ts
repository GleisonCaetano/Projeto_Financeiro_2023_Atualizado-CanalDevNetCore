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
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';

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
    MatSlideToggleModule,
    NgxPaginationModule,
    MatIconModule
  ],
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent implements OnInit {
  despesaForm!: FormGroup;
  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  tipoTela: number = 1; //1 = listagem, 2 = cadastro, 3 = edição
  tableListDespesas: Array<Despesa> = [];
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itensPorPagina: number = 10;
  id: string = "";
  itemEdicao!: Despesa | null;
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
    this.configPage();
    this.ListaCategorias();
    this.ListaDespesasUsuario();
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
    this.despesaForm.reset();
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
    return this.despesaForm.controls;
  }

  enviar(){
    var dados = this.dadosForm();
    
    if (this.itemEdicao)
    {
      this.itemEdicao.nome = dados["name"].value;
      this.itemEdicao.valor = dados["valor"].value;
      this.itemEdicao.dataVencimento = dados["data"].value;
      this.itemEdicao.pago = this.checked;
      this.itemEdicao.excluido = false;
      this.itemEdicao.categoriaId = parseInt(this.categoriaSelect.id);

      this.itemEdicao.NomePropriedade = "";
      this.itemEdicao.Mensagem = "";
      
      this.despesaService.AtualizarDespesa(this.itemEdicao).subscribe((response: Despesa) => {
        this.despesaForm.reset();
        this.ListaDespesasUsuario();
      },
      (error) => console.error(error), () => {})
    }
    else {
      let item = new Despesa();
      item.id = 0;
      item.nome = dados["name"].value;
      item.valor = dados["valor"].value;
      item.dataVencimento = dados["data"].value;
      item.pago = this.checked;
      item.excluido = false;

      console.log('Categoria Selecionada:', this.categoriaSelect);

      if (this.categoriaSelect && this.categoriaSelect.id) {
        item.categoriaId = parseInt(this.categoriaSelect.id);
      } else {
        console.error('Categoria não selecionada ou ID não encontrado.');
        return; // Adicione um retorno para evitar enviar o formulário se o ID não for válido
      }

      item.NomePropriedade = "";
      item.Mensagem = "";
      
      this.despesaService.AdicionarDespesa(item).subscribe((response: Despesa) => {
        this.despesaForm.reset();
        this.ListaDespesasUsuario();
      },
      (error) => console.error(error), () => {})
    }
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }

  edicao(id: number) {
    this.despesaService.ObterDespesa(id).subscribe((response: Despesa) => {
      if (response) {
        this.itemEdicao = response;
        this.tipoTela = 2;

        var dados = this.dadosForm();
        dados["name"].setValue(this.itemEdicao.nome);
        this.ListaCategorias(response.categoriaId);
        
        var dateToString = response.dataVencimento.toString();
        var dateFull = dateToString.split('-');
        var dayFull = dateFull[2].split('T');
        var day = dayFull[0];
        var month = dateFull[1];
        var year = dateFull[0];

        var dateInput = year + '-' + month + '-' + day;
        
        dados["data"].setValue(dateInput);
        dados["valor"].setValue(response.valor);
        this.checked = response.pago;
      }
    },
    (error) => console.error(error), () => {})
  }

  ListaDespesasUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.despesaService.ListarDespesasUsuario(this.authService.getEmailUser()).subscribe((response: Array<Despesa>) => {
      this.tableListDespesas = response;
    },
    (error) => console.error(error), () => {})
  }

  ListaCategorias(id: number = 0) {
    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser()).subscribe((response: Array<Categoria>) => {
      let listaCategorias: SelectModel[] = [];
      
      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.id ? x.id.toString() : '';
        item.name = x.nome;
        listaCategorias.push(item);

        if (id && id == x.id) {
          this.categoriaSelect = item;
        }
      });

      this.listCategorias = listaCategorias;
      console.log('Lista de Categorias:', this.listCategorias); // Verifique se os itens estão sendo preenchidos corretamente
    }, error => {
      console.error('Erro ao listar categorias do usuário:', error); // Log de erro para debug
    });
  }
}

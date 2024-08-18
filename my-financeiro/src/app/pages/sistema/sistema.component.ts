import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiroModel';
import { SistemaService } from '../../services/sistema.service';
import { AuthService } from '../../services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsuarioSistemaFinanceiro } from '../../services/usuario-sistema.service';

@Component({
  selector: 'sistema',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidebarComponent, 
    ReactiveFormsModule, 
    CommonModule, 
    NgxPaginationModule, 
    FormsModule, 
    NgSelectModule, 
    MatIconModule,
    MatSlideToggleModule
  ],
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {
  sistemaForm!: FormGroup;
  tipoTela: number = 1; //1 = listagem, 2 = cadastro, 3 = edição
  tableListSistemas: Array<SistemaFinanceiro> = [];
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itensPorPagina: number = 10;
  id: string = "";
  itemEdicao!: SistemaFinanceiro | null;
  checked = false;
  color = "accent";
  disabled = false;

  tableListUsuariosSistema: Array<any> = [];
  id2: string = "";
  page2: number = 1;
  config2: any;
  paginacao2: boolean = true;
  itensPorPagina2: number = 10;
  emailUsuarioSistema: string = "";
  emailUsuarioSistemaValid: boolean = true;
  textValid: string = "Campo Obrigatório!";
  
  constructor(
    public menuService: MenuService, 
    public formBuilder: FormBuilder, 
    public sistemaService: SistemaService, 
    public authService: AuthService,
    public usuarioSistemaFinanceiro: UsuarioSistemaFinanceiro
  ) {}
  
  ngOnInit(){
    this.menuService.menuSelecionado = 2;
    this.configPage();
    this.ListaSistemasUsuario();
    this.sistemaForm = this.formBuilder.group({
      name:['', [Validators.required]],
      mes:['', [Validators.required]],
      ano:['', [Validators.required]],
      diaFechamento:['', [Validators.required]],
      mesCopia:['', [Validators.required]],
      anoCopia:['', [Validators.required]]
    });
  }

  configPage() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itensPorPagina
    }

    this.config2 = {
      id: this.id2,
      currentPage: this.page2,
      itemsPerPage: this.itensPorPagina2
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
    this.sistemaForm.reset();
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

  mudarItensPorPagina2() {
    this.page2 = 1;
    this.config2.currentPage = this.page2;
    this.config2.itemsPerPage = this.itensPorPagina2;
  }

  mudarPagina2(event: any) {
    this.page2 = event;
    this.config2.currentPage =this.page2;
  }

  ListaSistemasUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.sistemaService.ListarSistemasUsuario(this.authService.getEmailUser()).subscribe((response: Array<SistemaFinanceiro>) => {
      this.tableListSistemas = response;
    },
    (error) => console.error(error), () => {})
  }

  dadosForm(){
    return this.sistemaForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();
    
    if (this.itemEdicao) {
      this.itemEdicao.nome = dados["name"].value;
      this.itemEdicao.mes = dados["mes"].value;
      this.itemEdicao.ano = dados["ano"].value;
      this.itemEdicao.diaFechamento = dados["diaFechamento"].value;
      this.itemEdicao.gerarCopiaDespesa = this.checked;
      this.itemEdicao.mesCopia = dados["mesCopia"].value;
      this.itemEdicao.anoCopia = dados["anoCopia"].value;

      this.itemEdicao.NomePropriedade = "";
      this.itemEdicao.Mensagem = "";
      
      this.sistemaService.AtualizarSistemaFinanceiro(this.itemEdicao).subscribe((response: SistemaFinanceiro) => {
        this.sistemaForm.reset();
        this.ListaSistemasUsuario();
        },
      (error) => console.error(error), () => {})
    }
    else {
      let item = new SistemaFinanceiro();
      item.id = 0;
      item.nome = dados["name"].value;
      item.mes = dados["mes"].value;
      item.ano = dados["ano"].value;
      item.diaFechamento = dados["diaFechamento"].value;
      item.gerarCopiaDespesa = this.checked;
      item.mesCopia = dados["mesCopia"].value;
      item.anoCopia = dados["anoCopia"].value;
      item.excluido = false;

      item.NomePropriedade = "";
      item.Mensagem = "";
      
      this.sistemaService.AdicionarSistemaFinanceiro(item).subscribe((response: SistemaFinanceiro) => {
        this.sistemaForm.reset();
        this.sistemaService.CadastrarUsuarioNoSistema(response.id, this.authService.getEmailUser()).subscribe((response: any) => {
          this.ListaSistemasUsuario();
        },
        (error) => console.error(error), () => {})
      },
      (error) => console.error(error), () => {})
    }
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }
  
  edicao(id: number) {
    this.sistemaService.ObterSistemaFinanceiro(id).subscribe((response: SistemaFinanceiro) => {
      if (response) {
        this.itemEdicao = response;
        this.tipoTela = 2;

        var dados = this.dadosForm();
        dados["name"].setValue(this.itemEdicao.nome)
        dados["mes"].setValue(this.itemEdicao.mes)
        dados["ano"].setValue(this.itemEdicao.ano)
        dados["diaFechamento"].setValue(this.itemEdicao.diaFechamento)
        this.checked = this.itemEdicao.gerarCopiaDespesa
        dados["mesCopia"].setValue(this.itemEdicao.mesCopia)
        dados["anoCopia"].setValue(this.itemEdicao.anoCopia)

        this.ListaUsuariosSistema();
      }
    },
    (error) => console.error(error), () => {})
  }

  ListaUsuariosSistema() {
    if(this.itemEdicao) {
      this.usuarioSistemaFinanceiro.ListarUsuariosSistema(this.itemEdicao.id).subscribe((response: Array<any>) => {
        this.tableListUsuariosSistema = response;
      })
    }
  }

  excluir(id: number) {
    this.usuarioSistemaFinanceiro.DeletarUsuarioSistemaFinanceiro(id).subscribe((response: SistemaFinanceiro) => {
      if (response) {
        if(this.itemEdicao) {
          this.edicao(this.itemEdicao.id)
          this.emailUsuarioSistema = "";
        }
      }
    }, (error) => console.error(error), () => {})
  }

  addUsuarioSistema() {
    this.emailUsuarioSistemaValid = true;

    if (!this.emailUsuarioSistema) {
      this.emailUsuarioSistemaValid = false;
    }
    else {
      if(this.itemEdicao) {
        this.sistemaService.CadastrarUsuarioNoSistema(this.itemEdicao.id, this.emailUsuarioSistema).subscribe((response: any) => {
          if (response) {
            if(this.itemEdicao) {
              this.edicao(this.itemEdicao.id)
              this.emailUsuarioSistema = "";
            }
          }
        }, (error) => console.error(error), () => {})
      }
    }
  }
}
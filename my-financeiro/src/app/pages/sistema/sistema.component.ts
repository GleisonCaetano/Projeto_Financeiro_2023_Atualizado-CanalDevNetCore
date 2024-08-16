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
  
  constructor(
    public menuService: MenuService, 
    public formBuilder: FormBuilder, 
    public sistemaService: SistemaService, 
    public authService: AuthService
  ) {}
  
  ngOnInit(){
    this.menuService.menuSelecionado = 2;
    this.configPage();
    this.ListaSistemasUsuario();
    this.sistemaForm = this.formBuilder.group({
      name:['', [Validators.required]]
    });
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
      this.itemEdicao.Mes = dados["mes"].value;
      this.itemEdicao.Ano = dados["ano"].value;
      this.itemEdicao.DiaFechamento = dados["diaFechamento"].value;
      this.itemEdicao.GerarCopiaDespesa = this.checked;
      this.itemEdicao.MesCopia = dados["mesCopia"].value;
      this.itemEdicao.AnoCopia = dados["anoCopia"].value;

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
      item.Mes = dados["mes"].value;
      item.Ano = dados["ano"].value;
      item.DiaFechamento = dados["diaFechamento"].value;
      item.GerarCopiaDespesa = this.checked;
      item.MesCopia = dados["mesCopia"].value;
      item.AnoCopia = dados["anoCopia"].value;
      item.Excluido = false;

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
        dados["name"].setValue(this.itemEdicao.nome);
        dados["mes"].setValue(this.itemEdicao.Mes);
        dados["ano"].setValue(this.itemEdicao.Ano);
        dados["diaFechamento"].setValue(this.itemEdicao.DiaFechamento);
        this.checked = this.itemEdicao.GerarCopiaDespesa;
        dados["mesCopia"].setValue(this.itemEdicao.MesCopia);
        dados["anoCopia"].setValue(this.itemEdicao.AnoCopia);
      }
    },
    (error) => console.error(error), () => {})
  }
}
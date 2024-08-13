import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiroModel';
import { SistemaService } from '../../services/sistema.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sistema',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule],
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
    })
  }

  configPage() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itensPerPage: this.itensPorPagina
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

  ListaSistemasUsuario() {
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
    let item = new SistemaFinanceiro();
    item.id = 0;
    item.nome = dados["name"].value;
    item.Mes = 0;
    item.Ano = 0;
    item.DiaFechamento = 0;
    item.GerarCopiaDespesa=true;
    item.MesCopia = 0;
    item.AnoCopia = 0;
    item.Excluido = false;

    item.NomePropriedade = "";
    item.Mensagem = "";
    
    this.sistemaService.AdicionarSistemaFinanceiro(item).subscribe((response: SistemaFinanceiro) => {
      this.sistemaForm.reset();
      this.sistemaService.CadastrarUsuarioNoSistema(response.id, this.authService.getEmailUser()).subscribe((response: any) => {
        debugger
      },
      (error) => console.error(error), () => {})
    },
    (error) => console.error(error), () => {})
  }
}
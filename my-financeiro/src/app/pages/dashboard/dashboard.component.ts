import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { MenuService } from '../../services/menu.services';
import { DespesaService } from '../../services/despesa.service';
import { AuthService } from '../../services/auth.service';
import { Despesa } from '../../models/DespesaModel';
import { SistemaService } from '../../services/sistema.service';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  objetoGrafico: any;

  constructor(
    public menuService: MenuService, 
    public despesaService: DespesaService, 
    public authService: AuthService,
    public sistemaService: SistemaService
  ){}

  ngOnInit(){
    this.menuService.menuSelecionado = 1;
    this.CarregaGraficos();
  }

  CarregaGraficos() {
    this.despesaService.CarregarGraficos(this.authService.getEmailUser()).subscribe((response: Array<Despesa>) => {
      this.objetoGrafico = response;
    }, (error) => console.error(error), () => {}
    );
  }

  ExecuteCopiaDespesasSistemaFinanceiro() {
    this.sistemaService.ExecutarCopiaDespesasSistemaFinanceiro().subscribe((response: any) => {
      alert("Executado com Sucesso!");
      this.CarregaGraficos();
    })
  }
}

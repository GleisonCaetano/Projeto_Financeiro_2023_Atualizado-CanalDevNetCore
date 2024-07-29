import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'despesa',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.scss'
})
export class DespesaComponent {
  constructor(public menuService: MenuService){}

  ngOnInit(){
    this.menuService.menuSelecionado = 4;
  }
}

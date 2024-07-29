import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'categoria',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  constructor(public menuService: MenuService){}

  ngOnInit(){
    this.menuService.menuSelecionado = 3;
  }
}

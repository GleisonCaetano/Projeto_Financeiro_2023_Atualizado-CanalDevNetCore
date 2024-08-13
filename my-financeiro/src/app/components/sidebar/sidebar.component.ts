import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.services';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  
  constructor(private router: Router, public menuService: MenuService, private authService: AuthService){}
  
  selectMenu(menu:number){
    switch (menu) {
      case 1:
        this.router.navigate(['/dashboard'])
        break;

      case 2:
        this.router.navigate(['/sistema'])
        break;

      case 3:
        this.router.navigate(['/categoria'])
        break;

      case 4:
        this.router.navigate(['/despesa'])
        break;

      case 100:
        this.authService.limparDadosUsuario();
        this.router.navigate(['/login']);
        break;
    
      default:
        break;
    }
    
    this.menuService.menuSelecionado = menu;
  }
}

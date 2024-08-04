import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SistemaComponent } from './pages/sistema/sistema.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { DespesaComponent } from './pages/despesa/despesa.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sistema',
        component: SistemaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categoria',
        component: CategoriaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'despesa',
        component: DespesaComponent,
        canActivate: [AuthGuard]
    }
];
